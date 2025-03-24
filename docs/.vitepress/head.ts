// docs/.vitepress/head.ts
export const securityHeaders = [
    ['meta', {
      'http-equiv': 'Content-Security-Policy',
      content: "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'"
    }]
  ];