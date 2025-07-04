Before creating a pull request:
- [ ] Run type checking with `pnpm run tsc` and fix any errors
- [ ] Use biome to format all of the files with `pnpm run lint:fix` and fix any issues that remain
- [ ] Add Playwright integration tests to new code
- [ ] Ensure http://localhost:3000 is running, run all regression tests with `pnpm run test:ci`, and fix any issues
- [ ] Ensure related *.md documentation is up to date with any new or modified code (README.md, SCOPE.md, SPEC.md)
- [ ] Remove any `// TODO` comments that no longer apply due to code updates in staged and unstaged files
- [ ] Remove debugging code like console logs (warn and errors are okay)