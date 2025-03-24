// docs/content/projects/projects.data.ts
import { createContentLoader } from "file:///C:/Users/colte/Desktop/Github/ColterPlus/node_modules/.pnpm/vitepress@1.6.3_@algolia+cl_e37fd06239e8fcfc7c48034ced0f1f46/node_modules/vitepress/dist/node/index.js";
var projects_data_default = createContentLoader("projects/*/index.md", {
  transform(rawData) {
    return rawData.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date || "1970-01-01");
      const dateB = new Date(b.frontmatter.date || "1970-01-01");
      return dateB.getTime() - dateA.getTime();
    }).map((page) => {
      const urlParts = page.url.split("/");
      const projectDir = urlParts[urlParts.length - 2] || "";
      const date = new Date(page.frontmatter.date || "");
      return {
        ...page,
        dir: projectDir,
        date: {
          raw: page.frontmatter.date,
          formatted: date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }),
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      };
    });
  }
});
export {
  projects_data_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy9jb250ZW50L3Byb2plY3RzL3Byb2plY3RzLmRhdGEudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxjb2x0ZVxcXFxEZXNrdG9wXFxcXEdpdGh1YlxcXFxDb2x0ZXJQbHVzXFxcXGRvY3NcXFxcY29udGVudFxcXFxwcm9qZWN0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcY29sdGVcXFxcRGVza3RvcFxcXFxHaXRodWJcXFxcQ29sdGVyUGx1c1xcXFxkb2NzXFxcXGNvbnRlbnRcXFxccHJvamVjdHNcXFxccHJvamVjdHMuZGF0YS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvY29sdGUvRGVza3RvcC9HaXRodWIvQ29sdGVyUGx1cy9kb2NzL2NvbnRlbnQvcHJvamVjdHMvcHJvamVjdHMuZGF0YS50c1wiO2ltcG9ydCB7IGNyZWF0ZUNvbnRlbnRMb2FkZXIgfSBmcm9tICd2aXRlcHJlc3MnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb250ZW50TG9hZGVyKCdwcm9qZWN0cy8qL2luZGV4Lm1kJywge1xyXG4gIHRyYW5zZm9ybShyYXdEYXRhKSB7XHJcbiAgICByZXR1cm4gcmF3RGF0YVxyXG4gICAgICAuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgIC8vIFNvcnQgYnkgZGF0ZSAobmV3ZXN0IGZpcnN0KVxyXG4gICAgICAgIGNvbnN0IGRhdGVBID0gbmV3IERhdGUoYS5mcm9udG1hdHRlci5kYXRlIHx8ICcxOTcwLTAxLTAxJylcclxuICAgICAgICBjb25zdCBkYXRlQiA9IG5ldyBEYXRlKGIuZnJvbnRtYXR0ZXIuZGF0ZSB8fCAnMTk3MC0wMS0wMScpXHJcbiAgICAgICAgcmV0dXJuIGRhdGVCLmdldFRpbWUoKSAtIGRhdGVBLmdldFRpbWUoKVxyXG4gICAgICB9KVxyXG4gICAgICAubWFwKChwYWdlKSA9PiB7XHJcbiAgICAgICAgLy8gRXh0cmFjdCBwcm9qZWN0IGRpcmVjdG9yeSBuYW1lIGZyb20gVVJMXHJcbiAgICAgICAgY29uc3QgdXJsUGFydHMgPSBwYWdlLnVybC5zcGxpdCgnLycpXHJcbiAgICAgICAgY29uc3QgcHJvamVjdERpciA9IHVybFBhcnRzW3VybFBhcnRzLmxlbmd0aCAtIDJdIHx8ICcnXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gRXh0cmFjdCBkYXRlIGluZm9ybWF0aW9uXHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHBhZ2UuZnJvbnRtYXR0ZXIuZGF0ZSB8fCAnJylcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgLi4ucGFnZSxcclxuICAgICAgICAgIGRpcjogcHJvamVjdERpcixcclxuICAgICAgICAgIGRhdGU6IHtcclxuICAgICAgICAgICAgcmF3OiBwYWdlLmZyb250bWF0dGVyLmRhdGUsXHJcbiAgICAgICAgICAgIGZvcm1hdHRlZDogZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xyXG4gICAgICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcclxuICAgICAgICAgICAgICBtb250aDogJ2xvbmcnLFxyXG4gICAgICAgICAgICAgIGRheTogJ251bWVyaWMnXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgIG1vbnRoOiBkYXRlLmdldE1vbnRoKCkgKyAxLFxyXG4gICAgICAgICAgICBkYXk6IGRhdGUuZ2V0RGF0ZSgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gIH1cclxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQWtZLFNBQVMsMkJBQTJCO0FBRXRhLElBQU8sd0JBQVEsb0JBQW9CLHVCQUF1QjtBQUFBLEVBQ3hELFVBQVUsU0FBUztBQUNqQixXQUFPLFFBQ0osS0FBSyxDQUFDLEdBQUcsTUFBTTtBQUVkLFlBQU0sUUFBUSxJQUFJLEtBQUssRUFBRSxZQUFZLFFBQVEsWUFBWTtBQUN6RCxZQUFNLFFBQVEsSUFBSSxLQUFLLEVBQUUsWUFBWSxRQUFRLFlBQVk7QUFDekQsYUFBTyxNQUFNLFFBQVEsSUFBSSxNQUFNLFFBQVE7QUFBQSxJQUN6QyxDQUFDLEVBQ0EsSUFBSSxDQUFDLFNBQVM7QUFFYixZQUFNLFdBQVcsS0FBSyxJQUFJLE1BQU0sR0FBRztBQUNuQyxZQUFNLGFBQWEsU0FBUyxTQUFTLFNBQVMsQ0FBQyxLQUFLO0FBR3BELFlBQU0sT0FBTyxJQUFJLEtBQUssS0FBSyxZQUFZLFFBQVEsRUFBRTtBQUVqRCxhQUFPO0FBQUEsUUFDTCxHQUFHO0FBQUEsUUFDSCxLQUFLO0FBQUEsUUFDTCxNQUFNO0FBQUEsVUFDSixLQUFLLEtBQUssWUFBWTtBQUFBLFVBQ3RCLFdBQVcsS0FBSyxtQkFBbUIsU0FBUztBQUFBLFlBQzFDLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxZQUNQLEtBQUs7QUFBQSxVQUNQLENBQUM7QUFBQSxVQUNELE1BQU0sS0FBSyxZQUFZO0FBQUEsVUFDdkIsT0FBTyxLQUFLLFNBQVMsSUFBSTtBQUFBLFVBQ3pCLEtBQUssS0FBSyxRQUFRO0FBQUEsUUFDcEI7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDTDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
