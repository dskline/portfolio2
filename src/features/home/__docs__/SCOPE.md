# Scope Document for Feature: Home Page Content Management

## Scopes and Tasks

### SCOPE_1: Initialization
- [x] Set up initial feature docs (#SCOPE_1_a)
- [x] Scaffold feature structure with placeholder components and // TODO comments (#SCOPE_1_b)
- [x] Write integration tests for feature (#SCOPE_1_c)

### SCOPE_2: Data fetching and content processing
- [x] Implement `getHomeContent` function to fetch markdown files from CMS (#SCOPE_2_a)
- [x] Create zod schema validation for frontmatter fields (component, portraitSrc, lexorank) (#SCOPE_2_b)
- [x] Implement markdown-to-HTML transformation with sanitization (#SCOPE_2_c)
- [x] Add error handling for malformed content and network failures (#SCOPE_2_d)
- [x] Document data contract and expected content structure (#SCOPE_2_e)

### SCOPE_3: Component rendering system
- [ ] Create `ContentRenderer` component to map frontmatter to React components (#SCOPE_3_a)
  - **Depends on**: #SCOPE_2_b
- [ ] Build `HeroSection` component with title, subtitle, portraitSrc props (#SCOPE_3_b)
  - **Depends on**: #SCOPE_3_a
- [ ] Implement component ordering based on lexorank values (#SCOPE_3_d)
  - **Depends on**: #SCOPE_2_b, #SCOPE_3_a
- [ ] Add prop-types or TypeScript types for all components (#SCOPE_3_e)
  - **Depends on**: #SCOPE_3_a, #SCOPE_3_b, #SCOPE_3_c

### SCOPE_4: Home page integration
- [ ] Create `HomePage` component to orchestrate content fetching and rendering (#SCOPE_4_a)
  - **Depends on**: SCOPE_2, SCOPE_3
- [ ] Integrate HomePage component with Next.js app router at root path (#SCOPE_4_b)
  - **Depends on**: #SCOPE_4_a
- [ ] Add error boundaries for graceful failure handling (#SCOPE_4_c)
  - **Depends on**: #SCOPE_4_a
- [ ] Write visual tests for HomePage and add screenshots/video to docs (#SCOPE_4_d)
  - **Depends on**: #SCOPE_4_a
- [ ] Review accessibility and performance for HomePage (#SCOPE_4_e)
  - **Depends on**: #SCOPE_4_a

