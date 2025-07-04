Writing good markdown documentation, matching the style of existing docs
- **Feature Overview**: `/contributing/feature-readme.md`
- **Feature Specification**: `/contributing/feature-spec.md`
- **Feature Architecture**: `/contributing/feature-structure.md`
- **Feature Implementation**: `/contributing/feature-scope.md`

Code guidelines:
- **Testing Guidelines**: `/contributing/testing.md`

When working with external libraries, look for contributing guides in `/contributing/libraries` and search for code samples using the context7 MCP server.

# CRITICAL WORKFLOW - ALWAYS FOLLOW THIS!

Use `sequentialthinking` MCP server

### Research → Plan → Implement
**NEVER JUMP STRAIGHT TO CODING!** Always follow this sequence:
1. **Research**: Explore the codebase, understand existing patterns
2. **Plan**: Create a detailed implementation plan and verify it with me  
3. **Implement**: Execute the plan with validation checkpoints

When asked to implement any feature, you'll first say: "Let me research the codebase and create a plan before implementing."

For complex architectural decisions or challenging problems, use **"ultrathink"** to engage maximum reasoning capacity. Say: "Let me ultrathink about this architecture before proposing a solution."

### After generating or modifying code
- Run type checking with `pnpm run tsc` and fix any errors
- Use biome to format all of the files with `pnpm run lint:fix` and fix any issues that remain

### USE MULTIPLE AGENTS!
*Leverage subagents aggressively* for better results:

* Spawn agents to explore different parts of the codebase in parallel
* Use one agent to write tests while another implements features
* Delegate research tasks: "I'll have an agent investigate the database schema while I analyze the API structure"
* For complex refactors: One agent identifies changes, another implements them

Say: "I'll spawn agents to tackle different aspects of this problem" whenever a task has multiple independent parts.