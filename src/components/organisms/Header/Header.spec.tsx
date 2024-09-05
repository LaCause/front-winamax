import { describe, it, expect, } from 'vitest'
import { render } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
    it('should return header component', () => {
        const wrapper = render(<Header />)
        expect(wrapper.container.innerHTML).toEqual(`<header class="z-20 fixed w-full bg-white flex justify-center border-b-[1.5px] border-[#c2c7d6] mb-2"><img src="/logo.png" width="50"></header>`)
    })
})