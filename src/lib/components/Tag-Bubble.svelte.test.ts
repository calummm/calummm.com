import { render, type RenderResult } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import TagBubble from './Tag-bubble.svelte';

describe('Footer.svelte', () => {
  let instance: RenderResult<TagBubble>;

  it('should initialise', () => {
    instance = render(TagBubble);

    expect(instance).toBeDefined();
  });
});
