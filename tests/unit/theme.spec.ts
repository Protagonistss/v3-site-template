import { afterEach, describe, expect, it } from 'vitest'

import {
  applyThemePreference,
  createThemeCssVars,
  DEFAULT_THEME_PREFERENCE,
  resolveThemeTokens,
  type ThemePreference
} from '@/theme/brand'
import { createUiThemeOverrides } from '@/ui/provider/theme'

describe('theme catalog', () => {
  const defaultTokens = resolveThemeTokens(DEFAULT_THEME_PREFERENCE)

  afterEach(() => {
    Object.keys(createThemeCssVars(defaultTokens)).forEach((name) => {
      document.documentElement.style.removeProperty(name)
    })
    document.documentElement.removeAttribute('data-theme-brand')
    document.documentElement.removeAttribute('data-theme-mode')
    document.documentElement.style.colorScheme = ''
  })

  it('creates css variables from the resolved active theme', () => {
    const preference: ThemePreference = {
      brand: 'aurora',
      mode: 'dark'
    }
    const activeTheme = resolveThemeTokens(preference)
    const cssVars = createThemeCssVars(activeTheme)

    expect(cssVars['--color-primary']).toBe(activeTheme.color.primary)
    expect(cssVars['--font-sans']).toBe(activeTheme.font.sans)
    expect(cssVars['--radius-xl']).toBe(activeTheme.radius.xl)
    expect(cssVars['--gradient-brand']).toBe(
      `linear-gradient(135deg, ${activeTheme.color.primary} 0%, ${activeTheme.color.primaryHover} 100%)`
    )
  })

  it('applies css variables and root attributes for a preference', () => {
    const preference: ThemePreference = {
      brand: 'aurora',
      mode: 'dark'
    }
    const activeTheme = resolveThemeTokens(preference)
    applyThemePreference(preference)

    expect(
      document.documentElement.style.getPropertyValue('--color-primary')
    ).toBe(activeTheme.color.primary)
    expect(
      document.documentElement.style.getPropertyValue('--gradient-layout-shell')
    ).toBe(activeTheme.gradient.layoutShell)
    expect(document.documentElement.dataset.themeBrand).toBe(preference.brand)
    expect(document.documentElement.dataset.themeMode).toBe(preference.mode)
    expect(document.documentElement.style.colorScheme).toBe(preference.mode)
  })

  it('creates naive-ui overrides from the same source', () => {
    const activeTheme = resolveThemeTokens({
      brand: 'classic',
      mode: 'dark'
    })
    const overrides = createUiThemeOverrides(activeTheme)

    expect(overrides.common?.primaryColor).toBe(activeTheme.color.primary)
    expect(overrides.common?.fontFamily).toBe(activeTheme.font.sans)
    expect(overrides.Button?.borderRadiusMedium).toBe(activeTheme.radius.md)
    expect(overrides.Menu?.itemColorActiveInverted).toBe(
      `linear-gradient(135deg, ${activeTheme.color.primary} 0%, ${activeTheme.color.primaryHover} 100%)`
    )
  })
})
