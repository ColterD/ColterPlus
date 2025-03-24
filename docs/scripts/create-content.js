// scripts/create-content.js
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatesDir = path.join(__dirname, '../templates');
const contentDirs = {
  blog: path.join(__dirname, '../blog'),
  project: path.join(__dirname, '../projects'),
  guide: path.join(__dirname, '../guides')
};

// Ensure content directories exist
try {
  Object.values(contentDirs).forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
} catch (error) {
  console.error(`Error creating content directories: ${error.message}`);
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promisify readline question
function question(query) {
  return new Promise(resolve => {
    rl.question(query, resolve);
  });
}

// Convert title to slug
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Sanitize user input to prevent potential security issues
function sanitizeInput(input, allowedPattern = /^[a-zA-Z0-9\s\-_.,!?()[\]{}:;'"]+$/) {
  // Check if input matches allowed pattern
  if (!allowedPattern.test(input)) {
    console.warn('Warning: Input contains potentially unsafe characters. Some characters may be removed.');
    // Remove or replace potentially unsafe characters
    return input.replace(/[^a-zA-Z0-9\s\-_.,!?()[\]{}:;'"]/g, '');
  }
  return input;
}

// Generate current date in YYYY-MM-DD format
function getCurrentDate() {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

// Read template file safely
function readTemplateFile(templateName) {
  try {
    const templatePath = path.join(templatesDir, templateName);
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template file not found: ${templateName}`);
    }
    return fs.readFileSync(templatePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading template ${templateName}: ${error.message}`);
    throw new Error(`Failed to read template: ${templateName}`);
  }
}

// Write content to file safely
function writeContentFile(filePath, content) {
  try {
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, content);
    return true;
  } catch (error) {
    console.error(`Error writing to ${filePath}: ${error.message}`);
    return false;
  }
}

// Check if all required files and directories exist
function checkSetup() {
  const requiredTemplates = [
    'blog-template.md',
    'project-template.md',
    'guide-template.md',
    'project-update-template.md'
  ];
  
  let allGood = true;
  
  // Check templates directory
  if (!fs.existsSync(templatesDir)) {
    console.error(`Templates directory does not exist: ${templatesDir}`);
    console.error('Please create this directory and add the template files.');
    return false;
  }
  
  // Check template files
  for (const template of requiredTemplates) {
    const templatePath = path.join(templatesDir, template);
    if (!fs.existsSync(templatePath)) {
      console.error(`Required template does not exist: ${templatePath}`);
      allGood = false;
    }
  }
  
  if (!allGood) {
    console.error('Please create the missing template files before continuing.');
    return false;
  }
  
  return true;
}

async function createBlogPost() {
  try {
    console.log('\n=== Creating New Blog Post ===\n');
    
    const titleRaw = await question('Title: ');
    const title = sanitizeInput(titleRaw);
    if (title !== titleRaw) {
      console.log(`Note: Title has been sanitized to: "${title}"`);
    }
    
    const descriptionRaw = await question('Description: ');
    const description = sanitizeInput(descriptionRaw);
    
    const tag1Raw = await question('Primary Tag: ');
    const tag1 = sanitizeInput(tag1Raw, /^[a-zA-Z0-9\-_]+$/);
    
    const tag2Raw = await question('Secondary Tag (optional): ');
    const tag2 = tag2Raw ? sanitizeInput(tag2Raw, /^[a-zA-Z0-9\-_]+$/) : '';
    
    // Read template
    const template = readTemplateFile('blog-template.md');
    
    // Replace placeholders
    const processedTemplate = template
      .replace(/{{TITLE}}/g, title)
      .replace(/{{DESCRIPTION}}/g, description)
      .replace(/{{DATE}}/g, getCurrentDate())
      .replace(/{{TAG1}}/g, tag1)
      .replace(/{{TAG2}}/g, tag2 || 'misc')
      .replace(/{{INTRODUCTION}}/g, 'Write your introduction here.')
      .replace(/{{OVERVIEW_CONTENT}}/g, 'Write your overview here.')
      .replace(/{{MAIN_CONTENT}}/g, 'Write your main content here.')
      .replace(/{{POINT1}}/g, 'First key takeaway')
      .replace(/{{POINT2}}/g, 'Second key takeaway')
      .replace(/{{POINT3}}/g, 'Third key takeaway')
      .replace(/{{CONCLUSION}}/g, 'Write your conclusion here.');
    
    // Create file
    const slug = slugify(title);
    const date = getCurrentDate();
    const fileName = `${date}-${slug}.md`;
    const filePath = path.join(contentDirs.blog, fileName);
    
    if (writeContentFile(filePath, processedTemplate)) {
      console.log(`\nBlog post created at: ${filePath}`);
    } else {
      console.error(`\nFailed to create blog post at: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error creating blog post: ${error.message}`);
  }
}

async function createProject() {
  try {
    console.log('\n=== Creating New Project ===\n');
    
    const titleRaw = await question('Project Title: ');
    const title = sanitizeInput(titleRaw);
    
    const descriptionRaw = await question('Project Description: ');
    const description = sanitizeInput(descriptionRaw);
    
    const statusOptions = ['in-progress', 'completed', 'planned'];
    let status = await question('Status (in-progress, completed, planned): ');
    // Validate status
    if (!statusOptions.includes(status.toLowerCase())) {
      console.warn(`Warning: Invalid status "${status}". Using "in-progress" as default.`);
      status = 'in-progress';
    }
    
    const tag1Raw = await question('Primary Tag: ');
    const tag1 = sanitizeInput(tag1Raw, /^[a-zA-Z0-9\-_]+$/);
    
    const tag2Raw = await question('Secondary Tag (optional): ');
    const tag2 = tag2Raw ? sanitizeInput(tag2Raw, /^[a-zA-Z0-9\-_]+$/) : '';
    
    // Read template
    try {
      const templatePath = path.join(templatesDir, 'project-template.md');
      let template = fs.readFileSync(templatePath, 'utf-8');
      
      const slug = slugify(title);
      
      // Replace placeholders in main template
      template = template
        .replace(/{{PROJECT_TITLE}}/g, title)
        .replace(/{{PROJECT_DESCRIPTION}}/g, description)
        .replace(/{{PROJECT_SLUG}}/g, slug)
        .replace(/{{DATE}}/g, getCurrentDate())
        .replace(/{{STATUS}}/g, status)
        .replace(/{{TAG1}}/g, tag1)
        .replace(/{{TAG2}}/g, tag2 || 'misc')
        .replace(/{{TIMELINE}}/g, 'Timeline information')
        .replace(/{{GITHUB_LINK}}/g, 'https://github.com/yourusername/project')
        .replace(/{{DEMO_LINK}}/g, 'https://example.com')
        .replace(/{{PROJECT_OVERVIEW}}/g, 'Write your project overview here.')
        .replace(/{{FEATURE1}}/g, 'First feature')
        .replace(/{{FEATURE2}}/g, 'Second feature')
        .replace(/{{FEATURE3}}/g, 'Third feature')
        .replace(/{{TECH1}}/g, 'Technology 1')
        .replace(/{{TECH2}}/g, 'Technology 2')
        .replace(/{{TECH3}}/g, 'Technology 3')
        .replace(/{{IMPLEMENTATION_DETAILS}}/g, 'Write implementation details here.')
        .replace(/{{CHALLENGES_AND_SOLUTIONS}}/g, 'Write about challenges and solutions here.')
        .replace(/{{FUTURE_PLANS}}/g, 'Write about future plans here.');
      
      // Create project directory and subdirectories
      const projectDir = path.join(contentDirs.project, slug);
      const updatesDir = path.join(projectDir, 'updates');
      const assetsDir = path.join(projectDir, 'assets');
      
      try {
        if (!fs.existsSync(projectDir)) {
          fs.mkdirSync(projectDir, { recursive: true });
        }
        if (!fs.existsSync(updatesDir)) {
          fs.mkdirSync(updatesDir, { recursive: true });
        }
        if (!fs.existsSync(assetsDir)) {
          fs.mkdirSync(assetsDir, { recursive: true });
        }
      } catch (dirError) {
        console.error(`Error creating project directories: ${dirError.message}`);
        throw new Error('Failed to create project directories');
      }
      
      // Create main index file
      const indexPath = path.join(projectDir, 'index.md');
      try {
        fs.writeFileSync(indexPath, template);
      } catch (writeError) {
        console.error(`Error writing project file: ${writeError.message}`);
        throw new Error('Failed to write project file');
      }
      
      // Ask if user wants to create additional project files
      const createAdditional = await question('\nDo you want to create additional project files? (assembly, troubleshooting, discussion) (y/n): ');
      
      if (createAdditional.toLowerCase() === 'y') {
        try {
          // Create assembly guide template
          const assemblyTemplate = `---
title: "${title} - Assembly Guide"
description: "Step-by-step assembly guide for ${title}"
date: "${getCurrentDate()}"
---

# ${title} - Assembly Guide

## Prerequisites
- List of required tools
- List of required components

## Assembly Steps

### Step 1: Preparation
Detailed instructions...

### Step 2: Main Assembly
Detailed instructions...

### Step 3: Finishing Touches
Detailed instructions...

## Notes and Tips
- Important notes
- Helpful tips
`;
          fs.writeFileSync(path.join(projectDir, 'assembly.md'), assemblyTemplate);
          
          // Create troubleshooting guide template
          const troubleshootingTemplate = `---
title: "${title} - Troubleshooting"
description: "Solutions for common issues with ${title}"
date: "${getCurrentDate()}"
---

# ${title} - Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: [Problem Description]
**Symptoms:**
- Symptom 1
- Symptom 2

**Solutions:**
1. First solution
2. Alternative approach

### Issue 2: [Problem Description]
**Symptoms:**
- Symptom 1
- Symptom 2

**Solutions:**
1. First solution
2. Alternative approach

## Prevention Tips
- How to avoid common problems
- Maintenance recommendations
`;
          fs.writeFileSync(path.join(projectDir, 'troubleshooting.md'), troubleshootingTemplate);
          
          // Create discussion template
          const discussionTemplate = `---
title: "${title} - Discussion and Insights"
description: "Deeper analysis and discussion about ${title}"
date: "${getCurrentDate()}"
---

# ${title} - Discussion and Insights

## Design Decisions
Discussion of the main design decisions and trade-offs...

## Learning Outcomes
What I learned while working on this project...

## Alternative Approaches
Other ways this could have been implemented...

## Future Directions
Ideas for expanding or improving the project...
`;
          fs.writeFileSync(path.join(projectDir, 'discussion.md'), discussionTemplate);
          
          // Create a sample update
          const updateTemplate = `---
title: "${title} - Project Update"
description: "Progress update for ${title}"
date: "${getCurrentDate()}"
type: "update"
---

# ${title} - Project Update (${getCurrentDate()})

## What's New
- Accomplishment 1
- Accomplishment 2
- Accomplishment 3

## Challenges Faced
Description of challenges and how they were addressed...

## Next Steps
- Upcoming task 1
- Upcoming task 2
`;
          fs.writeFileSync(path.join(updatesDir, `${getCurrentDate()}-update.md`), updateTemplate);
        } catch (additionalFilesError) {
          console.error(`Error creating additional project files: ${additionalFilesError.message}`);
          console.warn('Some additional files may not have been created properly.');
        }
      }
      
      // Create sidebar config template for this project
      const sidebarTemplate = `{
  text: '${title}',
  collapsed: false,
  items: [
    { text: 'Overview', link: '/projects/${slug}/' },
    { text: 'Assembly Guide', link: '/projects/${slug}/assembly' },
    { text: 'Troubleshooting', link: '/projects/${slug}/troubleshooting' },
    { text: 'Discussion', link: '/projects/${slug}/discussion' },
    {
      text: 'Updates',
      collapsed: true,
      items: [
        { text: 'Latest Update', link: '/projects/${slug}/updates/${getCurrentDate()}-update' },
        // Add more updates here as they are created
      ]
    }
  ]
}`;
      
      console.log(`\nProject created at: ${projectDir}`);
      console.log(`Don't forget to add a banner image at: ${path.join(assetsDir, 'banner.png')}`);
      console.log('\nAdd this to your sidebar configuration in .vitepress/config.mts:');
      console.log(sidebarTemplate);
    } catch (error) {
      console.error(`Error in project creation: ${error.message}`);
    }
  } catch (outerError) {
    console.error(`Project creation failed: ${outerError.message}`);
  }
}

async function createProjectUpdate() {
  try {
    console.log('\n=== Creating New Project Update ===\n');
    
    // Get list of project directories
    let projectDirs;
    try {
      projectDirs = fs.readdirSync(contentDirs.project, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    } catch (readError) {
      console.error(`Error reading project directories: ${readError.message}`);
      return;
    }
    
    if (projectDirs.length === 0) {
      console.log('No projects found. Please create a project first.');
      return;
    }
    
    // List available projects
    console.log('Available projects:');
    projectDirs.forEach((dir, index) => {
      console.log(`${index + 1}. ${dir}`);
    });
    
    let projectIndex;
    try {
      const selection = await question('\nSelect a project (enter number): ');
      projectIndex = parseInt(selection) - 1;
      
      if (isNaN(projectIndex) || projectIndex < 0 || projectIndex >= projectDirs.length) {
        console.log('Invalid selection. Please try again.');
        return;
      }
    } catch (selectionError) {
      console.error(`Error during project selection: ${selectionError.message}`);
      return;
    }
    
    const projectSlug = projectDirs[projectIndex];
    
    // Try to get project title from index.md
    let projectTitle = projectSlug; // Default to slug if can't read title
    try {
      const indexPath = path.join(contentDirs.project, projectSlug, 'index.md');
      if (fs.existsSync(indexPath)) {
        const indexContent = fs.readFileSync(indexPath, 'utf-8');
        const titleMatch = indexContent.match(/^title:\s*"([^"]+)"/m);
        if (titleMatch && titleMatch[1]) {
          projectTitle = titleMatch[1];
        }
      } else {
        console.log('Project index.md not found, using directory name as title.');
      }
    } catch (titleError) {
      console.log('Could not read project title from index.md, using slug as title.');
    }
    
    // Get update details
    const updateNumberRaw = await question('Update number (e.g., 1, 2, 3): ');
    const updateNumber = sanitizeInput(updateNumberRaw, /^\d+$/);
    if (!updateNumber) {
      console.error('Invalid update number. Please enter a numeric value.');
      return;
    }
    
    const updateDescriptionRaw = await question('Update description: ');
    const updateDescription = sanitizeInput(updateDescriptionRaw);
    
    const completionPercentageRaw = await question('Completion percentage (0-100): ');
    const completionPercentage = sanitizeInput(completionPercentageRaw, /^\d+$/);
    if (isNaN(parseInt(completionPercentage)) || parseInt(completionPercentage) < 0 || parseInt(completionPercentage) > 100) {
      console.warn('Invalid completion percentage. Using 0 as default.');
      completionPercentage = '0';
    }
    
    // Read template
    let template;
    try {
      template = readTemplateFile('project-update-template.md');
    } catch (templateError) {
      console.error(`Template error: ${templateError.message}`);
      return;
    }
    
    // Replace placeholders
    template = template
      .replace(/{{PROJECT_TITLE}}/g, projectTitle)
      .replace(/{{PROJECT_SLUG}}/g, projectSlug)
      .replace(/{{UPDATE_NUMBER}}/g, updateNumber)
      .replace(/{{UPDATE_DESCRIPTION}}/g, updateDescription)
      .replace(/{{DATE}}/g, getCurrentDate())
      .replace(/{{WHATS_NEW}}/g, 'Write about what\'s new in this update.')
      .replace(/{{NEW_ITEM1}}/g, 'First new feature or accomplishment')
      .replace(/{{NEW_ITEM2}}/g, 'Second new feature or accomplishment')
      .replace(/{{NEW_ITEM3}}/g, 'Third new feature or accomplishment')
      .replace(/{{CHALLENGE_TITLE}}/g, 'Major Challenge')
      .replace(/{{CHALLENGE_DESCRIPTION}}/g, 'Describe a significant challenge you encountered.')
      .replace(/{{CHALLENGE_SOLUTION}}/g, 'Explain how you solved or worked around the challenge.')
      .replace(/{{COMPLETION_PERCENTAGE}}/g, completionPercentage)
      .replace(/{{HOURS_INVESTED}}/g, 'X')
      .replace(/{{MILESTONES_ACHIEVED}}/g, 'List key milestones reached')
      .replace(/{{NEXT_STEPS}}/g, 'Describe your plan for the next phase of development.')
      .replace(/{{NEXT_STEP1}}/g, 'First upcoming task')
      .replace(/{{NEXT_STEP2}}/g, 'Second upcoming task')
      .replace(/{{NEXT_STEP3}}/g, 'Third upcoming task')
      .replace(/{{REFLECTIONS}}/g, 'Share your thoughts on the project progress, what you\'ve learned, or any insights gained.');
    
    // Create directories if they don't exist
    try {
      // Create updates directory if it doesn't exist
      const updatesDir = path.join(contentDirs.project, projectSlug, 'updates');
      if (!fs.existsSync(updatesDir)) {
        fs.mkdirSync(updatesDir, { recursive: true });
      }
      
      // Make sure assets directory exists
      const assetsDir = path.join(contentDirs.project, projectSlug, 'assets');
      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }
      
      // Create file
      const fileName = `${getCurrentDate()}-update-${updateNumber}.md`;
      const filePath = path.join(updatesDir, fileName);
      
      if (writeContentFile(filePath, template)) {
        console.log(`\nProject update created at: ${filePath}`);
        console.log(`Don't forget to add an image at: ${path.join(assetsDir, `update-${updateNumber}.png`)}`);
        
        // Show sidebar config update
        console.log(`\nAdd this to your project's sidebar configuration:`);
        console.log(`{ text: 'Update ${updateNumber} (${getCurrentDate()})', link: '/projects/${projectSlug}/updates/${getCurrentDate()}-update-${updateNumber}' },`);
      } else {
        console.error(`Failed to create update file at: ${filePath}`);
      }
    } catch (dirError) {
      console.error(`Error creating update directories: ${dirError.message}`);
    }
  } catch (error) {
    console.error('Error creating project update:', error);
  }
}

async function createGuide() {
  try {
    console.log('\n=== Creating New Guide ===\n');
    
    const titleRaw = await question('Guide Title: ');
    const title = sanitizeInput(titleRaw);
    
    const descriptionRaw = await question('Guide Description: ');
    const description = sanitizeInput(descriptionRaw);
    
    const difficultyOptions = ['beginner', 'intermediate', 'advanced'];
    let difficulty = await question('Difficulty (beginner, intermediate, advanced): ');
    // Validate difficulty
    if (!difficultyOptions.includes(difficulty.toLowerCase())) {
      console.warn(`Warning: Invalid difficulty "${difficulty}". Using "beginner" as default.`);
      difficulty = 'beginner';
    }
    
    const timeRequiredRaw = await question('Time Required (e.g., "30 minutes"): ');
    const timeRequired = sanitizeInput(timeRequiredRaw);
    
    const tag1Raw = await question('Primary Tag: ');
    const tag1 = sanitizeInput(tag1Raw, /^[a-zA-Z0-9\-_]+$/);
    
    const tag2Raw = await question('Secondary Tag (optional): ');
    const tag2 = tag2Raw ? sanitizeInput(tag2Raw, /^[a-zA-Z0-9\-_]+$/) : '';
    
    // Read template
    let template;
    try {
      template = readTemplateFile('guide-template.md');
    } catch (templateError) {
      console.error(`Template error: ${templateError.message}`);
      return;
    }
    
    // Replace placeholders
    template = template
      .replace(/{{GUIDE_TITLE}}/g, title)
      .replace(/{{GUIDE_DESCRIPTION}}/g, description)
      .replace(/{{DATE}}/g, getCurrentDate())
      .replace(/{{DIFFICULTY}}/g, difficulty)
      .replace(/{{TIME_REQUIRED}}/g, timeRequired)
      .replace(/{{TAG1}}/g, tag1)
      .replace(/{{TAG2}}/g, tag2 || 'guide')
      .replace(/{{INTRODUCTION}}/g, 'Write your introduction here.')
      .replace(/{{PREREQUISITE1}}/g, 'First prerequisite')
      .replace(/{{PREREQUISITE2}}/g, 'Second prerequisite')
      .replace(/{{PREREQUISITE3}}/g, 'Third prerequisite')
      .replace(/{{STEP1_TITLE}}/g, 'First Step Title')
      .replace(/{{STEP1_CONTENT}}/g, 'Content for the first step.')
      .replace(/{{LANGUAGE}}/g, 'javascript')
      .replace(/{{CODE_SAMPLE}}/g, 'console.log("Hello World");')
      .replace(/{{STEP2_TITLE}}/g, 'Second Step Title')
      .replace(/{{STEP2_CONTENT}}/g, 'Content for the second step.')
      .replace(/{{STEP3_TITLE}}/g, 'Third Step Title')
      .replace(/{{STEP3_CONTENT}}/g, 'Content for the third step.')
      .replace(/{{ISSUE1}}/g, 'Common Issue 1')
      .replace(/{{SOLUTION1}}/g, 'Solution for common issue 1.')
      .replace(/{{ISSUE2}}/g, 'Common Issue 2')
      .replace(/{{SOLUTION2}}/g, 'Solution for common issue 2.')
      .replace(/{{CONCLUSION}}/g, 'Write your conclusion here.')
      .replace(/{{RESOURCE1_TITLE}}/g, 'First Resource')
      .replace(/{{RESOURCE1_URL}}/g, 'https://example.com/resource1')
      .replace(/{{RESOURCE2_TITLE}}/g, 'Second Resource')
      .replace(/{{RESOURCE2_URL}}/g, 'https://example.com/resource2');
    
    // Create file
    const slug = slugify(title);
    const fileName = `${slug}.md`;
    const filePath = path.join(contentDirs.guide, fileName);
    
    if (writeContentFile(filePath, template)) {
      console.log(`\nGuide created at: ${filePath}`);
    } else {
      console.error(`\nFailed to create guide at: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error creating guide: ${error.message}`);
  }
}

async function main() {
  // Check if setup is correct
  if (!checkSetup()) {
    console.log('\nPlease fix the issues above before continuing.');
    rl.close();
    return;
  }

  try {
    console.log('=== VitePress Content Generator ===');
    console.log('1. Create Blog Post');
    console.log('2. Create Project');
    console.log('3. Create Project Update');
    console.log('4. Create Guide');
    console.log('5. Exit');
    
    const choice = await question('\nEnter your choice (1-5): ');
    
    switch (choice) {
      case '1':
        await createBlogPost();
        break;
      case '2':
        await createProject();
        break;
      case '3':
        await createProjectUpdate();
        break;
      case '4':
        await createGuide();
        break;
      case '5':
        console.log('Exiting...');
        rl.close();
        return;
      default:
        console.log('Invalid choice, please try again.');
    }
    
    const another = await question('\nCreate another content? (y/n): ');
    if (another.toLowerCase() === 'y') {
      await main();
    } else {
      rl.close();
    }
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
    rl.close();
  }
}

// Run the script
main().catch(err => {
  console.error('Error:', err);
  rl.close();
});