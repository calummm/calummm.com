import type { SvelteComponentTyped } from 'svelte';

export interface BlogData {
  PostContent: unknown;
  // Content: SvelteComponentTyped<{ propertyName: string }>;
  meta: {
    title: string;
    date: string;
  };
}

export interface BlogMetaData {}
