# Pedir Ahora Modal Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Añadir un flujo aislado de pedido dentro de un modal/overlay que permita seleccionar productos, ajustar cantidades con +/-, agregar múltiples extras a las pastas, incluir bebidas, calcular subtotales y abrir WhatsApp con el pedido armado, sin romper la página principal existente.

**Architecture:** Mantener toda la experiencia actual del menú intacta y crear un nuevo conjunto de componentes de pedido dentro de `src/App.jsx` inicialmente, encapsulados en un modal nuevo independiente del chat modal actual. Reutilizar las fuentes de datos existentes (`menuSections`, `complements`, `DISH_IMAGES`) y derivar catálogos normalizados para pastas, extras y bebidas, con estado local aislado para carrito, cantidades y notas.

**Tech Stack:** React 19 + Vite, estado local con `useState`/`useMemo`, estilos en `src/App.css`, apertura final a `wa.me`.

---

### Task 1: Normalizar catálogo para el flujo de pedido

**Objective:** Crear estructuras derivadas para pastas, extras y bebidas que permitan renderizar el flujo de pedido sin tocar la presentación actual del menú.

**Files:**
- Modify: `src/App.jsx`

**Step 1: Add helper utilities and derived catalogs**
- Crear helper para convertir precios `'$130'` a número.
- Crear arrays derivados:
  - `pastaCatalog` con items de `menuSections`
  - `extrasCatalog` con `complements[0].items`
  - `drinksCatalog` con `complements[1].items`
- Cada item debe incluir `id`, `name`, `description`, `priceValue`, `price`, `image`, `type`.
- Mapear imágenes para las pastas usando la misma lógica ya usada en móvil.

**Step 2: Verify consistency mentally in code**
- Confirmar que todos los items tienen `id` estable y `priceValue` numérico.

**Step 3: Commit**
```bash
git add src/App.jsx
git commit -m "refactor: normalize order catalog data"
```

### Task 2: Añadir estado aislado del modal de pedido

**Objective:** Introducir un nuevo modal de pedido independiente del chat actual.

**Files:**
- Modify: `src/App.jsx`

**Step 1: Add new state**
- Añadir `orderModalOpen`
- Añadir `selectedPastaId`
- Añadir `orderItems` para pastas seleccionadas con cantidad y extras
- Añadir `drinkQuantities`
- Añadir `orderNotes`

**Step 2: Add modal open/close handlers**
- `openOrderModal`, `closeOrderModal`
- Mantener `openChat` intacto para el chat libre actual.
- Actualizar el `Escape` handler para cerrar también el modal de pedido.
- Bloquear scroll del body cuando esté abierto cualquiera de los dos modales.

**Step 3: Add reset strategy**
- El modal no debe resetear automáticamente al cerrar si no se ha enviado, salvo decisión explícita.
- Añadir helper de reset para usar después del envío, si conviene.

**Step 4: Commit**
```bash
git add src/App.jsx
git commit -m "feat: add isolated order modal state"
```

### Task 3: Implementar componentes visuales del modal de pedido

**Objective:** Renderizar un overlay nuevo con selector de pasta, cantidades, extras, bebidas, notas y resumen.

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/App.css`

**Step 1: Add lightweight presentational helpers in `src/App.jsx`**
- `QuantityStepper`
- `OrderProductCard`
- `OrderLineItem`
- Mantenerlos en el mismo archivo por ahora para minimizar cambios estructurales.

**Step 2: Add order modal markup**
- Overlay similar al chat modal pero independiente: `order-modal`, `order-modal__panel`, etc.
- Secciones dentro del modal:
  1. encabezado con “Pedir ahora”
  2. aviso “Solo para recoger en sucursal”
  3. selector horizontal/lista de pastas
  4. detalle de la pasta activa con botón “Agregar al pedido”
  5. lista de items de pasta agregados, cada uno con cantidad +/-, extras multi-select y subtotal por línea
  6. bloque de bebidas con cantidad +/− por bebida
  7. textarea de notas
  8. resumen/subtotal
  9. CTA final a WhatsApp

**Step 3: Add styles in `src/App.css`**
- Reutilizar lenguaje visual actual oscuro/cobre.
- Asegurar buen comportamiento móvil primero.
- No tocar clases existentes salvo lo indispensable.

**Step 4: Commit**
```bash
git add src/App.jsx src/App.css
git commit -m "feat: add order modal interface"
```

### Task 4: Implementar lógica del carrito y subtotales

**Objective:** Hacer funcional la selección de cantidades, múltiples extras y bebidas con subtotal correcto.

**Files:**
- Modify: `src/App.jsx`

**Step 1: Implement pasta item creation**
- `handleAddPastaToOrder(selectedPastaId)` crea una línea con:
  - `lineId`
  - `productId`
  - `quantity: 1`
  - `selectedExtraIds: []`

**Step 2: Implement line item mutations**
- `incrementOrderItemQuantity(lineId)`
- `decrementOrderItemQuantity(lineId)` con eliminación si llega a 0
- `toggleExtraOnOrderItem(lineId, extraId)` permitiendo múltiples extras simultáneos

**Step 3: Implement beverage quantity mutations**
- `incrementDrinkQuantity(drinkId)`
- `decrementDrinkQuantity(drinkId)` mínimo 0

**Step 4: Implement pricing helpers**
- subtotal por línea de pasta = `(precio pasta + suma extras seleccionados) * quantity`
- subtotal bebidas = `precio bebida * quantity`
- subtotal general = suma de ambos

**Step 5: Render empty states**
- Si no hay nada agregado, mostrar mensaje claro.

**Step 6: Commit**
```bash
git add src/App.jsx
git commit -m "feat: implement order calculations and cart logic"
```

### Task 5: Generar mensaje final de WhatsApp

**Objective:** Convertir el pedido configurado en un mensaje legible y útil para sucursal.

**Files:**
- Modify: `src/App.jsx`

**Step 1: Build order summary text helper**
- Crear función que arme mensaje con formato similar a:
  - saludo
  - aviso de recoger
  - pastas con cantidad, extras y subtotal por línea
  - bebidas con cantidad
  - notas si existen
  - subtotal final

**Step 2: Hook CTA to WhatsApp**
- Nuevo handler `handleSendOrderWhatsApp`
- Validar que exista al menos una pasta o bebida antes de enviar.
- Abrir `https://wa.me/${WHATSAPP_NUMBER}?text=...`

**Step 3: Add inline reminder**
- Mostrar aviso persistente: “Pedido solo para recoger en esta ubicación.”

**Step 4: Commit**
```bash
git add src/App.jsx
git commit -m "feat: send structured pickup order to whatsapp"
```

### Task 6: Integrar disparadores sin romper el flujo actual

**Objective:** Añadir botones “Pedir ahora” hacia el nuevo modal, manteniendo el chat libre actual disponible.

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/App.css`

**Step 1: Update CTAs**
- En hero: añadir botón “Pedir ahora” que abra el modal nuevo.
- Mantener botón actual de WhatsApp/chat como opción secundaria o de contacto.
- En sección “Cómo ordenar”, convertir la tarjeta principal a “Pedir ahora”.
- En footer, hacer que el botón “Pedir ahora” abra el modal de pedido y no el chat libre.
- Mantener FAB de WhatsApp abriendo el chat libre.

**Step 2: Verify interaction separation**
- Chat modal libre sigue existiendo.
- Order modal es independiente.

**Step 3: Commit**
```bash
git add src/App.jsx src/App.css
git commit -m "feat: wire order modal into site actions"
```

### Task 7: Verificación final y despliegue

**Objective:** Confirmar que nada se rompió y publicar el cambio.

**Files:**
- Modify if needed: `src/App.jsx`, `src/App.css`

**Step 1: Run build**
```bash
npm run build
```
Expected: PASS

**Step 2: Optional lint**
```bash
npm run lint
```
Expected: PASS, o corregir cualquier issue introducido

**Step 3: Review diff**
```bash
git status --short
git diff -- src/App.jsx src/App.css | cat
```

**Step 4: Deploy**
```bash
git add src/App.jsx src/App.css docs/plans/2026-05-20-pedir-ahora-modal.md
git commit -m "feat: add pickup ordering workflow"
git push origin main
```

**Step 5: Verify GitHub Pages propagation**
- Comprobar asset hash nuevo en `https://diego-devs.github.io/La-Mia-Pasta/`
- Confirmar que el modal carga y los assets nuevos responden

---

## Notes
- Mantener esta implementación aislada en componentes nuevos; no reescribir la experiencia principal del menú.
- No introducir routing nuevo ni páginas aparte; usar modal overlay.
- No agregar backend: el destino final es WhatsApp con mensaje prellenado.
- El flujo debe admitir pedir solo bebidas, solo pastas, o ambos.
- El subtotal se muestra, pero no se debe presentar como cobro en línea: solo como referencia del pedido.
