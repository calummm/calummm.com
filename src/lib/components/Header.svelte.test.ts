import { render, type RenderResult } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Header from './Header.svelte';

describe('Footer.svelte', () => {
  let instance: RenderResult<Header>;

  it('should initialise', () => {
    instance = render(Header);

    expect(instance).toBeDefined();
  });
});
