import type { PagesCollectionItem, ProjectsCollectionItem } from '@nuxt/content';

export type Color = ProjectsCollectionItem['color'];
export type Highlight = ProjectsCollectionItem['highlights'][number];
export type Page =
  | (Omit<PagesCollectionItem, 'path'> & { path?: string })
  | ProjectsCollectionItem;
