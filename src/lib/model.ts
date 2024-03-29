import type { SvelteComponent } from 'svelte';

export interface BlogData {
  content: SvelteComponent;
  // PostContent: unknown;
  // Content: SvelteComponentTyped<{ propertyName: string }>;
  meta: BlogMetaData;
}

export interface BlogMetaData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  published: string;
  slug: string;
  subtitle?: string;
  updated?: string;
  started?: string;
  image?: string;
  visible?: boolean;
}

export interface Post {
  path: string;
  meta: BlogMetaData;
}

// export interface BlogMetaData {}
