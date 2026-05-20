export function parsePrice(price) {
  return Number(String(price).replace(/[^0-9.]/g, '')) || 0
}

function slugify(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function normalizeCatalogs(menuSections, complements) {
  const [extrasGroup = { items: [] }, drinksGroup = { items: [] }] = complements

  const pastaCatalog = menuSections.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      id: `${slugify(section.title)}-${slugify(item.name)}`,
      type: 'pasta',
      priceValue: parsePrice(item.price),
    })),
  )

  const extrasCatalog = extrasGroup.items.map((item) => ({
    ...item,
    id: `extra-${slugify(item.name)}`,
    type: 'extra',
    priceValue: parsePrice(item.price),
  }))

  const drinksCatalog = drinksGroup.items.map((item) => ({
    ...item,
    id: `drink-${slugify(item.name)}`,
    type: 'drink',
    priceValue: parsePrice(item.price),
  }))

  return { pastaCatalog, extrasCatalog, drinksCatalog }
}

export function createCatalogMaps({ pastaCatalog, extrasCatalog, drinksCatalog }) {
  return {
    pastaMap: Object.fromEntries(pastaCatalog.map((item) => [item.id, item])),
    extrasMap: Object.fromEntries(extrasCatalog.map((item) => [item.id, item])),
    drinksMap: Object.fromEntries(drinksCatalog.map((item) => [item.id, item])),
  }
}

export function createOrderLine(productId) {
  return {
    lineId: `${productId}__1`,
    productId,
    quantity: 1,
    selectedExtraIds: [],
  }
}

export function incrementOrderLineQuantity(line) {
  return { ...line, quantity: line.quantity + 1 }
}

export function decrementOrderLineQuantity(line) {
  if (line.quantity <= 1) return null
  return { ...line, quantity: line.quantity - 1 }
}

export function toggleExtraOnLine(line, extraId) {
  const exists = line.selectedExtraIds.includes(extraId)
  return {
    ...line,
    selectedExtraIds: exists ? line.selectedExtraIds.filter((id) => id !== extraId) : [...line.selectedExtraIds, extraId],
  }
}

export function incrementDrinkQuantity(quantities, drinkId) {
  return {
    ...quantities,
    [drinkId]: (quantities[drinkId] || 0) + 1,
  }
}

export function decrementDrinkQuantity(quantities, drinkId) {
  return {
    ...quantities,
    [drinkId]: Math.max((quantities[drinkId] || 0) - 1, 0),
  }
}

export function getOrderSummary({ orderLines, drinkQuantities, pastaMap, extrasMap, drinksMap }) {
  const lineItems = orderLines
    .map((line) => {
      const product = pastaMap[line.productId]
      if (!product) return null
      const extras = line.selectedExtraIds.map((extraId) => extrasMap[extraId]).filter(Boolean)
      const extrasSubtotal = extras.reduce((sum, extra) => sum + extra.priceValue, 0)
      const subtotal = (product.priceValue + extrasSubtotal) * line.quantity

      return {
        ...line,
        product,
        extras,
        subtotal,
      }
    })
    .filter(Boolean)

  const drinkItems = Object.entries(drinkQuantities)
    .map(([drinkId, quantity]) => {
      const product = drinksMap[drinkId]
      if (!product || quantity <= 0) return null
      return {
        drinkId,
        quantity,
        product,
        subtotal: product.priceValue * quantity,
      }
    })
    .filter(Boolean)

  return { lineItems, drinkItems }
}

export function getOrderSubtotal(summary) {
  return [...summary.lineItems, ...summary.drinkItems].reduce((sum, item) => sum + item.subtotal, 0)
}

export function formatCurrency(value) {
  return `$${value}`
}

export function buildOrderWhatsAppMessage({ summary, notes }) {
  const lines = ['Hola, quiero hacer un pedido para recoger en sucursal:', '', 'Pedido:']

  summary.lineItems.forEach((item) => {
    lines.push(`- ${item.quantity} x ${item.product.name}`)
    lines.push(`  Extras: ${item.extras.length ? item.extras.map((extra) => extra.name).join(', ') : 'Sin extras'}`)
    lines.push(`  Subtotal: ${formatCurrency(item.subtotal)}`)
  })

  if (summary.drinkItems.length) {
    lines.push('', 'Bebidas:')
    summary.drinkItems.forEach((item) => {
      lines.push(`- ${item.quantity} x ${item.product.name} — ${formatCurrency(item.subtotal)}`)
    })
  }

  if (notes?.trim()) {
    lines.push('', 'Notas:')
    lines.push(notes.trim())
  }

  lines.push('', `Subtotal estimado: ${formatCurrency(getOrderSubtotal(summary))}`)
  lines.push('Solo pasaré a recoger en la ubicación.')

  return lines.join('\n')
}
