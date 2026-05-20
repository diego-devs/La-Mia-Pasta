import { describe, expect, it } from 'vitest'
import {
  buildOrderWhatsAppMessage,
  createCatalogMaps,
  createOrderLine,
  decrementDrinkQuantity,
  decrementOrderLineQuantity,
  formatCurrency,
  getOrderSubtotal,
  getOrderSummary,
  incrementDrinkQuantity,
  incrementOrderLineQuantity,
  normalizeCatalogs,
  parsePrice,
  toggleExtraOnLine,
} from './orderUtils'

const menuSections = [
  {
    title: 'Tradicional',
    items: [
      { name: 'Spaguetti boloñesa', description: 'Clásica', price: '$130', image: '/spag.jpg' },
      { name: 'Penne chipotle', description: 'Picante', price: '$130', image: '/penne.jpg' },
    ],
  },
  {
    title: 'Especialidades',
    items: [{ name: 'Fetuccini poblano con pollo', description: 'Especial', price: '$160', image: '/fet.jpg' }],
  },
]

const complements = [
  {
    title: 'Extras',
    items: [
      { name: 'Pollo', description: 'Extra proteína', price: '$30', image: '/pollo.jpg' },
      { name: 'Queso parmesano', description: 'Extra queso', price: '$30', image: '/parm.jpg' },
    ],
  },
  {
    title: 'Bebidas',
    items: [{ name: 'Jamaica artesanal', description: 'Bebida fría', price: '$30', image: '/jam.jpg' }],
  },
]

describe('orderUtils', () => {
  it('parsePrice convierte precios en entero', () => {
    expect(parsePrice('$130')).toBe(130)
  })

  it('normalizeCatalogs crea catálogos tipados con ids estables', () => {
    const catalogs = normalizeCatalogs(menuSections, complements)

    expect(catalogs.pastaCatalog[0]).toMatchObject({
      id: 'tradicional-spaguetti-bolonesa',
      type: 'pasta',
      priceValue: 130,
    })
    expect(catalogs.extrasCatalog[0]).toMatchObject({ id: 'extra-pollo', type: 'extra', priceValue: 30 })
    expect(catalogs.drinksCatalog[0]).toMatchObject({ id: 'drink-jamaica-artesanal', type: 'drink', priceValue: 30 })
  })

  it('toggleExtraOnLine permite múltiples extras y alterna selección', () => {
    let line = createOrderLine('tradicional-spaguetti-bolonesa')
    line = toggleExtraOnLine(line, 'extra-pollo')
    line = toggleExtraOnLine(line, 'extra-queso-parmesano')

    expect(line.selectedExtraIds).toEqual(['extra-pollo', 'extra-queso-parmesano'])

    line = toggleExtraOnLine(line, 'extra-pollo')
    expect(line.selectedExtraIds).toEqual(['extra-queso-parmesano'])
  })

  it('decrementOrderLineQuantity elimina una línea al llegar a cero', () => {
    const line = createOrderLine('tradicional-spaguetti-bolonesa')
    expect(decrementOrderLineQuantity(line)).toBeNull()
  })

  it('getOrderSummary calcula subtotal de pastas, extras y bebidas', () => {
    const catalogs = normalizeCatalogs(menuSections, complements)
    const maps = createCatalogMaps(catalogs)

    const baseLine = toggleExtraOnLine(toggleExtraOnLine(createOrderLine('tradicional-spaguetti-bolonesa'), 'extra-pollo'), 'extra-queso-parmesano')
    const line = incrementOrderLineQuantity(baseLine)

    const drinkQuantities = incrementDrinkQuantity({ 'drink-jamaica-artesanal': 1 }, 'drink-jamaica-artesanal')
    const summary = getOrderSummary({ orderLines: [line], drinkQuantities, ...maps })

    expect(summary.lineItems[0].subtotal).toBe(380)
    expect(summary.drinkItems[0].subtotal).toBe(60)
    expect(getOrderSubtotal(summary)).toBe(440)
    expect(formatCurrency(getOrderSubtotal(summary))).toBe('$440')
  })

  it('buildOrderWhatsAppMessage arma el mensaje final para recoger', () => {
    const catalogs = normalizeCatalogs(menuSections, complements)
    const maps = createCatalogMaps(catalogs)
    const line = toggleExtraOnLine(createOrderLine('especialidades-fetuccini-poblano-con-pollo'), 'extra-queso-parmesano')
    const summary = getOrderSummary({
      orderLines: [line],
      drinkQuantities: { 'drink-jamaica-artesanal': 1 },
      ...maps,
    })

    const message = buildOrderWhatsAppMessage({
      summary,
      notes: 'Sin cubiertos',
    })

    expect(message).toContain('Hola, quiero hacer un pedido para recoger en sucursal:')
    expect(message).toContain('1 x Fetuccini poblano con pollo')
    expect(message).toContain('Extras: Queso parmesano')
    expect(message).toContain('Bebidas:')
    expect(message).toContain('Notas:')
    expect(message).toContain('Sin cubiertos')
    expect(message).toContain('Subtotal estimado: $220')
    expect(message).toContain('Solo pasaré a recoger en la ubicación.')
  })

  it('incrementDrinkQuantity y decrementDrinkQuantity respetan mínimo cero', () => {
    let quantities = incrementDrinkQuantity({}, 'drink-jamaica-artesanal')
    quantities = decrementDrinkQuantity(quantities, 'drink-jamaica-artesanal')
    quantities = decrementDrinkQuantity(quantities, 'drink-jamaica-artesanal')
    expect(quantities['drink-jamaica-artesanal']).toBe(0)
  })
})
