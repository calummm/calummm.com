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
  tags: string[];
}

// export interface BlogMetaData {}
