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
  
  // Basic HTML sanitization - this is a simplified approach
  // For production, consider adding DOMPurify as a dependency
  const cleaned = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '')
    .replace(/on\w+=\w+/g, '')
    // Additional sanitization for iframes, objects, and other potentially dangerous tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<base\b[^>]*>/gi, '');
    
  return cleaned;
}

// Add this comment to the file to highlight the need for a proper sanitization library
/**
 * TODO: For production use, replace this basic sanitization with a proper library like DOMPurify:
 * 
 * 1. Add to package.json:
 *    "dependencies": {
 *      "dompurify": "^3.0.1",
 *      "@types/dompurify": "^3.0.0"
 *    }
 * 
 * 2. Import and use DOMPurify:
 *    import DOMPurify from 'dompurify';
 *    
 *    export function sanitizeHtml(html: string): string {
 *      if (!html) return '';
 *      
 *      return DOMPurify.sanitize(html, {
 *        ALLOWED_TAGS: ['p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
 *        ALLOWED_ATTR: ['href', 'target', 'rel'],
 *        FORBID_TAGS: ['script', 'style', 'iframe', 'frame', 'object', 'embed'],
 *        FORBID_ATTR: ['onerror', 'onload', 'onclick']
 *      });
 *    }
 */