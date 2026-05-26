import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import App from './App'

const originalOpen = window.open

beforeEach(() => {
  window.open = vi.fn()
})

afterEach(() => {
  cleanup()
  document.body.style.overflow = ''
  window.open = originalOpen
  vi.restoreAllMocks()
})

describe('La Mia Pasta main page regression coverage', () => {
  it('renders the primary hero, menu, specialties and footer CTAs', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: /pasta fresca con alma/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /pedidos por whatsapp/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /pastas tradicionales, especialidades, extras y bebidas/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^pedir ahora$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver menú completo/i })).toHaveAttribute('href', '/La-Mia-Pasta/LA_MIA_PASTA.pdf')
    expect(screen.getByText(/encuéntranos en/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^google maps$/i })).toHaveAttribute('href', 'https://maps.app.goo.gl/jfcreP4xnpdYLhX9A?g_st=ic')
    expect(screen.getByText(/toca para llegar fácilmente/i)).toBeInTheDocument()
    expect(screen.getByTitle(/ubicación de la mia pasta en google maps/i)).toBeInTheDocument()
    expect(screen.getByTitle(/ubicación de la mia pasta en google maps/i)).toHaveAttribute('src', expect.stringContaining('google.com/maps'))
    expect(screen.getByText(/síguenos en/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /facebook de la mia pasta/i })).toHaveAttribute('href', 'https://www.facebook.com/share/15nVQhV4ZW/?mibextid=wwXIfr')
    expect(screen.getByRole('link', { name: /instagram de la mia pasta/i })).toHaveAttribute('href', 'https://www.instagram.com/lamiapastamx?igsh=MXM0emV6d3BqYnp0cA==')
    expect(screen.getByRole('link', { name: /tiktok de la mia pasta/i })).toHaveAttribute('href', 'https://www.tiktok.com/@lamiapastamx')
  })

  it('shows all mobile categories and updates the active panel content when switching tabs', () => {
    render(<App />)

    const tablist = screen.getByRole('tablist', { name: /categorías del menú/i })
    expect(within(tablist).getByRole('tab', { name: /tradicional/i })).toHaveAttribute('aria-selected', 'true')
    expect(within(tablist).getByRole('tab', { name: /especiales/i })).toBeInTheDocument()
    expect(within(tablist).getByRole('tab', { name: /extras/i })).toBeInTheDocument()
    expect(within(tablist).getByRole('tab', { name: /bebidas/i })).toBeInTheDocument()

    expect(screen.getByText(/5 opciones/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 4, name: /spaguetti boloñesa/i })).toBeInTheDocument()

    fireEvent.click(within(tablist).getByRole('tab', { name: /bebidas/i }))

    expect(within(tablist).getByRole('tab', { name: /bebidas/i })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/3 opciones/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 4, name: /^jamaica$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 4, name: /^horchata$/i })).toBeInTheDocument()
  })

  it('renders specialties and desktop ordering options', () => {
    render(<App />)

    expect(screen.getAllByText(/fetuccini poblano con pollo/i).length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { level: 3, name: /cómo ordenar/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 4, name: /pide y recoge/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 4, name: /entrega a domicilio/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /uber eats/i })).toHaveAttribute('href', 'https://www.ubereats.com/')
    expect(screen.getByRole('link', { name: /didi food/i })).toHaveAttribute('href', 'https://www.didi-food.com/es-MX')
  })

  it('opens the navigation drawer and closes it when a nav item is selected', () => {
    render(<App />)

    const toggle = screen.getByRole('button', { name: /abrir menú/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggle)

    expect(screen.getByRole('button', { name: /cerrar menú/i })).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(screen.getByRole('link', { name: /^menú$/i }))

    expect(screen.getByRole('button', { name: /abrir menú/i })).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens the WhatsApp modal, focuses the close button, locks scroll and closes from backdrop and escape', () => {
    render(<App />)

    fireEvent.click(screen.getAllByRole('button', { name: /whatsapp/i })[0])

    expect(screen.getByRole('dialog', { name: /chat de whatsapp/i })).toBeInTheDocument()
    expect(document.body.style.overflow).toBe('hidden')

    const closeButton = screen.getByRole('button', { name: /^cerrar$/i })
    expect(closeButton).toHaveFocus()

    fireEvent.click(screen.getByRole('button', { name: /cerrar chat/i }))
    expect(screen.queryByRole('dialog', { name: /chat de whatsapp/i })).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('')

    fireEvent.click(screen.getByRole('button', { name: /pedir ahora/i }))
    expect(screen.getByRole('dialog', { name: /chat de whatsapp/i })).toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.queryByRole('dialog', { name: /chat de whatsapp/i })).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('')
  })

  it('sends the default WhatsApp message when the textarea is blank', () => {
    render(<App />)

    fireEvent.click(screen.getAllByRole('button', { name: /whatsapp/i })[0])

    const textarea = screen.getByRole('textbox', { name: /escribe tu mensaje para whatsapp/i })
    fireEvent.change(textarea, { target: { value: '   ' } })
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    expect(window.open).toHaveBeenCalledTimes(1)
    expect(window.open).toHaveBeenCalledWith(
      'https://wa.me/524424230777?text=Hola!%20Quiero%20hacer%20un%20pedido%20en%20La%20Mia%20Pasta.',
      '_blank',
      'noopener,noreferrer',
    )
  })

  it('encodes and sends a custom WhatsApp message', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /^pedir ahora$/i }))

    const textarea = screen.getByRole('textbox', { name: /escribe tu mensaje para whatsapp/i })
    fireEvent.change(textarea, { target: { value: 'Hola, quiero 2 penne chipotle & 1 agua de limón' } })
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    expect(window.open).toHaveBeenCalledWith(
      'https://wa.me/524424230777?text=Hola%2C%20quiero%202%20penne%20chipotle%20%26%201%20agua%20de%20lim%C3%B3n',
      '_blank',
      'noopener,noreferrer',
    )
  })
})
