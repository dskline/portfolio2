# Feature: Home Page Content Management

A dynamic home page that renders content blocks from markdown files using the CMS system. The feature supports HeroSection and Custom components with configurable props and HTML content.

📖 **[View Detailed Specification](./__docs__/SPEC.md)**

## Usage

The home page feature automatically renders at the root path ("/") of the application. Content is managed through markdown files processed by the CMS system.

### Markdown File Structure

```yaml
---
component: "HeroSection"
title: "Welcome to My Portfolio"
subtitle: "Building amazing web experiences"
portraitSrc: "path/to/portrait.jpg"
lexorank: "orderbytext"
---

This is the markdown content that will be transformed to HTML and passed as children to the component.
```

### Supported Components

#### HeroSection
```yaml
---
component: "HeroSection"
title: "Hero Title"
subtitle: "Hero Subtitle"
portraitSrc: "path/to/portrait.jpg"
lexorank: "orderbytext"
---
```

#### Custom
```yaml
---
component: "Custom"
lexorank: "orderbytext"
---
```
