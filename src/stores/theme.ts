import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { appConfig } from '@/config/app'
import { STORAGE_KEYS } from '@/shared/constants/app'
import { storage } from '@/shared/utils/storage'
import {
  applyThemePreference,
  normalizeThemePreference,
  resolveThemeTokens,
  type ThemeBrandId,
  type ThemeMode,
  type ThemePreference
} from '@/theme/brand'

const defaultThemePreference: ThemePreference = {
  brand: appConfig.defaultThemeBrand,
  mode: appConfig.defaultThemeMode
}

export const useThemeStore = defineStore('theme', () => {
  const brand = ref<ThemeBrandId>(defaultThemePreference.brand)
  const mode = ref<ThemeMode>(defaultThemePreference.mode)

  const preference = computed<ThemePreference>(() => ({
    brand: brand.value,
    mode: mode.value
  }))
  const resolvedTokens = computed(() => resolveThemeTokens(preference.value))

  function syncTheme(nextPreference: ThemePreference) {
    brand.value = nextPreference.brand
    mode.value = nextPreference.mode
    applyThemePreference(nextPreference)
    storage.setObject(STORAGE_KEYS.theme, nextPreference)
  }

  function initialize() {
    const persistedPreference = storage.getObject<Partial<ThemePreference>>(
      STORAGE_KEYS.theme
    )
    const nextPreference = normalizeThemePreference(
      persistedPreference,
      defaultThemePreference
    )
    syncTheme(nextPreference)
  }

  function setTheme(nextPreference: ThemePreference) {
    syncTheme(normalizeThemePreference(nextPreference, defaultThemePreference))
  }

  function setBrand(nextBrand: ThemeBrandId) {
    if (brand.value === nextBrand) {
      return
    }

    setTheme({
      brand: nextBrand,
      mode: mode.value
    })
  }

  function setMode(nextMode: ThemeMode) {
    if (mode.value === nextMode) {
      return
    }

    setTheme({
      brand: brand.value,
      mode: nextMode
    })
  }

  function toggleMode() {
    setMode(mode.value === 'light' ? 'dark' : 'light')
  }

  function resetToDefault() {
    setTheme(defaultThemePreference)
  }

  return {
    brand,
    mode,
    preference,
    resolvedTokens,
    initialize,
    setTheme,
    setBrand,
    setMode,
    toggleMode,
    resetToDefault
  }
})
