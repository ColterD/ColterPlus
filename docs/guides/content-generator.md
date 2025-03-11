---
title: "Using the Content Generator"
description: "A guide to creating content with the built-in content generator"
date: "2025-03-11"
difficulty: "beginner"
tags: ["documentation", "guide"]
---

# Using the Content Generator

<div class="tip custom-block">
  <p class="custom-block-title">Difficulty Level</p>
  <p>Beginner | Time Required: 10 minutes</p>
</div>

## Introduction

The content generator is a powerful tool that helps you create consistent, well-structured content for your website. It provides templates for common content types like blog posts, projects, project updates, and guides, and automatically handles the boilerplate so you can focus on writing.

## Prerequisites

- Node.js installed on your system
- Basic understanding of markdown formatting
- Access to the repository

## Step 1: Running the Content Generator

To create new content, simply run the following command from the project root:

```bash
npm run create
```

This will start the interactive content generator, which will guide you through the process of creating new content.

## Step 2: Choosing a Content Type

The generator supports several content types:

1. **Blog Posts** - For articles, news, and general writing
2. **Projects** - For showcasing your projects with details, features, and tech stack
3. **Project Updates** - For adding updates to existing projects
4. **Guides** - For tutorials and how-to articles

Select the type of content you want to create by entering the corresponding number.

## Step 3: Filling in the Details

Each content type will ask for specific information:

### Blog Posts
- Title
- Description
- Tags
- Other metadata

### Projects
- Project title
- Description
- Status (in-progress, completed, planned)
- Tags
- Additional files (assembly, troubleshooting, etc.)

### Project Updates
- Selecting the existing project
- Update number
- Completion percentage
- Description of changes

### Guides
- Guide title
- Description
- Difficulty level
- Estimated time required
- Tags

## Step 4: Editing the Generated Content

After generating the content, the generator will tell you where the file was created. Open this file in your favorite text editor and fill in the placeholders with your actual content.

For example, in a blog post, you'll see placeholders like:

```markdown
## Overview

{{OVERVIEW_CONTENT}}
```

Replace `{{OVERVIEW_CONTENT}}` with your actual content.

## Step 5: Adding Media

For projects and guides, you'll often want to include images:

1. **Project Banner Images**: Place them in the project's `assets` folder (e.g., `docs/projects/your-project/assets/banner.png`)
2. **Project Update Images**: Place them in the same assets folder with a naming convention like `update-1.png`
3. **Guide Images**: Place them in the public folder or reference external images

## Step 6: Updating the Sidebar (for Projects)

After creating a new project, the generator will provide you with the sidebar configuration for that project. Copy this configuration and add it to your `.vitepress/config.mts` file in the sidebar section:

```javascript
sidebar: {
  '/projects/': [
    {
      text: 'Projects',
      link: '/projects/',
      items: [
        // Paste the generated sidebar configuration here
      ]
    }
  ],
  // ...
}
```

## Troubleshooting

### Missing Templates
If you see an error about missing templates, make sure all the required template files exist in the `templates` directory:
- blog-template.md
- project-template.md
- guide-template.md
- project-update-template.md

### Content Not Showing Up
- Make sure the file was created in the correct location
- Check the frontmatter for any syntax errors
- Run `npm run docs:dev` to see if there are any build errors

## Conclusion

The content generator makes it easy to maintain consistency across your website while saving you time. As you become more familiar with it, you can customize the templates to better suit your needs.

## Further Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [VitePress Documentation](https://vitepress.dev/)