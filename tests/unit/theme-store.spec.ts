import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { appConfig } from '@/config/app'
import { STORAGE_KEYS } from '@/shared/constants/app'
import { createThemeCssVars, resolveThemeTokens } from '@/theme/brand'
import { useThemeStore } from '@/stores/theme'

describe('theme store', () => {
  const defaultTokens = resolveThemeTokens({
    brand: appConfig.defaultThemeBrand,
    mode: appConfig.defaultThemeMode
  })

  beforeEach(() => {
    setActivePinia(createPinia())
    window.localStorage.clear()
    document.documentElement.removeAttribute('data-theme-brand')
    document.documentElement.removeAttribute('data-theme-mode')
    document.documentElement.style.colorScheme = ''

    Object.keys(createThemeCssVars(defaultTokens)).forEach((name) => {
      document.documentElement.style.removeProperty(name)
    })
  })

  it('initializes from persisted preference', () => {
    window.localStorage.setItem(
      STORAGE_KEYS.theme,
      JSON.stringify({
        brand: 'aurora',
        mode: 'dark'
      })
    )

    const themeStore = useThemeStore()
    themeStore.initialize()

    expect(themeStore.brand).toBe('aurora')
    expect(themeStore.mode).toBe('dark')
    expect(themeStore.resolvedTokens.color.primary).toBe(
      resolveThemeTokens({
        brand: 'aurora',
        mode: 'dark'
      }).color.primary
    )
    expect(document.documentElement.dataset.themeBrand).toBe('aurora')
    expect(document.documentElement.dataset.themeMode).toBe('dark')
  })

  it('falls back to default theme when persisted value is invalid', () => {
    window.localStorage.setItem(
      STORAGE_KEYS.theme,
      JSON.stringify({
        brand: 'invalid',
        mode: 'night'
      })
    )

    const themeStore = useThemeStore()
    themeStore.initialize()

    expect(themeStore.brand).toBe(appConfig.defaultThemeBrand)
    expect(themeStore.mode).toBe(appConfig.defaultThemeMode)
    expect(window.localStorage.getItem(STORAGE_KEYS.theme)).toBe(
      JSON.stringify({
        brand: appConfig.defaultThemeBrand,
        mode: appConfig.defaultThemeMode
      })
    )
  })

  it('persists and applies changes when switching theme', () => {
    const themeStore = useThemeStore()
    themeStore.initialize()

    themeStore.setBrand('aurora')
    themeStore.setMode('dark')

    expect(themeStore.brand).toBe('aurora')
    expect(themeStore.mode).toBe('dark')
    expect(
      document.documentElement.style.getPropertyValue('--color-primary')
    ).toBe(
      resolveThemeTokens({
        brand: 'aurora',
        mode: 'dark'
      }).color.primary
    )
    expect(window.localStorage.getItem(STORAGE_KEYS.theme)).toBe(
      JSON.stringify({
        brand: 'aurora',
        mode: 'dark'
      })
    )
  })
})
