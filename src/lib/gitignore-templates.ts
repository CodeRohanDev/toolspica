export const GITIGNORE_TEMPLATES: Record<string, string> = {
  Node: "node_modules/\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n.pnpm-debug.log*\ndist/\nbuild/\n.env\n.env.local",
  Python: "__pycache__/\n*.py[cod]\n*.egg-info/\n.venv/\nvenv/\n.env\ndist/\nbuild/\n.pytest_cache/",
  Java: "*.class\n*.jar\n*.war\ntarget/\n.gradle/\nbuild/",
  "React / Next.js": ".next/\nout/\nnode_modules/\n.env*\n*.tsbuildinfo\nnext-env.d.ts",
  macOS: ".DS_Store\n.AppleDouble\n.LSOverride\nIcon\n",
  Windows: "Thumbs.db\nehthumbs.db\nDesktop.ini\n$RECYCLE.BIN/",
  VSCode: ".vscode/*\n!.vscode/settings.json\n!.vscode/extensions.json",
  IntelliJ: ".idea/\n*.iml\nout/",
};
