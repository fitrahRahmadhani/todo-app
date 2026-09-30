import { generateSlug } from '@/utils/formatText'
import { describe, expect, it } from 'vitest'

describe('generateSlug', () => {
  it('return text format kebab-case dari text format capitalized', () => {
    expect(generateSlug('Lorem Ipsum')).toBe('lorem-ipsum')
  })

  it('return text format kebab-case dari text format lowercase', () => {
    expect(generateSlug('lorem ipsum')).toBe('lorem-ipsum')
  })

  it('return text format kebab-case dari text format uppercase', () => {
    expect(generateSlug('LOREM IPSUM')).toBe('lorem-ipsum')
  })

  it('return text format kebab-case dari text format uppercase', () => {
    expect(generateSlug('LOREM IPSUM')).toBe('lorem-ipsum')
  })

  it('ubah teks jadi lowercase', () => {
    expect(generateSlug('Marketing')).toBe('marketing')
    expect(generateSlug('UPPERCASE TEXT')).toBe('uppercase-text')
  })

  it('ubah spasi jadi hyphen', () => {
    expect(generateSlug('Hello World')).toBe('hello-world')
  })

  it('gabungin banyak spasi berurutan jadi satu hyphen', () => {
    expect(generateSlug('Multiple   Spaces   Between')).toBe('multiple-spaces-between')
  })

  it('trim spasi di awal/akhir teks', () => {
    expect(generateSlug('  Hello World!!  ')).toBe('hello-world')
  })

  it('hapus tanda baca/simbol (!, $, #, @, dst)', () => {
    expect(generateSlug('Special $#@! Chars')).toBe('special-chars')
  })

  it('gabungin banyak hyphen berurutan jadi satu', () => {
    expect(generateSlug('a---b')).toBe('a-b')
  })

  it('hapus hyphen yang nyangkut di awal/akhir hasil', () => {
    expect(generateSlug('---leading and trailing---')).toBe('leading-and-trailing')
  })

  it('tetap pertahankan angka', () => {
    expect(generateSlug('123 Numbers Here')).toBe('123-numbers-here')
  })

  it('return string kosong kalau isinya cuma spasi', () => {
    expect(generateSlug('   ')).toBe('')
  })

  it('return string kosong kalau input-nya string kosong', () => {
    expect(generateSlug('')).toBe('')
  })

  it('bisa nerima angka (number), bukan cuma string', () => {
    expect(generateSlug(123)).toBe('123')
  })
})
