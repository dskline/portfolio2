Step 1:

I'm creating a new feature. First, you will ask me to describe the feature and give it a short tag name. Remind me to turn on Agent mode. Once I've explained the feature, continue to step 2.

---

Step 2:

After I've responded, you will create a new folder in `src/features/` using that tag name and generate a specification document in
`src/features/<tag_name>/__docs__/SPEC.md` for the feature based on the description I provide.

Use `.github/instructions/feature-spec.instructions.md` as the template for the specification document.

Create a README.md file in `src/features/<tag_name>/` that links to the specification document and provides a brief overview of the feature. Use `.github/instructions/feature-readme.instructions.md` as the template for the README.

Once you've created the specification and README, you will ask me to review them and make any necessary adjustments, and wait for my confirmation before continuing with step 3.

---

Step 3:

Create a new file `src/features/<tag_name>/__docs__/TASKS.md` for the feature based on the `src/features/<tag_name>/__docs__/SPEC.md` document. This file should outline the specific implementation tasks required to complete an MVP of the feature.

Requirements of the TASKS.md file:
- First, outline the MVP "Epics" of the feature, which are the high-level goals or milestones. Give each an EPIC_ID in the format `EPIC_<number>`, starting from 1.
- Then, break each Epic down into smaller tasks. Each task should be numbered in order and display their dependencies.
- The first Epic should always be about creating all the docs and integration tests for the feature. No other epic needs to mention tests or docs.

Example:
```markdown
# Task List for Feature: Home Page

## Epics and Tasks

### EPIC_1: Initialization
- [x] Set up initial project docs (#1)
- [ ] Create feature flag and scaffold feature structure with // TODO comments (#2)
- [ ] Write integration tests for feature (#3)

### EPIC_2: Implement data fetching and validation
- [ ] Implement `getHomeContent` function to fetch markdown files (#4)
- [ ] Implement zod schema validation for frontmatter fields (#5)
- [ ] Add error handling for empty or malformed content (#6)

### EPIC_3: Build UI components for content rendering
- [ ] Create `ContentRenderer` component to map tags to components (#7)
  - **Depends on**: #5
- [ ] Build `HeroComponent` for hero sections (#8)
  - **Depends on**: #7
- [ ] Build `CustomComponent` for generic content (#9)
  - **Depends on**: #7

### EPIC_4: Integrate the feature into the main application
- [ ] Create `HomePage` component to orchestrate content rendering (#10)
  - **Depends on**: EPIC_2, EPIC_3
- [ ] Write visual tests for `HomePage` and add screenshots/video to the docs (#11)
  - **Depends on**: #10
```
