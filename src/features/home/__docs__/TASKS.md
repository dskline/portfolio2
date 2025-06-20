# Task List for Feature: Home Page Content Management

## Epics and Tasks

### EPIC_1: Initialization
- [x] Set up initial project docs (#1)
- [ ] Create feature flag and scaffold feature structure with // TODO comments (#2)
- [ ] Write integration tests for feature (#3)

### EPIC_2: Data fetching and content processing
- [ ] Implement `getHomeContent` function to fetch markdown files from CMS (#4)
- [ ] Create zod schema validation for frontmatter fields (component, portraitSrc, lexorank) (#5)
- [ ] Implement markdown-to-HTML transformation with sanitization (#6)
- [ ] Add error handling for malformed content and network failures (#7)

### EPIC_3: Component rendering system
- [ ] Create `ContentRenderer` component to map frontmatter to React components (#8)
  - **Depends on**: #5
- [ ] Build `HeroSection` component with title, subtitle, portraitSrc props (#9)
  - **Depends on**: #8
- [ ] Build `Custom` component for generic content rendering (#10)
  - **Depends on**: #8
- [ ] Implement component ordering based on lexorank values (#11)
  - **Depends on**: #5, #8

### EPIC_4: Home page integration
- [ ] Create `HomePage` component to orchestrate content fetching and rendering (#12)
  - **Depends on**: EPIC_2, EPIC_3
- [ ] Integrate HomePage component with Next.js app router at root path (#13)
  - **Depends on**: #12
- [ ] Add error boundaries for graceful failure handling (#14)
  - **Depends on**: #12
- [ ] Write visual tests for HomePage and add screenshots/video to docs (#15)
  - **Depends on**: #13
