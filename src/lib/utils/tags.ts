export interface TagDef {
  description: string;
  urlName?: string;
  style?: string;
}

export interface Tag extends TagDef {
  name: string;
  // count: number;
}

export const tagList: Record<string, TagDef> = {
  'Building this site': {
    style: 'bg-purple-700 text-gray-50',
    description:
      'How and why I built this site and the thought process throughout',
  },
  webdev: {
    style: 'bg-teal-500',
    description: 'Anything relating to building on the internet',
  },
  sveltekit: {
    style: 'bg-rose-700 text-gray-50',
    description:
      'SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte. https://kit.svelte.dev/',
  },
  Ongoing: {
    style: 'bg-green-500',
    description:
      'A long running post with frequent updates. Check back for more!',
  },
};
