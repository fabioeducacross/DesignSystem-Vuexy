/**
 * Proof of Concept: Story Parser
 *
 * Objetivo: Validar que conseguimos extrair metadados de arquivos .stories.js
 * usando Babel Parser
 */
export interface StoryFile {
    title: string;
    tags: string[];
    argTypes?: Record<string, unknown>;
    stories: Array<{
        name: string;
        args?: Record<string, unknown>;
    }>;
}
/**
 * Parse de arquivo .stories.js usando Babel AST
 */
export declare function parseStoryFile(code: string): StoryFile;
/**
 * Helper para extrair apenas nomes de stories (mais leve)
 */
export declare function extractStoryNames(code: string): string[];
//# sourceMappingURL=story-parser-poc.d.ts.map