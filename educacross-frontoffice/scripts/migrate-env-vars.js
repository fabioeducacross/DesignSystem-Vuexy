#!/usr/bin/env node

/**
 * Script to replace process.env.VUE_APP_ with import.meta.env.VITE_APP_
 * for Vite migration
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Find all .js and .vue files in src directory
const findFiles = dir => {
  const files = []
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...findFiles(fullPath))
    } else if (item.endsWith('.js') || item.endsWith('.vue')) {
      files.push(fullPath)
    }
  }

  return files
}

const replaceInFile = filePath => {
  let content = fs.readFileSync(filePath, 'utf8')
  let modified = false

  // Replace process.env.VUE_APP_ with import.meta.env.VITE_APP_
  const newContent = content.replace(/process\.env\.VUE_APP_/g, 'import.meta.env.VITE_APP_')

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8')
    modified = true
  }

  return modified
}

// Main execution
const srcDir = path.join(__dirname, '..', 'src')
const files = findFiles(srcDir)

let count = 0
for (const file of files) {
  if (replaceInFile(file)) {
    console.log(`Updated: ${file}`)
    count++
  }
}

console.log(`\nTotal files updated: ${count}`)
