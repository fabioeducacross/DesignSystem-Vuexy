#!/usr/bin/env python3
"""
Script to walk through the project, collect .js and .vue files,
and send them to Azure OpenAI for migration analysis.
"""

import os
import sys
import json
import time
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import List, Dict, Optional
from datetime import datetime, timedelta
from dotenv import load_dotenv
from openai import AzureOpenAI

try:
    from colorama import Fore, Style, init as colorama_init
    colorama_init(autoreset=True)
    COLORS_AVAILABLE = True
except ImportError:
    # Fallback if colorama not installed
    COLORS_AVAILABLE = False
    class Fore:
        GREEN = RED = YELLOW = BLUE = CYAN = MAGENTA = WHITE = ''
    class Style:
        BRIGHT = RESET_ALL = ''

# Load environment variables
load_dotenv()


class FileMigrator:
    """Handles file collection and migration through Azure OpenAI."""

    def __init__(self, project_root: str, resume: bool = True, max_workers: int = 4):
        """
        Initialize the migrator.

        Args:
            project_root: Root directory of the project to scan
            resume: Whether to resume from previous progress
            max_workers: Maximum number of parallel workers for processing files
        """
        self.project_root = Path(project_root)
        self.client = self._initialize_azure_client()
        self.prompt_vue, self.prompt_js = self._load_prompt_templates()

        # Progress tracking
        self.state_file = Path(__file__).parent / '.migration_progress.json'
        self.resume_enabled = resume
        self.state = self._load_state() if resume else {}

        # Statistics
        self.total_tokens = self.state.get('total_tokens', 0)
        self.total_cost = self.state.get('total_cost', 0.0)
        self.start_time = time.time()
        self.processing_times = []

        # Parallel processing
        self.max_workers = max_workers
        self._lock = threading.Lock()
        self._completed_count = 0

        # Directories to exclude from scanning
        self.exclude_dirs = {
            'node_modules',
            '.git',
            'dist',
            'build',
            '.venv',
            '__pycache__',
            '.idea',
            '.vscode',
            'coverage',
            '.next',
            '.nuxt'
        }

    def _initialize_azure_client(self) -> AzureOpenAI:
        """Initialize Azure OpenAI client from environment variables."""
        api_key = os.getenv('AZURE_OPENAI_API_KEY')
        api_version = os.getenv('AZURE_OPENAI_API_VERSION', '2024-02-15-preview')
        azure_endpoint = os.getenv('AZURE_OPENAI_ENDPOINT')

        if not api_key or not azure_endpoint:
            raise ValueError(
                "Missing required environment variables. "
                "Please set AZURE_OPENAI_API_KEY and AZURE_OPENAI_ENDPOINT in .env file"
            )

        return AzureOpenAI(
            api_key=api_key,
            api_version=api_version,
            azure_endpoint=azure_endpoint
        )

    def _load_state(self) -> Dict:
        """Load progress state from file."""
        if self.state_file.exists():
            try:
                with open(self.state_file, 'r', encoding='utf-8') as f:
                    state = json.load(f)
                    self._print_info(f"Resuming from previous session ({len(state.get('processed_files', []))} files already processed)")
                    return state
            except Exception as e:
                self._print_warning(f"Could not load progress state: {e}")
        return {'processed_files': [], 'failed_files': [], 'total_tokens': 0, 'total_cost': 0.0}

    def _save_state(self):
        """Save current progress state to file."""
        try:
            with open(self.state_file, 'w', encoding='utf-8') as f:
                json.dump(self.state, f, indent=2)
        except Exception as e:
            self._print_warning(f"Could not save progress state: {e}")

    def _print_header(self, text: str):
        """Print a header with formatting."""
        print(f"\n{Fore.CYAN}{Style.BRIGHT}{'='*70}")
        print(f"{Fore.CYAN}{Style.BRIGHT}{text:^70}")
        print(f"{Fore.CYAN}{Style.BRIGHT}{'='*70}{Style.RESET_ALL}")

    def _print_success(self, text: str):
        """Print success message."""
        print(f"{Fore.GREEN}✓ {text}{Style.RESET_ALL}")

    def _print_error(self, text: str):
        """Print error message."""
        print(f"{Fore.RED}✗ {text}{Style.RESET_ALL}")

    def _print_warning(self, text: str):
        """Print warning message."""
        print(f"{Fore.YELLOW}⚠ {text}{Style.RESET_ALL}")

    def _print_info(self, text: str):
        """Print info message."""
        print(f"{Fore.BLUE}ℹ {text}{Style.RESET_ALL}")

    def _validate_and_normalize_path(self, input_path: str) -> Optional[Path]:
        """
        Validate and normalize an input path (file or folder).

        Args:
            input_path: Raw path string from user input

        Returns:
            Normalized absolute Path object, or None if invalid
        """
        try:
            path = Path(input_path)

            # If path is not absolute, make it relative to project root
            if not path.is_absolute():
                path = self.project_root / path

            # Resolve to absolute path and normalize
            path = path.resolve()

            # Validate existence
            if not path.exists():
                self._print_error(f"Path does not exist: {path}")
                return None

            # For files, validate extension
            if path.is_file():
                if path.suffix not in ['.js', '.vue']:
                    self._print_error(
                        f"Invalid file type: {path.suffix}. "
                        f"Only .js and .vue files are supported."
                    )
                    return None

            # For directories, check if it's within excluded dirs
            if path.is_dir():
                if path.name in self.exclude_dirs:
                    self._print_error(
                        f"Cannot process excluded directory: {path.name}. "
                        f"Excluded: {', '.join(sorted(self.exclude_dirs))}"
                    )
                    return None

            return path

        except Exception as e:
            self._print_error(f"Invalid path '{input_path}': {e}")
            return None

    def _print_progress(self, current: int, total: int, file_path: str, tokens: int = 0, eta: str = ""):
        """Print progress bar with file info."""
        percentage = (current / total) * 100
        bar_length = 30
        filled = int(bar_length * current / total)
        bar = '█' * filled + '░' * (bar_length - filled)

        # Truncate file path if too long
        max_path_length = 45
        if len(file_path) > max_path_length:
            file_path = '...' + file_path[-(max_path_length-3):]

        eta_str = f"ETA: {eta}" if eta else ""
        tokens_str = f"Tokens: {tokens:,}" if tokens > 0 else ""

        print(f"{Fore.CYAN}[{current}/{total}] {Fore.WHITE}{bar} {Fore.YELLOW}{percentage:5.1f}%{Style.RESET_ALL}")
        print(f"{Fore.MAGENTA}  📄 {file_path}{Style.RESET_ALL}")
        if tokens_str or eta_str:
            print(f"{Fore.WHITE}  {tokens_str}  {eta_str}{Style.RESET_ALL}")

    def _calculate_eta(self, processed: int, total: int) -> str:
        """Calculate estimated time to completion."""
        if not self.processing_times or processed == 0:
            return "Calculating..."

        avg_time = sum(self.processing_times) / len(self.processing_times)
        remaining = total - processed
        seconds_remaining = avg_time * remaining

        if seconds_remaining < 60:
            return f"{int(seconds_remaining)}s"
        elif seconds_remaining < 3600:
            return f"{int(seconds_remaining / 60)}m {int(seconds_remaining % 60)}s"
        else:
            hours = int(seconds_remaining / 3600)
            minutes = int((seconds_remaining % 3600) / 60)
            return f"{hours}h {minutes}m"

    def _estimate_cost(self, tokens: int, model: str = 'gpt-4') -> float:
        """Estimate cost based on tokens used."""
        # Azure OpenAI GPT-4 pricing (approximate, check your actual pricing)
        # These are example rates - update based on your Azure pricing
        rates = {
            'gpt-4': {'input': 0.03 / 1000, 'output': 0.06 / 1000},
            'gpt-4-turbo': {'input': 0.01 / 1000, 'output': 0.03 / 1000},
            'gpt-35-turbo': {'input': 0.0015 / 1000, 'output': 0.002 / 1000}
        }

        # Default to gpt-4 if model not found
        rate = rates.get(model, rates['gpt-4'])
        # Assume 75% input, 25% output as rough estimate
        cost = (tokens * 0.75 * rate['input']) + (tokens * 0.25 * rate['output'])
        return cost

    def _load_prompt_templates(self) -> tuple[str, str]:
        """Load both Vue and JS markdown prompt templates."""
        script_dir = Path(__file__).parent
        prompt_vue_file = script_dir / 'prompt-vue.md'
        prompt_js_file = script_dir / 'prompt-js.md'

        # Default Vue prompt if file doesn't exist
        default_vue_prompt = """# Vue.js Migration Task

You are tasked with analyzing and migrating this Vue.js file.

## File Information
- **File Path**: {file_path}
- **File Type**: {file_type}

## File Content
```{file_extension}
{file_content}
```

## Instructions
1. Analyze the current code structure
2. Identify any deprecated patterns or syntax
3. Suggest modern Vue.js best practices
4. Provide migration recommendations

Please provide your analysis and recommendations."""

        # Default JS prompt if file doesn't exist
        default_js_prompt = """# JavaScript Migration Task

You are tasked with analyzing and migrating this JavaScript file from Vue 2 to Vue 3.

## File Information
- **File Path**: {file_path}
- **File Type**: {file_type}

## File Content
```{file_extension}
{file_content}
```

## Instructions
1. Update Vue 2 API calls to Vue 3 equivalents
2. Replace deprecated patterns
3. Ensure modern JavaScript best practices
4. Maintain backward compatibility

Please provide your analysis and migration."""

        # Load Vue prompt
        if prompt_vue_file.exists():
            with open(prompt_vue_file, 'r', encoding='utf-8') as f:
                vue_prompt = f.read()
        else:
            vue_prompt = default_vue_prompt
            self._print_warning(f"Vue prompt file not found: {prompt_vue_file}")

        # Load JS prompt
        if prompt_js_file.exists():
            with open(prompt_js_file, 'r', encoding='utf-8') as f:
                js_prompt = f.read()
        else:
            js_prompt = default_js_prompt
            self._print_warning(f"JS prompt file not found: {prompt_js_file}")

        return vue_prompt, js_prompt

    def find_files(self, target_path: Optional[Path] = None) -> List[Path]:
        """
        Walk through the project and find all .js and .vue files.

        Args:
            target_path: Specific file or directory to process. If None, uses project_root.

        Returns:
            List of Path objects for .js and .vue files
        """
        files = []
        search_root = target_path if target_path else self.project_root

        # If target is a file, return it directly (after validation)
        if search_root.is_file():
            if search_root.suffix in ['.js', '.vue']:
                return [search_root]
            else:
                self._print_warning(f"File {search_root} is not a .js or .vue file")
                return []

        # If target is a directory, walk recursively
        for root, dirs, filenames in os.walk(search_root):
            # Remove excluded directories from traversal
            dirs[:] = [d for d in dirs if d not in self.exclude_dirs]

            root_path = Path(root)

            # Skip if we're in the llm-migration-tool directory itself
            if 'llm-migration-tool' in root_path.parts:
                continue

            for filename in filenames:
                if filename.endswith(('.js', '.vue')):
                    file_path = root_path / filename
                    files.append(file_path)

        return sorted(files)

    def create_prompt(self, file_path: Path, file_content: str) -> str:
        """
        Create a prompt by combining the template with file information.
        Selects the appropriate prompt template based on file extension.

        Args:
            file_path: Path to the file
            file_content: Content of the file

        Returns:
            Formatted prompt string
        """
        file_extension = file_path.suffix.lstrip('.')
        relative_path = file_path.relative_to(self.project_root)

        # Select the appropriate prompt template based on file extension
        if file_extension == 'vue':
            prompt_template = self.prompt_vue
        elif file_extension == 'js':
            prompt_template = self.prompt_js
        else:
            # Default to Vue prompt for unknown extensions
            prompt_template = self.prompt_vue

        # Validate that template was loaded
        if not prompt_template:
            raise ValueError(f"Prompt template is None for file extension: {file_extension}")

        # Use a safe string replacement approach instead of .format()
        # This avoids issues with curly braces in both the template and file content
        prompt = prompt_template
        prompt = prompt.replace('{file_path}', str(relative_path))
        prompt = prompt.replace('{file_type}', file_extension.upper())
        prompt = prompt.replace('{file_extension}', file_extension)
        prompt = prompt.replace('{file_content}', file_content)
        
        return prompt

    def send_to_llm(self, file_path: Path, dry_run: bool = False) -> Dict:
        """
        Send a single file to Azure OpenAI for analysis.
        Each file is sent as a separate request (not bulk).

        Args:
            file_path: Path to the file to analyze
            dry_run: If True, don't actually send to LLM, just prepare the request

        Returns:
            Dictionary with response information
        """
        request_start_time = time.time()

        try:
            # Read file content
            with open(file_path, 'r', encoding='utf-8') as f:
                file_content = f.read()

            # Create prompt
            prompt = self.create_prompt(file_path, file_content)

            if dry_run:
                return {
                    'file': str(file_path.relative_to(self.project_root)),
                    'status': 'dry_run',
                    'prompt_length': len(prompt),
                    'content_length': len(file_content),
                    'processing_time': time.time() - request_start_time
                }

            # Send to Azure OpenAI - ONE FILE PER REQUEST
            deployment_name = os.getenv('AZURE_OPENAI_DEPLOYMENT', 'gpt-4')

            # Determine the file type for the system message
            file_extension = file_path.suffix.lstrip('.')
            if file_extension == 'vue':
                system_message = "You are an expert Vue.js developer helping to migrate Vue components from Vue 2 to Vue 3. Provide complete, working code with clear explanations of changes."
            else:  # .js files
                system_message = "You are an expert JavaScript developer helping to migrate JavaScript files from Vue 2 to Vue 3 ecosystem. Update all Vue 2 APIs while preserving functionality."

            response = self.client.chat.completions.create(
                model=deployment_name,
                messages=[
                    {
                        "role": "system",
                        "content": system_message
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )

            processing_time = time.time() - request_start_time
            tokens_used = response.usage.total_tokens
            estimated_cost = self._estimate_cost(tokens_used, deployment_name)

            return {
                'file': str(file_path.relative_to(self.project_root)),
                'status': 'success',
                'response': response.choices[0].message.content,
                'tokens_used': tokens_used,
                'prompt_tokens': response.usage.prompt_tokens,
                'completion_tokens': response.usage.completion_tokens,
                'estimated_cost': estimated_cost,
                'processing_time': processing_time
            }

        except Exception as e:
            import traceback
            error_details = {
                'message': str(e),
                'type': type(e).__name__,
                'traceback': traceback.format_exc()
            }
            
            # Try to extract more details from Azure OpenAI errors
            if hasattr(e, 'status_code'):
                error_details['status_code'] = e.status_code
            if hasattr(e, 'error'):
                error_details['api_error'] = str(e.error)
            if hasattr(e, 'message'):
                error_details['api_message'] = e.message
            
            return {
                'file': str(file_path.relative_to(self.project_root)),
                'status': 'error',
                'error': str(e),
                'error_details': error_details,
                'processing_time': time.time() - request_start_time
            }

    def extract_code_from_response(self, response_text: str) -> Optional[str]:
        """
        Extract code from LLM response that may contain markdown code blocks.

        Args:
            response_text: The full response from the LLM

        Returns:
            Extracted code or None if no code block found
        """
        # Look for code blocks with language specifiers (```vue or ```javascript)
        import re

        # Try to find vue or js code blocks
        patterns = [
            r'```(?:vue|html)\n(.*?)```',  # ```vue or ```html
            r'```(?:javascript|js)\n(.*?)```',  # ```javascript or ```js
            r'```\n(.*?)```',  # Generic code block
        ]

        for pattern in patterns:
            matches = re.findall(pattern, response_text, re.DOTALL)
            if matches:
                # Return the last (usually most complete) code block
                return matches[-1].strip()

        # If no code blocks found, check if the entire response looks like code
        # (starts with <template> or has typical code structure)
        if response_text.strip().startswith(('<template', '<script', 'import ', 'export ', 'const ', 'let ', 'var ', 'function ')):
            return response_text.strip()

        return None

    def save_migrated_file(self, file_path: Path, migrated_content: str) -> bool:
        """
        Save the migrated content back to the original file.

        Args:
            file_path: Path to the file to update
            migrated_content: The migrated code content

        Returns:
            True if successful, False otherwise
        """
        try:
            # Write the migrated content
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(migrated_content)

            return True

        except Exception as e:
            self._print_error(f"Failed to save file: {e}")
            return False

    def _process_single_file(self, file_path: Path, dry_run: bool, apply_changes: bool) -> Dict:
        """
        Process a single file - thread-safe method for parallel processing.

        Args:
            file_path: Path to the file to process
            dry_run: If True, don't actually send to LLM
            apply_changes: If True, apply migrated code to file

        Returns:
            Dictionary with processing result
        """
        relative_path = str(file_path.relative_to(self.project_root))
        result = self.send_to_llm(file_path, dry_run=dry_run)

        # Handle apply_changes (file writes are independent, no lock needed)
        if apply_changes and result['status'] == 'success' and 'response' in result:
            migrated_code = self.extract_code_from_response(result['response'])
            if migrated_code:
                if self.save_migrated_file(file_path, migrated_code):
                    result['applied'] = True
                else:
                    result['applied'] = False
                    result['apply_error'] = 'Failed to save file'
            else:
                result['applied'] = False
                result['apply_error'] = 'Could not extract code from response'
                # Save the full response to a .txt file for manual review
                response_file = file_path.with_suffix(file_path.suffix + '.response.txt')
                try:
                    with open(response_file, 'w', encoding='utf-8') as f:
                        f.write(result['response'])
                    result['response_file'] = str(response_file.name)
                except Exception as e:
                    result['response_save_error'] = str(e)

        return result

    def drop_from_processed(self, file_paths: List[Path]):
        """
        Remove files from the processed_files list to allow re-processing.

        Args:
            file_paths: List of file paths to remove from processed list
        """
        if 'processed_files' not in self.state:
            return

        processed_set = set(self.state['processed_files'])
        dropped_count = 0

        for file_path in file_paths:
            relative_path = str(file_path.relative_to(self.project_root))
            if relative_path in processed_set:
                processed_set.discard(relative_path)
                dropped_count += 1

        if dropped_count > 0:
            self.state['processed_files'] = list(processed_set)
            self._save_state()
            self._print_info(f"Dropped {dropped_count} file(s) from processed list for re-processing")

    def process_files(self, dry_run: bool = False, limit: Optional[int] = None, target_path: Optional[str] = None, apply_changes: bool = False, force: bool = False):
        """
        Process .js and .vue files in the project, a specific file, or a folder.
        Files are processed in parallel using ThreadPoolExecutor.

        Args:
            dry_run: If True, don't actually send to LLM
            limit: Maximum number of files to process (None for all)
            target_path: Path to a file or folder to process (relative to project root or absolute)
            apply_changes: If True, automatically apply the migrated code to files
        """
        # Handle target path (file or folder)
        if target_path:
            validated_path = self._validate_and_normalize_path(target_path)
            if not validated_path:
                return []

            # Determine if target is a file or folder
            is_single_file = validated_path.is_file()
            is_folder = validated_path.is_dir()

            # Find files to process
            all_files = self.find_files(validated_path)

            if not all_files:
                if is_folder:
                    self._print_warning(f"No .js or .vue files found in folder: {validated_path.relative_to(self.project_root)}")
                return []

            # When processing a specific file or folder with --path:
            # By default, skip already processed files
            # Use --force to re-process them
            if force:
                self.drop_from_processed(all_files)
                files_to_process = all_files
            else:
                # Filter out already processed files (default behavior)
                processed_files_set = set(self.state.get('processed_files', []))
                files_to_process = [f for f in all_files if str(f.relative_to(self.project_root)) not in processed_files_set]
                if len(files_to_process) < len(all_files):
                    skipped = len(all_files) - len(files_to_process)
                    self._print_info(f"Skipping {skipped} already processed file(s) (use --force to re-process)")
        else:
            # Process entire project with resume support
            all_files = self.find_files()
            processed_files_set = set(self.state.get('processed_files', []))

            # Filter out already processed files if resuming
            if self.resume_enabled:
                files_to_process = [f for f in all_files if str(f.relative_to(self.project_root)) not in processed_files_set]
            else:
                files_to_process = all_files

        self._print_header("MIGRATION TOOL STARTING")

        # Display context-aware information
        if target_path:
            validated_path = self._validate_and_normalize_path(target_path)
            if validated_path.is_file():
                self._print_info(f"Processing single file: {validated_path.relative_to(self.project_root)}")
            elif validated_path.is_dir():
                rel_path = validated_path.relative_to(self.project_root) if validated_path != self.project_root else Path(".")
                self._print_info(f"Processing folder: {rel_path}")
                print(f"{Fore.WHITE}Files found in folder: {Fore.YELLOW}{len(all_files)}{Style.RESET_ALL}")

                # List files that will be processed
                if len(all_files) > 0 and len(all_files) <= 20:
                    print(f"\n{Fore.CYAN}Files to process:{Style.RESET_ALL}")
                    for f in all_files[:20]:
                        rel_f = f.relative_to(self.project_root)
                        print(f"  {Fore.WHITE}• {rel_f}{Style.RESET_ALL}")
                elif len(all_files) > 20:
                    print(f"\n{Fore.CYAN}Sample of files to process (first 10):{Style.RESET_ALL}")
                    for f in all_files[:10]:
                        rel_f = f.relative_to(self.project_root)
                        print(f"  {Fore.WHITE}• {rel_f}{Style.RESET_ALL}")
                    print(f"  {Fore.YELLOW}... and {len(all_files) - 10} more files{Style.RESET_ALL}")
        else:
            print(f"{Fore.WHITE}Total files found: {Fore.YELLOW}{len(all_files)}{Style.RESET_ALL}")

            if self.resume_enabled and processed_files_set:
                print(f"{Fore.WHITE}Already processed: {Fore.GREEN}{len(processed_files_set)}{Style.RESET_ALL}")
                print(f"{Fore.WHITE}Remaining to process: {Fore.YELLOW}{len(files_to_process)}{Style.RESET_ALL}")

        # Apply limit if specified
        if limit:
            files_to_process = files_to_process[:limit]
            self._print_info(f"Limiting to first {limit} files")

        if not files_to_process:
            self._print_success("All files have been processed!")
            return []

        # Show parallel processing info
        self._print_info(f"Processing with {self.max_workers} parallel workers")

        results = []
        session_tokens = 0
        session_cost = 0.0
        total_files = len(files_to_process)
        self._completed_count = 0

        # Process files in parallel using ThreadPoolExecutor
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            # Submit all tasks
            future_to_file = {
                executor.submit(self._process_single_file, file_path, dry_run, apply_changes): file_path
                for file_path in files_to_process
            }

            # Process results as they complete
            for future in as_completed(future_to_file):
                file_path = future_to_file[future]
                relative_path = str(file_path.relative_to(self.project_root))

                try:
                    result = future.result()
                except Exception as e:
                    result = {
                        'file': relative_path,
                        'status': 'error',
                        'error': str(e),
                        'processing_time': 0
                    }

                # Thread-safe state updates
                with self._lock:
                    self._completed_count += 1
                    results.append(result)

                    # Track processing time for ETA calculation
                    if 'processing_time' in result:
                        self.processing_times.append(result['processing_time'])
                        # Keep only last 10 times for moving average
                        if len(self.processing_times) > 10:
                            self.processing_times.pop(0)

                    # Calculate ETA
                    eta = self._calculate_eta(self._completed_count, total_files)

                    # Print progress
                    print()  # Empty line for spacing
                    self._print_progress(
                        current=self._completed_count,
                        total=total_files,
                        file_path=relative_path,
                        tokens=self.total_tokens,
                        eta=eta
                    )

                    # Update statistics and state based on result status
                    if result['status'] == 'success':
                        tokens = result['tokens_used']
                        cost = result['estimated_cost']

                        session_tokens += tokens
                        session_cost += cost
                        self.total_tokens += tokens
                        self.total_cost += cost

                        self._print_success(
                            f"Completed in {result['processing_time']:.1f}s | "
                            f"Tokens: {tokens:,} (↑{result['prompt_tokens']:,} ↓{result['completion_tokens']:,}) | "
                            f"Cost: ${cost:.4f}"
                        )

                        # Report apply status
                        if apply_changes:
                            if result.get('applied'):
                                self._print_success(f"Changes applied to {relative_path}")
                            elif 'apply_error' in result:
                                self._print_warning(f"{result['apply_error']} for {relative_path}")
                                if 'response_file' in result:
                                    self._print_info(f"Full response saved to {result['response_file']}")

                        # Save to processed files
                        if 'processed_files' not in self.state:
                            self.state['processed_files'] = []
                        self.state['processed_files'].append(relative_path)

                    elif result['status'] == 'error':
                        self._print_error(f"Failed: {result['error']}")
                        
                        # Print additional error details if available
                        if 'error_details' in result:
                            details = result['error_details']
                            if 'type' in details:
                                print(f"{Fore.RED}  Error Type: {details['type']}{Style.RESET_ALL}")
                            if 'status_code' in details:
                                print(f"{Fore.RED}  Status Code: {details['status_code']}{Style.RESET_ALL}")
                            if 'api_error' in details:
                                print(f"{Fore.RED}  API Error: {details['api_error']}{Style.RESET_ALL}")
                            if 'api_message' in details:
                                print(f"{Fore.RED}  API Message: {details['api_message']}{Style.RESET_ALL}")
                            # Only show traceback in verbose mode (first 500 chars)
                            if 'traceback' in details and os.getenv('VERBOSE'):
                                print(f"{Fore.YELLOW}  Traceback: {details['traceback'][:500]}...{Style.RESET_ALL}")
                        
                        # Add to failed_files list for easy resumption
                        if 'failed_files' not in self.state:
                            self.state['failed_files'] = []
                        self.state['failed_files'].append({
                            'file': relative_path,
                            'error': result['error'],
                            'error_details': result.get('error_details', {}),
                            'timestamp': datetime.now().isoformat()
                        })

                    elif result['status'] == 'dry_run':
                        print(f"{Fore.WHITE}  Dry run - Prompt: {result['prompt_length']:,} chars, "
                              f"Content: {result['content_length']:,} chars{Style.RESET_ALL}")

                    # Update state after each file
                    self.state['total_tokens'] = self.total_tokens
                    self.state['total_cost'] = self.total_cost
                    self._save_state()

        # Final Summary
        self._print_summary(results, session_tokens, session_cost, dry_run)

        return results

    def _print_summary(self, results: List[Dict], session_tokens: int, session_cost: float, dry_run: bool):
        """Print final summary with statistics."""
        self._print_header("SESSION SUMMARY")

        successful = sum(1 for r in results if r['status'] == 'success')
        failed = sum(1 for r in results if r['status'] == 'error')
        elapsed_time = time.time() - self.start_time

        # Format elapsed time
        if elapsed_time < 60:
            time_str = f"{elapsed_time:.1f}s"
        elif elapsed_time < 3600:
            time_str = f"{int(elapsed_time / 60)}m {int(elapsed_time % 60)}s"
        else:
            hours = int(elapsed_time / 3600)
            minutes = int((elapsed_time % 3600) / 60)
            time_str = f"{hours}h {minutes}m"

        print(f"\n{Fore.WHITE}Session Statistics:{Style.RESET_ALL}")
        print(f"  Files processed: {Fore.CYAN}{len(results)}{Style.RESET_ALL}")
        print(f"  Successful: {Fore.GREEN}{successful}{Style.RESET_ALL}")
        print(f"  Failed: {Fore.RED}{failed}{Style.RESET_ALL}")
        print(f"  Time elapsed: {Fore.YELLOW}{time_str}{Style.RESET_ALL}")

        if not dry_run and session_tokens > 0:
            print(f"\n{Fore.WHITE}Token Usage:{Style.RESET_ALL}")
            print(f"  Session tokens: {Fore.CYAN}{session_tokens:,}{Style.RESET_ALL}")
            print(f"  Total tokens (all sessions): {Fore.CYAN}{self.total_tokens:,}{Style.RESET_ALL}")
            print(f"  Session cost: {Fore.YELLOW}${session_cost:.2f}{Style.RESET_ALL}")
            print(f"  Total cost (all sessions): {Fore.YELLOW}${self.total_cost:.2f}{Style.RESET_ALL}")

            if successful > 0:
                avg_tokens = session_tokens / successful
                print(f"  Average tokens/file: {Fore.CYAN}{avg_tokens:.0f}{Style.RESET_ALL}")

        if self.resume_enabled:
            total_processed = len(self.state.get('processed_files', []))
            print(f"\n{Fore.WHITE}Progress:{Style.RESET_ALL}")
            print(f"  Total files processed (all sessions): {Fore.GREEN}{total_processed}{Style.RESET_ALL}")

        # Show failed files count if any
        failed_files = self.state.get('failed_files', [])
        if failed_files:
            print(f"\n{Fore.WHITE}Failed Files:{Style.RESET_ALL}")
            print(f"  Total failed: {Fore.RED}{len(failed_files)}{Style.RESET_ALL}")
            print(f"  {Fore.YELLOW}Run with --retry-failed to retry failed files{Style.RESET_ALL}")

        print(f"\n{Fore.GREEN}{Style.BRIGHT}Migration session complete!{Style.RESET_ALL}\n")


def main():
    """Main entry point."""
    import argparse

    parser = argparse.ArgumentParser(
        description='Migrate .js and .vue files using Azure OpenAI',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Process entire project (with parallel processing)
  python migrate_files.py --dry-run --limit 5              # Test with 5 files
  python migrate_files.py --limit 10 --apply               # Process 10 files and apply changes
  python migrate_files.py --apply                          # Process all remaining files and apply changes
  python migrate_files.py --no-resume                      # Start fresh (ignore previous progress)
  python migrate_files.py --reset                          # Clear progress and start over

  # Control parallelism
  python migrate_files.py --workers 8 --apply              # Use 8 parallel workers (faster)
  python migrate_files.py --workers 2 --apply              # Use 2 workers (slower, but avoids rate limits)

  # Process specific file
  python migrate_files.py --path src/components/MyComponent.vue --apply
  python migrate_files.py --path src/utils/helpers.js --dry-run

  # Process specific folder (recursively)
  python migrate_files.py --path src/components --apply              # Process all files in components folder
  python migrate_files.py --path src/layouts --limit 5 --apply       # Process first 5 files in layouts folder
  python migrate_files.py --path src/views/admin --dry-run           # Test all files in admin views

  # Skip already processed files (default behavior)
  python migrate_files.py --path src/components --apply                  # Skips already processed files
  python migrate_files.py --path src/components/MyComponent.vue --force --apply  # Force re-process

  # Retry failed files
  python migrate_files.py --retry-failed --apply           # Retry all files that previously failed

  # Legacy support (--file still works)
  python migrate_files.py --file src/components/Tag.vue --apply
        """
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Run without actually calling the LLM'
    )
    parser.add_argument(
        '--apply',
        action='store_true',
        help='Apply the migrated code to files. Without this flag, only analysis is performed.'
    )
    parser.add_argument(
        '--limit',
        type=int,
        default=None,
        help='Limit the number of files to process'
    )
    parser.add_argument(
        '--project-root',
        type=str,
        default='..',
        help='Root directory of the project (default: parent directory)'
    )
    parser.add_argument(
        '--no-resume',
        action='store_true',
        help='Do not resume from previous progress (start fresh). Note: Resume logic is disabled when using --path.'
    )
    parser.add_argument(
        '--reset',
        action='store_true',
        help='Clear all progress and start over'
    )
    parser.add_argument(
        '--path',
        type=str,
        default=None,
        help='Process a specific file or folder (relative to project root or absolute path). '
             'If a folder is specified, all .js and .vue files within it will be processed recursively.'
    )
    parser.add_argument(
        '--file',
        type=str,
        default=None,
        help='(DEPRECATED: use --path instead) Process a single specific file. Kept for backward compatibility.'
    )
    parser.add_argument(
        '--workers',
        type=int,
        default=4,
        help='Number of parallel workers for processing files (default: 4). Reduce if hitting API rate limits.'
    )
    parser.add_argument(
        '--retry-failed',
        action='store_true',
        help='Retry only the files that previously failed (from failed_files in progress state).'
    )
    parser.add_argument(
        '--force',
        action='store_true',
        help='Force re-processing of files even if they were already processed. '
             'By default, already processed files are skipped.'
    )

    args = parser.parse_args()

    # Get absolute path to project root
    script_dir = Path(__file__).parent
    project_root = (script_dir / args.project_root).resolve()

    # Handle reset
    if args.reset:
        state_file = script_dir / '.migration_progress.json'
        if state_file.exists():
            state_file.unlink()
            print(f"{Fore.GREEN}Progress reset successfully!{Style.RESET_ALL}")
        else:
            print(f"{Fore.YELLOW}No progress file found to reset.{Style.RESET_ALL}")
        return

    # Determine target path (support both --path and legacy --file)
    target_path = args.path or args.file

    # Warn if using deprecated --file flag
    if args.file and not args.path:
        print(f"{Fore.YELLOW}⚠ Note: --file is deprecated. Use --path instead.{Style.RESET_ALL}")

    print(f"\n{Fore.CYAN}{Style.BRIGHT}LLM Migration Tool{Style.RESET_ALL}")
    print(f"{Fore.WHITE}Project root: {Fore.YELLOW}{project_root}{Style.RESET_ALL}")
    print(f"{Fore.WHITE}Dry run: {Fore.YELLOW}{args.dry_run}{Style.RESET_ALL}")
    print(f"{Fore.WHITE}Apply changes: {Fore.YELLOW}{args.apply}{Style.RESET_ALL}")
    print(f"{Fore.WHITE}Resume: {Fore.YELLOW}{not args.no_resume}{Style.RESET_ALL}")
    print(f"{Fore.WHITE}Workers: {Fore.YELLOW}{args.workers}{Style.RESET_ALL}")
    if args.limit:
        print(f"{Fore.WHITE}Limit: {Fore.YELLOW}{args.limit} files{Style.RESET_ALL}")
    if target_path:
        path_type = "Target path" if args.path else "Single file"
        print(f"{Fore.WHITE}{path_type}: {Fore.YELLOW}{target_path}{Style.RESET_ALL}")
        if args.force:
            print(f"{Fore.WHITE}Force re-process: {Fore.YELLOW}Yes{Style.RESET_ALL}")
    if args.retry_failed:
        print(f"{Fore.WHITE}Mode: {Fore.YELLOW}Retrying failed files{Style.RESET_ALL}")

    # Initialize and run migrator
    try:
        migrator = FileMigrator(str(project_root), resume=not args.no_resume, max_workers=args.workers)

        # Handle retry-failed mode
        if args.retry_failed:
            failed_files = migrator.state.get('failed_files', [])
            if not failed_files:
                print(f"{Fore.GREEN}No failed files to retry!{Style.RESET_ALL}")
                return

            print(f"{Fore.CYAN}Retrying {len(failed_files)} failed files...{Style.RESET_ALL}")

            # Extract file paths from failed_files list
            failed_paths = [f['file'] for f in failed_files]

            # Clear failed_files list before retry
            migrator.state['failed_files'] = []
            migrator._save_state()

            # Process each failed file
            for file_rel_path in failed_paths:
                migrator.process_files(dry_run=args.dry_run, target_path=file_rel_path, apply_changes=args.apply)
        else:
            migrator.process_files(dry_run=args.dry_run, limit=args.limit, target_path=target_path, apply_changes=args.apply, force=args.force)
    except KeyboardInterrupt:
        print(f"\n\n{Fore.YELLOW}⚠ Process interrupted by user{Style.RESET_ALL}")
        print(f"{Fore.WHITE}Progress has been saved. Run again to resume.{Style.RESET_ALL}")
        # Show how many failed files exist
        try:
            failed_count = len(migrator.state.get('failed_files', []))
            if failed_count > 0:
                print(f"{Fore.WHITE}Failed files: {Fore.RED}{failed_count}{Style.RESET_ALL} - use --retry-failed to retry")
        except:
            pass
        sys.exit(0)
    except Exception as e:
        print(f"\n{Fore.RED}✗ Fatal error: {e}{Style.RESET_ALL}")
        sys.exit(1)


if __name__ == '__main__':
    main()
