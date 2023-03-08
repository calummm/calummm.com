export interface TagDef {
  // name: string;
  urlName?: string;
  description: string;
  color?: string;
  backgroundColor: string;
}

export interface Tag extends TagDef {
  name: string;
  count: number;
}

export const tagList: Record<string, TagDef> = {
  'Building this site': {
    backgroundColor: 'red',
    description:
      'How and why I built this site and the thought process throughout',
  },
  webdev: {
    backgroundColor: 'blue',
    color: 'white',
    description: 'Anything relating to build on the internet',
  },
  sveltekit: {
    backgroundColor: 'orange',
    description:
      'SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte. https://kit.svelte.dev/',
  },
  Ongoing: {
    backgroundColor: 'yellow',
    color: 'black',
    description:
      'A long running post with frequent updates. Check back for more!',
  },
};
