import { render, type RenderResult } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Footer from './Footer.svelte';

describe('Footer.svelte', () => {
  let instance: RenderResult<Footer>;

  it('should initialise', () => {
    instance = render(Footer);

    expect(instance).toBeDefined();
  });
});
