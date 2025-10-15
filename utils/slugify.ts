export const slugify = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

//deslugify to find slug via api
export const deslugify = (slug: string): string =>
  decodeURIComponent(slug).replace(/-/g, ' ');
