import type {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'http://localhost:3000';
  const routes = ['', '/fields', '/goals', '/tools', '/prompts', '/guides', '/ranking/trending', '/ranking/most-used', '/ranking/most-saved', '/submit'];
  return ['ar', 'en'].flatMap((locale) => routes.map((r) => ({url: `${base}/${locale}${r}`, lastModified: new Date()})));
}
