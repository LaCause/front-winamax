import { describe, it, expect, Mock, vi } from 'vitest'
import { Navigation } from './Navigation'
import { render } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'

describe('Navigation', () => {
    it('should display navigation', async () => {
        const wrapper = render(
            <BrowserRouter>
                <Navigation />
            </BrowserRouter>
        );

        expect(wrapper.container.innerHTML).toEqual(`<nav class="fixed flex bottom-0 border-t-[1.5px] border-[#c2c7d6] justify-around w-full py-2 text-black z-10 bg-white font-archivoNarrow"><a href="/"><img src="/assets/icons/Home-Actif.svg" width="40" class="m-auto">Home</a><a href="/read_me"><img src="/assets/icons/Readme-Inactif.svg" width="40" class="m-auto">Readme</a></nav>`)
    })
})