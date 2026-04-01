import { beforeEach, describe, expect, it } from 'vitest'

import { storage } from '@/shared/utils/storage'

describe('storage helper', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('stores and reads strings', () => {
    storage.setString('token', 'abc')

    expect(storage.getString('token')).toBe('abc')
  })

  it('stores and reads json objects', () => {
    storage.setObject('user', {
      id: '1',
      name: 'tester'
    })

    expect(storage.getObject<{ id: string; name: string }>('user')).toEqual({
      id: '1',
      name: 'tester'
    })
  })

  it('returns null and clears broken json payloads', () => {
    window.localStorage.setItem('broken', '{invalid-json')

    expect(storage.getObject('broken')).toBeNull()
    expect(window.localStorage.getItem('broken')).toBeNull()
  })
})
