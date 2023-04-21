import { describe, it, afterEach, test, expect } from 'vitest';
import { fetchMarkdownPosts } from './posts';

afterEach(() => {
  // host.remove()
});

describe('fetchMarkdownPosts with defaults', async () => {
  const defaultPosts = await fetchMarkdownPosts();
  // console.log(defaultPosts);

  it('to be an array', async () => {
    expect(Array.isArray(defaultPosts)).toBeTruthy();
  });

  it('to have at least one entry', async () => {
    expect(defaultPosts?.length).toBeGreaterThanOrEqual(1);
  });
});
