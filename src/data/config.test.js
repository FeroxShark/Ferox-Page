import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import config from './config.json'

const here = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(here, '../../public')

// Every image path the app references must exist under public/.
function collectImagePaths(cfg) {
  const paths = new Set()
  if (cfg.profileImageUrl) paths.add(cfg.profileImageUrl)
  for (const item of cfg.galleryItems ?? []) paths.add(item.imageUrl)
  for (const link of cfg.socialMediaLinks ?? []) paths.add(link.icon)
  return [...paths]
}

describe('config.json assets', () => {
  it('references only files that exist in public/', () => {
    for (const p of collectImagePaths(config)) {
      expect(existsSync(resolve(publicDir, p)), `missing asset: ${p}`).toBe(true)
    }
  })

  it('gives every gallery item a non-placeholder description', () => {
    for (const item of config.galleryItems) {
      expect(item.description).toBeTruthy()
      expect(item.description).not.toMatch(/Artwork \d+ description|test text flow/i)
    }
  })

  it('has a valid birthday used for the age calculation', () => {
    expect(config.birthday).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
