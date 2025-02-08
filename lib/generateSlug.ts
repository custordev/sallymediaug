export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .normalize("NFD") // Normalize unicode characters
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with single dash
    .replace(/^-+|-+$/g, "") // Remove leading/trailing dashes
    .substring(0, 50); // Limit slug length
}
