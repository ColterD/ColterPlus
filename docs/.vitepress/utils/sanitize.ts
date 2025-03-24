/**
 * Sanitizes user input to prevent XSS and other injection attacks
 */
export function sanitizeInput(input: string): string {
    if (!input) return '';
    
    // Replace potentially dangerous characters
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/`/g, '&#96;');
  }
  
  /**
   * Sanitizes a URL to prevent javascript: protocol and other injection vectors
   */
  export function sanitizeUrl(url: string): string {
    if (!url) return '';
    
    const sanitized = url.trim().toLowerCase();
    
    // Check for dangerous protocols
    if (sanitized.startsWith('javascript:') || 
        sanitized.startsWith('data:') || 
        sanitized.startsWith('vbscript:')) {
      return '';
    }
    
    return url;
  }
  
  /**
   * Sanitizes HTML content for safe rendering
   * Use with caution - prefer sanitizeInput for user-generated content
   */
  export function sanitizeHtml(html: string): string {
    if (!html) return '';
    
    // Basic HTML sanitization - replace with a proper library in production
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/on\w+='[^']*'/g, '')
      .replace(/on\w+=\w+/g, '');
  }