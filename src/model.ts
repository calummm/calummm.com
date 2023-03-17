import type { SvelteComponent, SvelteComponentTyped } from 'svelte';

export interface BlogData {
  content: SvelteComponent;
  // PostContent: unknown;
  // Content: SvelteComponentTyped<{ propertyName: string }>;
  meta: BlogMetaData;
}

export interface BlogMetaData {
  title: string;
  date: string;
  category: string;
  tags: string[];
  published: string;
  updated?: string;
  thumbnail?: string;
  description?: string;
}

export interface Post {
  path: string;
  meta: BlogMetaData;
}

// export interface BlogMetaData {}
