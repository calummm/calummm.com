import type { SvelteComponentTyped } from 'svelte';

export interface BlogData {
  PostContent: unknown;
  // Content: SvelteComponentTyped<{ propertyName: string }>;
  meta: BlogMetaData;
}

export interface BlogMetaData {
  title: string;
  date: string;
  tags: string[];
}

export interface BlogMetaData {}
