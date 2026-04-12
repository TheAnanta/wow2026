import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import t from '@babel/types';

const TRANSLATIONS_PATH = './messages/en.json';
const SOURCE_FILES = 'src/**/*.{tsx,ts}'; // Adjust to your project structure

let translations = {};

// Helper to create a unique key from text (e.g., "Sign In" -> "header.sign_in")
const slugify = (text) => text.toLowerCase().trim().replace(/[^\w\s]/g, '').replace(/\s+/g, '_');

async function processFiles() {
    const files = await glob(SOURCE_FILES);

    for (const file of files) {
        const code = fs.readFileSync(file, 'utf-8');
        const ast = parser.parse(code, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript'],
        });

        let isModified = false;

        traverse.default(ast, {
            // 1. Handle Text inside JSX: <div>Hello World</div>
            JSXText(path) {
                const text = path.node.value.trim();
                if (text && text.length > 1) {
                    const key = slugify(text);
                    translations[key] = text;
                    path.replaceWith(t.jsxExpressionContainer(t.callExpression(t.identifier('t'), [t.stringLiteral(key)])));
                    isModified = true;
                }
            },
            // 2. Handle Props: <input placeholder="Search" />
            JSXAttribute(path) {
                if (['placeholder', 'title', 'aria-label'].includes(path.node.name.name)) {
                    if (t.isStringLiteral(path.node.value)) {
                        const text = path.node.value.value;
                        const key = slugify(text);
                        translations[key] = text;
                        path.node.value = t.jsxExpressionContainer(t.callExpression(t.identifier('t'), [t.stringLiteral(key)]));
                        isModified = true;
                    }
                }
            },
            Program(path) {
                // Check if useTranslations is already imported
                const hasImport = path.node.body.some(node =>
                    t.isImportDeclaration(node) && node.source.value === 'next-intl'
                );

                if (!hasImport) {
                    const importNamespace = t.importDeclaration(
                        [t.importSpecifier(t.identifier('useTranslations'), t.identifier('useTranslations'))],
                        t.stringLiteral('next-intl')
                    );
                    path.unshiftContainer('body', importNamespace);
                }
            },

            ExportNamedDeclaration(path) {
                const declaration = path.node.declaration;
                if (t.isVariableDeclaration(declaration)) {
                    const init = declaration.declarations[0].init;

                    // Ensure init exists and is a function
                    if (init && (t.isArrowFunctionExpression(init) || t.isFunctionExpression(init))) {

                        // CRITICAL FIX: Check if the body is a BlockStatement ({ ... }) 
                        // and not an expression (() => <div />)
                        if (t.isBlockStatement(init.body)) {
                            const blockBody = init.body.body;

                            const hasHook = blockBody.some(node =>
                                t.isVariableDeclaration(node) &&
                                generate.default(node).code.includes('useTranslations')
                            );

                            if (!hasHook) {
                                const hookDeclaration = t.variableDeclaration('const', [
                                    t.variableDeclarator(
                                        t.identifier('t'),
                                        t.callExpression(t.identifier('useTranslations'), [t.stringLiteral('Index')])
                                    )
                                ]);
                                init.body.body.unshift(hookDeclaration);
                                isModified = true; // Mark as modified so it actually saves
                            }
                        }
                    }
                }
            }
        });

        if (isModified) {
            // Automatically add the useTranslations hook import if we modified the file
            // NOTE: This is a simplified check; in a real app, you'd check if it exists
            const output = generate.default(ast).code;
            fs.writeFileSync(file, output);
            console.log(`✅ Updated: ${file}`);
        }
    }

    // Save the extracted JSON
    fs.writeFileSync(TRANSLATIONS_PATH, JSON.stringify(translations, null, 2));
    console.log(`🚀 Extraction complete! Check ${TRANSLATIONS_PATH}`);
}

processFiles();