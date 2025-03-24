// docs/content/blog/posts.data.ts
import { createContentLoader } from "file:///C:/Users/colte/Desktop/Github/ColterPlus/node_modules/.pnpm/vitepress@1.6.3_@algolia+cl_e2da68c4b04ed0da6d78f07504c5077d/node_modules/vitepress/dist/node/index.js";
var posts_data_default = createContentLoader("blog/*.md", {
  excerpt: true,
  transform(rawData) {
    return rawData.sort((a, b) => {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    }).map((post) => {
      const date = new Date(post.frontmatter.date);
      return {
        ...post,
        date: {
          raw: post.frontmatter.date,
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
  posts_data_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy9jb250ZW50L2Jsb2cvcG9zdHMuZGF0YS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGNvbHRlXFxcXERlc2t0b3BcXFxcR2l0aHViXFxcXENvbHRlclBsdXNcXFxcZG9jc1xcXFxjb250ZW50XFxcXGJsb2dcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGNvbHRlXFxcXERlc2t0b3BcXFxcR2l0aHViXFxcXENvbHRlclBsdXNcXFxcZG9jc1xcXFxjb250ZW50XFxcXGJsb2dcXFxccG9zdHMuZGF0YS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvY29sdGUvRGVza3RvcC9HaXRodWIvQ29sdGVyUGx1cy9kb2NzL2NvbnRlbnQvYmxvZy9wb3N0cy5kYXRhLnRzXCI7aW1wb3J0IHsgY3JlYXRlQ29udGVudExvYWRlciB9IGZyb20gJ3ZpdGVwcmVzcydcclxuaW1wb3J0IHR5cGUgeyBDb250ZW50RGF0YSB9IGZyb20gJ3ZpdGVwcmVzcydcclxuXHJcbmludGVyZmFjZSBQb3N0RnJvbnRtYXR0ZXIge1xyXG4gIHRpdGxlOiBzdHJpbmdcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nXHJcbiAgZGF0ZTogc3RyaW5nXHJcbiAgdGFnczogc3RyaW5nW11cclxuICBhdXRob3I6IHN0cmluZ1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUG9zdCBleHRlbmRzIENvbnRlbnREYXRhIHtcclxuICBmcm9udG1hdHRlcjogUG9zdEZyb250bWF0dGVyXHJcbiAgZXhjZXJwdDogc3RyaW5nIHwgdW5kZWZpbmVkXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbnRlbnRMb2FkZXIoJ2Jsb2cvKi5tZCcsIHtcclxuICBleGNlcnB0OiB0cnVlLFxyXG4gIHRyYW5zZm9ybShyYXdEYXRhKSB7XHJcbiAgICByZXR1cm4gcmF3RGF0YVxyXG4gICAgICAuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShiLmZyb250bWF0dGVyLmRhdGUpLmdldFRpbWUoKSAtIG5ldyBEYXRlKGEuZnJvbnRtYXR0ZXIuZGF0ZSkuZ2V0VGltZSgpXHJcbiAgICAgIH0pXHJcbiAgICAgIC5tYXAocG9zdCA9PiB7XHJcbiAgICAgICAgLy8gRXh0cmFjdCBkYXRlIGluZm9ybWF0aW9uXHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHBvc3QuZnJvbnRtYXR0ZXIuZGF0ZSlcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgLi4ucG9zdCxcclxuICAgICAgICAgIGRhdGU6IHtcclxuICAgICAgICAgICAgcmF3OiBwb3N0LmZyb250bWF0dGVyLmRhdGUsXHJcbiAgICAgICAgICAgIGZvcm1hdHRlZDogZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xyXG4gICAgICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcclxuICAgICAgICAgICAgICBtb250aDogJ2xvbmcnLFxyXG4gICAgICAgICAgICAgIGRheTogJ251bWVyaWMnXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgIG1vbnRoOiBkYXRlLmdldE1vbnRoKCkgKyAxLFxyXG4gICAgICAgICAgICBkYXk6IGRhdGUuZ2V0RGF0ZSgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gIH1cclxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQWdYLFNBQVMsMkJBQTJCO0FBZ0JwWixJQUFPLHFCQUFRLG9CQUFvQixhQUFhO0FBQUEsRUFDOUMsU0FBUztBQUFBLEVBQ1QsVUFBVSxTQUFTO0FBQ2pCLFdBQU8sUUFDSixLQUFLLENBQUMsR0FBRyxNQUFNO0FBQ2QsYUFBTyxJQUFJLEtBQUssRUFBRSxZQUFZLElBQUksRUFBRSxRQUFRLElBQUksSUFBSSxLQUFLLEVBQUUsWUFBWSxJQUFJLEVBQUUsUUFBUTtBQUFBLElBQ3ZGLENBQUMsRUFDQSxJQUFJLFVBQVE7QUFFWCxZQUFNLE9BQU8sSUFBSSxLQUFLLEtBQUssWUFBWSxJQUFJO0FBRTNDLGFBQU87QUFBQSxRQUNMLEdBQUc7QUFBQSxRQUNILE1BQU07QUFBQSxVQUNKLEtBQUssS0FBSyxZQUFZO0FBQUEsVUFDdEIsV0FBVyxLQUFLLG1CQUFtQixTQUFTO0FBQUEsWUFDMUMsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLFlBQ1AsS0FBSztBQUFBLFVBQ1AsQ0FBQztBQUFBLFVBQ0QsTUFBTSxLQUFLLFlBQVk7QUFBQSxVQUN2QixPQUFPLEtBQUssU0FBUyxJQUFJO0FBQUEsVUFDekIsS0FBSyxLQUFLLFFBQVE7QUFBQSxRQUNwQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNMO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
