import { render, type RenderResult } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ThemeSwitcher from './Theme-switcher.svelte';

describe('Footer.svelte', () => {
  let instance: RenderResult<ThemeSwitcher>;

  it('should initialise', () => {
    instance = render(ThemeSwitcher);

    expect(instance).toBeDefined();
  });
});
