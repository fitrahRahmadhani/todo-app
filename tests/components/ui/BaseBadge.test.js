import BaseBadge from '@/components/ui/BaseBadge.vue'
import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

describe('BaseBadge', () => {
  it('menampilkan value dari props', () => {
    const wrapper = mount(BaseBadge, { props: { status: 'high' } })
    expect(wrapper.text()).toBe('high')
  })

  it.each([
    ['high', 'bg-red-100', 'text-red-600'],
    ['medium', 'bg-yellow-100', 'text-yellow-600'],
    ['low', 'bg-blue-100', 'text-blue-600'],
  ])('memakai warna yang sesuai untuk status %s', (status, bg, text) => {
    const wrapper = mount(BaseBadge, { props: { status } })
    expect(wrapper.classes()).toContain(bg)
    expect(wrapper.classes()).toContain(text)
  })
})
