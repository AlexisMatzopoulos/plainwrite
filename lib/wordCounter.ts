export function countWords(text: string): number {
  if (!text || text.trim().length === 0) {
    return 0;
  }

  // Remove extra whitespace and split by whitespace
  return text.trim().split(/\s+/).length;
}
