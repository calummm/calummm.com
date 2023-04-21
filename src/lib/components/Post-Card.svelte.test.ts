import { render, type RenderResult } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import PostCard from './Post-Card.svelte';

describe('Footer.svelte', () => {
  let instance: RenderResult<PostCard>;

  it('should initialise', () => {
    instance = render(PostCard);

    expect(instance).toBeDefined();
  });
});
