import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
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
  toggleExtraOnLine,
} from './orderUtils'

const WHATSAPP_NUMBER = '524424230777'
const PDF_MENU_PATH = '/La-Mia-Pasta/LA_MIA_PASTA.pdf'
const BASE_URL = import.meta.env.BASE_URL
const HERO_IMAGE = `${BASE_URL}hero.jpg`
const LOGO_IMAGE = `${BASE_URL}logo-white.png`

const DISH_IMAGES = {
  fetucciniPoblano: `${BASE_URL}images/dishes/fetuccini-poblano.jpg`,
  fetucciniPoblanoPollo: `${BASE_URL}images/dishes/fetuccini-poblano-pollo.jpg`,
  macarronesCheddar: `${BASE_URL}images/dishes/macarrones-cheddar.jpg`,
  macarronesCheddarTocino: `${BASE_URL}images/dishes/macarrones-cheddar-tocino.jpg`,
  penneChampinones: `${BASE_URL}images/dishes/penne-champinones.jpg`,
  penneChampinonesCamarones: `${BASE_URL}images/dishes/penne-champinones-camarones.jpg`,
  penneChipotle: `${BASE_URL}images/dishes/penne-chipotle.jpg`,
  penneChipotleChuleta: `${BASE_URL}images/dishes/penne-chipotle-chuleta.jpg`,
  spaguettiBolognesa: `${BASE_URL}images/dishes/spaguetti-bolognesa.jpg`,
  spaguettiBolognesaAlbndigas: `${BASE_URL}images/dishes/spaguetti-bolognesa-albondigas.jpg`,
  proteinAlbondigas: `${BASE_URL}images/dishes/protein-albondigas.jpg`,
  proteinPollo: `${BASE_URL}images/dishes/protein-pollo.jpg`,
  proteinChuleta: `${BASE_URL}images/dishes/protein-chuleta.jpg`,
  proteinCamarones: `${BASE_URL}images/dishes/protein-camarones.jpg`,
  proteinTocino: `${BASE_URL}images/dishes/protein-tocino.jpg`,
  proteinParmesano: `${BASE_URL}images/dishes/protein-parmesano.jpg`,
  drinkJamaica: `${BASE_URL}images/dishes/bebida-jamaica.jpg`,
  drinkLimon: `${BASE_URL}images/dishes/bebida-limon.jpg`,
  drinkHorchata: `${BASE_URL}images/dishes/bebida-horchata.jpg`,
}

const featuredPhrases = ['Hecho al momento', 'Solo para recoger', 'Sabor artesanal']

const menuSections = [
  {
    title: 'Tradicional',
    description: 'Recetas caseras con cremosidad equilibrada y sabores clásicos reinterpretados con nuestro toque.',
    items: [
      { name: 'Spaguetti boloñesa', description: 'La clásica salsa boloñesa con cocción lenta y personalidad casera.', price: '$130', image: DISH_IMAGES.spaguettiBolognesa },
      { name: 'Penne champiñones', description: 'Salsa cremosa de champiñones con notas suaves y reconfortantes.', price: '$130', image: DISH_IMAGES.penneChampinones },
      { name: 'Fetuccini poblano', description: 'Cremosa salsa poblana con un toque sutilmente ahumado.', price: '$130', image: DISH_IMAGES.fetucciniPoblano },
      { name: 'Penne chipotle', description: 'Salsa cremosa con chipotle balanceado y un final ligeramente picante.', price: '$130', image: DISH_IMAGES.penneChipotle },
      { name: 'Macarrones cheddar', description: 'Confort total con salsa cheddar cremosa y textura envolvente.', price: '$130', image: DISH_IMAGES.macarronesCheddar },
    ],
  },
  {
    title: 'Especialidades',
    description: 'Nuestras combinaciones más completas para antojos grandes y sabores memorables.',
    items: [
      { name: 'Spaguetti boloñesa con albóndigas', description: 'Boloñesa clásica coronada con albóndigas jugosas.', price: '$160', image: DISH_IMAGES.spaguettiBolognesaAlbndigas },
      { name: 'Penne champiñones con camarones', description: 'Champiñones cremosos con camarones para un acabado más elegante.', price: '$160', image: DISH_IMAGES.penneChampinonesCamarones },
      { name: 'Fetuccini poblano con pollo', description: 'La favorita de la casa con poblano cremoso y pollo sazonado.', price: '$160', image: DISH_IMAGES.fetucciniPoblanoPollo },
      { name: 'Penne chipotle con chuleta ahumada', description: 'Chipotle cremoso con chuleta ahumada de sabor profundo.', price: '$160', image: DISH_IMAGES.penneChipotleChuleta },
      { name: 'Macarrones cheddar con tocino', description: 'Cheddar cremoso con tocino dorado para un extra de indulgencia.', price: '$160', image: DISH_IMAGES.macarronesCheddarTocino },
    ],
  },
]

const signatureDishes = [
  { name: 'Fetuccini poblano con pollo', description: 'Nuestra combinación más pedida: cremosa, casera y llena de sabor.', price: '$160', category: 'Favorita', image: DISH_IMAGES.fetucciniPoblanoPollo },
  { name: 'Penne chipotle con chuleta ahumada', description: 'Intensidad justa, cremosidad y notas ahumadas para un antojo inolvidable.', price: '$160', category: 'Especialidad', image: DISH_IMAGES.penneChipotleChuleta },
]

const complements = [
  {
    title: 'Extras',
    description: 'Personaliza tu pasta con proteína o queso extra.',
    items: [
      { name: 'Camarones', description: 'Extra de proteína.', price: '$30', image: DISH_IMAGES.proteinCamarones },
      { name: 'Chuleta ahumada', description: 'Extra de proteína.', price: '$30', image: DISH_IMAGES.proteinChuleta },
      { name: 'Pollo', description: 'Extra de proteína.', price: '$30', image: DISH_IMAGES.proteinPollo },
      { name: 'Tocino', description: 'Extra de proteína.', price: '$30', image: DISH_IMAGES.proteinTocino },
      { name: 'Albóndigas', description: 'Extra de proteína.', price: '$30', image: DISH_IMAGES.proteinAlbondigas },
      { name: 'Queso parmesano', description: 'Extra de queso.', price: '$30', image: DISH_IMAGES.proteinParmesano },
    ],
  },
  {
    title: 'Bebidas',
    description: 'Aguas artesanales para acompañar tu pedido.',
    items: [
      { name: 'Jamaica artesanal', description: 'Refrescante y servida fría.', price: '$30', image: DISH_IMAGES.drinkJamaica },
      { name: 'Limón artesanal', description: 'Cítrica, fresca y ligera.', price: '$30', image: DISH_IMAGES.drinkLimon },
      { name: 'Horchata artesanal', description: 'Cremosa y especiada al estilo de la casa.', price: '$30', image: DISH_IMAGES.drinkHorchata },
    ],
  },
]

const orderChannels = [
  {
    title: 'Pedir ahora',
    description: 'Configura tu pasta, agrega extras y bebidas, revisa tu subtotal y envíalo por WhatsApp para recoger.',
    actionLabel: 'Abrir pedido',
    actionType: 'order',
  },
  {
    title: 'Apps de delivery',
    description: 'Si prefieres envío, también puedes revisar nuestras opciones en plataformas externas.',
    actionType: 'links',
    links: [
      { label: 'Uber Eats', href: 'https://www.ubereats.com/' },
      { label: 'Rappi', href: 'https://www.rappi.com.mx/' },
    ],
  },
]

function LogoMark() {
  return <img className="logo-image" src={LOGO_IMAGE} alt="La Mia Pasta" />
}

function MenuItem({ item }) {
  return (
    <article className="menu-item">
      <div className="menu-item__image-wrap">
        <img className="menu-item__image" src={item.image} alt={item.name} />
      </div>
      <div className="menu-item__body">
        <div className="menu-item__top">
          <h3>{item.name}</h3>
          <span>{item.price}</span>
        </div>
        <p>{item.description}</p>
      </div>
    </article>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.52 0 .18 5.34.18 11.89c0 2.09.55 4.13 1.59 5.92L0 24l6.38-1.67a11.87 11.87 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.17-1.24-6.15-3.45-8.41Zm-8.45 18.3h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.79.99 1.01-3.7-.23-.38a9.88 9.88 0 0 1-1.51-5.22C2.13 6.43 6.61 1.95 12.07 1.95c2.63 0 5.1 1.03 6.95 2.89a9.76 9.76 0 0 1 2.87 6.95c0 5.46-4.45 9.99-9.82 9.99Zm5.43-7.43c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.97 1.19-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.41-1.5-.89-.79-1.49-1.76-1.67-2.06-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.69-1.66-.95-2.27-.25-.59-.5-.51-.69-.52h-.59c-.2 0-.53.08-.81.38-.28.3-1.07 1.04-1.07 2.53 0 1.49 1.1 2.94 1.25 3.14.15.2 2.15 3.28 5.2 4.6.73.32 1.3.51 1.75.65.74.24 1.41.21 1.94.13.59-.09 1.78-.73 2.03-1.44.25-.71.25-1.32.18-1.44-.08-.12-.28-.2-.58-.35Z" />
    </svg>
  )
}

function QuantityStepper({ value, onDecrement, onIncrement, label = 'Cantidad' }) {
  return (
    <div className="quantity-stepper" aria-label={label}>
      <button type="button" onClick={onDecrement} aria-label={`Disminuir ${label}`}>
        −
      </button>
      <span>{value}</span>
      <button type="button" onClick={onIncrement} aria-label={`Aumentar ${label}`}>
        +
      </button>
    </div>
  )
}

function OrderProductCard({ item, selected, onSelect, actionLabel }) {
  return (
    <article className={`order-product-card ${selected ? 'order-product-card--selected' : ''}`}>
      <button type="button" className="order-product-card__button" onClick={() => onSelect(item.id)}>
        <div className="order-product-card__media">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="order-product-card__body">
          <div className="order-product-card__top">
            <h4>{item.name}</h4>
            <span>{item.price}</span>
          </div>
          <p>{item.description}</p>
          <small>{selected ? 'Seleccionada' : actionLabel}</small>
        </div>
      </button>
    </article>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [message, setMessage] = useState('Hola! Quiero hacer un pedido en La Mia Pasta.')
  const [activeMobileCategory, setActiveMobileCategory] = useState('Tradicional')
  const [selectedPastaId, setSelectedPastaId] = useState('tradicional-spaguetti-bolonesa')
  const [orderLines, setOrderLines] = useState([])
  const [drinkQuantities, setDrinkQuantities] = useState({})
  const [orderNotes, setOrderNotes] = useState('')
  const closeButtonRef = useRef(null)
  const orderCloseButtonRef = useRef(null)

  const mobileMenuCategories = useMemo(
    () => [
      { title: 'Tradicional', shortLabel: 'Tradicional', icon: '◌', description: 'Nuestras recetas base con sabor casero y toque italo-mexicano.', items: menuSections[0].items },
      { title: 'Especialidades', shortLabel: 'Especiales', icon: '✦', description: 'Versiones más completas y protagonistas, listas para pedir.', items: menuSections[1].items },
      { title: 'Extras', shortLabel: 'Extras', icon: '✢', description: 'Añade proteína o queso para personalizar tu pasta.', items: complements[0].items },
      { title: 'Bebidas', shortLabel: 'Bebidas', icon: '◒', description: 'Aguas artesanales frías para acompañar tu pedido.', items: complements[1].items },
    ],
    [],
  )

  const orderCatalogs = useMemo(() => normalizeCatalogs(menuSections, complements), [])
  const { pastaCatalog, extrasCatalog, drinksCatalog } = orderCatalogs
  const { pastaMap, extrasMap, drinksMap } = useMemo(() => createCatalogMaps(orderCatalogs), [orderCatalogs])
  const activeMobileSection = mobileMenuCategories.find((category) => category.title === activeMobileCategory) ?? mobileMenuCategories[0]
  const selectedPasta = pastaMap[selectedPastaId] ?? pastaCatalog[0]
  const orderSummary = useMemo(() => getOrderSummary({ orderLines, drinkQuantities, pastaMap, extrasMap, drinksMap }), [drinkQuantities, extrasMap, drinksMap, orderLines, pastaMap])
  const orderSubtotal = getOrderSubtotal(orderSummary)
  const hasOrderItems = orderSummary.lineItems.length > 0 || orderSummary.drinkItems.length > 0

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setChatOpen(false)
        setOrderModalOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    if (!chatOpen && !orderModalOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    if (orderModalOpen) {
      orderCloseButtonRef.current?.focus()
    } else {
      closeButtonRef.current?.focus()
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [chatOpen, orderModalOpen])

  const navItems = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#especialidades', label: 'Especialidades' },
    { href: '#menu', label: 'Menú' },
    { href: '#contacto', label: 'Contacto' },
  ]

  const handleSendWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message.trim() || 'Hola! Quiero hacer un pedido en La Mia Pasta.')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer')
  }

  const handleNavClick = () => setMenuOpen(false)
  const openChat = () => setChatOpen(true)
  const closeChat = () => setChatOpen(false)
  const openOrderModal = () => setOrderModalOpen(true)
  const closeOrderModal = () => setOrderModalOpen(false)

  const handleAddPastaToOrder = () => {
    if (!selectedPastaId) return
    setOrderLines((current) => [...current, createOrderLine(selectedPastaId)])
  }

  const updateOrderLine = (lineId, updater) => {
    setOrderLines((current) =>
      current.flatMap((line) => {
        if (line.lineId !== lineId) return [line]
        const updated = updater(line)
        return updated ? [updated] : []
      }),
    )
  }

  const incrementLine = (lineId) => updateOrderLine(lineId, incrementOrderLineQuantity)
  const decrementLine = (lineId) => updateOrderLine(lineId, decrementOrderLineQuantity)
  const toggleLineExtra = (lineId, extraId) => updateOrderLine(lineId, (line) => toggleExtraOnLine(line, extraId))
  const incrementDrink = (drinkId) => setDrinkQuantities((current) => incrementDrinkQuantity(current, drinkId))
  const decrementDrink = (drinkId) => setDrinkQuantities((current) => decrementDrinkQuantity(current, drinkId))

  const handleSendOrderWhatsApp = () => {
    if (!hasOrderItems) return
    const finalMessage = buildOrderWhatsAppMessage({ summary: orderSummary, notes: orderNotes })
    const encodedMessage = encodeURIComponent(finalMessage)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={`site-shell ${menuOpen ? 'site-shell--menu-open' : ''}`}>
      <header className="hero" id="inicio">
        <nav className="topbar">
          <button className={`menu-toggle ${menuOpen ? 'menu-toggle--active' : ''}`} type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((value) => !value)}>
            <span />
            <span />
            <span />
          </button>

          <a className="wordmark wordmark--centered" href="#inicio" aria-label="Ir al inicio">
            <LogoMark />
          </a>

          <button className="topbar__whatsapp" type="button" onClick={openChat}>
            <WhatsAppIcon />
            <span>WhatsApp</span>
          </button>
        </nav>

        <div className={`nav-drawer ${menuOpen ? 'nav-drawer--open' : ''}`} id="site-navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.href} onClick={handleNavClick}>
              {item.label}
            </a>
          ))}
        </div>

        <div className="hero__content">
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__image-wrap">
              <img className="hero__image" src={HERO_IMAGE} alt="" />
            </div>
            <aside className="hero__seal" aria-label="Hechas con pasión">
              <div className="hero__seal-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54Z" />
                </svg>
              </div>
              <p>Hechas con pasión</p>
            </aside>
          </div>

          <div className="hero__text">
            <div className="hero__chips" aria-label="Puntos clave de La Mia Pasta">
              <span>Pasta fresca artesanal</span>
              <span>Pedidos por WhatsApp</span>
            </div>
            <p className="eyebrow">Fusión México–italiana</p>
            <div className="hero__accent" aria-hidden="true" />
            <h1>
              Pasta fresca con alma <span className="hero__word hero__word--italiana">italiana</span> y sabores <span className="hero__word hero__word--mexicanos">mexicanos</span> que se disfrutan desde el primer bocado.
            </h1>
            <p className="hero__lead">Recetas caseras con una personalidad cuidada, elegantes a la vista y fáciles de pedir para disfrutar en casa.</p>

            <div className="hero__actions hero__actions--dual">
              <button className="button button--primary" type="button" onClick={openOrderModal}>
                Pedir ahora
              </button>
              <button className="button button--whatsapp" type="button" onClick={openChat}>
                <span className="button__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 4h12l2 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7l2-3Z" />
                    <path d="M6 8h12" />
                  </svg>
                </span>
                <span>
                  <strong>WhatsApp directo</strong>
                  <small>Si prefieres escribirnos</small>
                </span>
              </button>
            </div>

            <p className="hero__note">Una carta breve, cuidada y antojable para pedir sin vueltas.</p>

            <div className="hero__phrases" aria-label="Valores de la marca">
              {featuredPhrases.map((phrase) => (
                <span key={phrase}>{phrase}</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="section menu-section" id="menu">
          <div className="section-heading menu-heading">
            <p className="eyebrow">Menú</p>
            <h2>Pastas tradicionales, especialidades, extras y bebidas con una propuesta México–italiana fácil de pedir y difícil de olvidar.</h2>
            <p className="menu-heading__intro">Explora por categorías y descubre una carta visual, clara y antojable pensada para móvil.</p>
            <div className="menu-heading__accent" aria-hidden="true">
              <span className="menu-heading__line menu-heading__line--green" />
              <span className="menu-heading__line menu-heading__line--white" />
              <span className="menu-heading__line menu-heading__line--red" />
            </div>
          </div>

          <div className="mobile-menu-experience" aria-label="Menú móvil por categorías">
            <div className="mobile-menu-experience__header">
              <p className="mobile-menu-experience__eyebrow">Categorías</p>
              <h3>Elige una categoría</h3>
            </div>

            <div className="mobile-category-tabs" role="tablist" aria-label="Categorías del menú">
              {mobileMenuCategories.map((category) => {
                const isActive = category.title === activeMobileSection.title
                return (
                  <button key={category.title} className={`mobile-category-tab ${isActive ? 'mobile-category-tab--active' : ''}`} type="button" role="tab" aria-selected={isActive} onClick={() => setActiveMobileCategory(category.title)}>
                    <span className="mobile-category-tab__icon" aria-hidden="true">{category.icon}</span>
                    <span className="mobile-category-tab__label">{category.shortLabel}</span>
                  </button>
                )
              })}
            </div>

            <article className="mobile-category-panel" aria-live="polite">
              <div className="mobile-category-panel__top">
                <div>
                  <p className="mobile-category-panel__eyebrow">{activeMobileSection.title}</p>
                  <h3>{activeMobileSection.shortLabel}</h3>
                </div>
                <span className="mobile-category-panel__count">{activeMobileSection.items.length} opciones</span>
              </div>
              <p className="mobile-category-panel__description">{activeMobileSection.description}</p>

              <div className="mobile-menu-cards">
                {activeMobileSection.items.map((item) => (
                  <article className="mobile-menu-card" key={`${activeMobileSection.title}-${item.name}`}>
                    <div className="mobile-menu-card__media">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="mobile-menu-card__body">
                      <div className="mobile-menu-card__top">
                        <h4>{item.name}</h4>
                        <span>{item.price}</span>
                      </div>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <div className="mobile-specialties" id="especialidades">
              <div className="mobile-menu-experience__header">
                <p className="mobile-menu-experience__eyebrow">Especialidades</p>
                <h3>Favoritas de la casa</h3>
              </div>

              <div className="signature-grid">
                {signatureDishes.map((dish) => (
                  <article className="signature-card" key={dish.name}>
                    <div className="signature-card__image-wrap">
                      <img className="signature-card__image" src={dish.image} alt={dish.name} />
                      <span className="signature-card__badge">{dish.category}</span>
                    </div>
                    <div className="signature-card__body">
                      <div className="menu-item__top">
                        <h3>{dish.name}</h3>
                        <span>{dish.price}</span>
                      </div>
                      <p>{dish.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <section className="section signature-section signature-section--desktop" id="especialidades">
            <div className="section-heading section-heading--narrow">
              <p className="eyebrow">Especialidades</p>
              <h2>Pastas con sello casero donde Italia se encuentra con México: cremosidad, sazón y combinaciones con mucha personalidad.</h2>
            </div>

            <div className="signature-grid">
              {signatureDishes.map((dish) => (
                <article className="signature-card" key={dish.name}>
                  <div className="signature-card__image-wrap">
                    <img className="signature-card__image" src={dish.image} alt={dish.name} />
                    <span className="signature-card__badge">{dish.category}</span>
                  </div>
                  <div className="signature-card__body">
                    <div className="menu-item__top">
                      <h3>{dish.name}</h3>
                      <span>{dish.price}</span>
                    </div>
                    <p>{dish.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="menu-desktop-layout">
            {menuSections.map((section) => (
              <div className="menu-block" key={section.title}>
                <div className="menu-block__header">
                  <div>
                    <h3>{section.title}</h3>
                    <p>{section.description}</p>
                  </div>
                </div>
                <div className="menu-grid">
                  {section.items.map((item) => (
                    <MenuItem item={item} key={item.name} />
                  ))}
                </div>
              </div>
            ))}

            <div className="menu-split">
              {complements.map((group) => (
                <div className="menu-side" key={group.title}>
                  <div className="menu-block__header">
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                  </div>
                  <div className="menu-grid menu-grid--compact">
                    {group.items.map((item) => (
                      <MenuItem item={item} key={item.name} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <section className="ordering-section" aria-label="Opciones para ordenar">
              <div className="menu-block__header">
                <h3>Cómo ordenar</h3>
                <p>Pedidos directos para recoger y accesos rápidos a apps de delivery cuando prefieran envío.</p>
              </div>
              <div className="ordering-grid">
                {orderChannels.map((channel) => (
                  <article className="ordering-card" key={channel.title}>
                    <h4>{channel.title}</h4>
                    <p>{channel.description}</p>
                    {channel.actionType === 'order' ? (
                      <button className="button button--primary ordering-card__button" type="button" onClick={openOrderModal}>
                        {channel.actionLabel}
                      </button>
                    ) : (
                      <div className="ordering-links">
                        {channel.links.map((link) => (
                          <a key={link.label} className="button button--ghost ordering-card__button" href={link.href} target="_blank" rel="noreferrer">
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>

      <footer className="footer" id="contacto">
        <div className="footer__brand-lockup">
          <div className="wordmark wordmark--footer" aria-hidden="true">
            <LogoMark />
          </div>
          <div className="footer__brand-copy">
            <p>Momentos que importan,</p>
            <span>sabor que permanece.</span>
            <i aria-hidden="true" />
          </div>
        </div>

        <div className="footer__actions">
          <a className="button button--ghost" href={PDF_MENU_PATH} target="_blank" rel="noreferrer">
            Ver menú completo
          </a>
          <button className="button button--primary" type="button" onClick={openOrderModal}>
            Pedir ahora
          </button>
        </div>
      </footer>

      <button className="whatsapp-fab" type="button" onClick={openChat} aria-label="Abrir chat de WhatsApp">
        <span className="whatsapp-fab__pulse" />
        <WhatsAppIcon />
      </button>

      {orderModalOpen ? (
        <div className="order-modal" role="dialog" aria-modal="true" aria-label="Pedir ahora">
          <button className="order-modal__backdrop" type="button" aria-label="Cerrar pedido" onClick={closeOrderModal} />
          <div className="order-modal__panel">
            <div className="order-modal__header">
              <div>
                <strong>Pedir ahora</strong>
                <p>Arma tu pedido, revisa tu subtotal y envíalo por WhatsApp. Solo para recoger en la ubicación.</p>
              </div>
              <button ref={orderCloseButtonRef} className="chat-modal__close" type="button" aria-label="Cerrar pedido" onClick={closeOrderModal}>
                ×
              </button>
            </div>

            <div className="order-modal__body">
              <div className="order-alert">
                <strong>Importante:</strong>
                <span>Este pedido es solo para recoger en sucursal.</span>
              </div>

              <section className="order-modal__section">
                <div className="order-modal__section-head">
                  <div>
                    <p className="eyebrow">Paso 1</p>
                    <h3>Elige tu pasta</h3>
                  </div>
                  <button className="button button--secondary order-modal__add-button" type="button" onClick={handleAddPastaToOrder}>
                    Agregar al pedido
                  </button>
                </div>

                <div className="order-product-grid">
                  {pastaCatalog.map((item) => (
                    <OrderProductCard key={item.id} item={item} selected={selectedPasta?.id === item.id} onSelect={setSelectedPastaId} actionLabel="Tocar para elegir" />
                  ))}
                </div>
              </section>

              <section className="order-modal__section">
                <div className="order-modal__section-head">
                  <div>
                    <p className="eyebrow">Paso 2</p>
                    <h3>Tu pedido de pasta</h3>
                  </div>
                  <span className="order-modal__section-note">Puedes agregar varias pastas y múltiples extras por cada una.</span>
                </div>

                {orderSummary.lineItems.length ? (
                  <div className="order-lines">
                    {orderSummary.lineItems.map((line) => (
                      <article className="order-line-item" key={line.lineId}>
                        <div className="order-line-item__top">
                          <div>
                            <h4>{line.product.name}</h4>
                            <p>{line.product.description}</p>
                          </div>
                          <strong>{formatCurrency(line.subtotal)}</strong>
                        </div>

                        <div className="order-line-item__controls">
                          <QuantityStepper value={line.quantity} onIncrement={() => incrementLine(line.lineId)} onDecrement={() => decrementLine(line.lineId)} label={`cantidad de ${line.product.name}`} />
                        </div>

                        <div className="order-line-item__extras">
                          <p>Extras</p>
                          <div className="order-extra-list">
                            {extrasCatalog.map((extra) => {
                              const checked = line.selectedExtraIds.includes(extra.id)
                              return (
                                <label className={`order-extra-chip ${checked ? 'order-extra-chip--active' : ''}`} key={`${line.lineId}-${extra.id}`}>
                                  <input type="checkbox" checked={checked} onChange={() => toggleLineExtra(line.lineId, extra.id)} />
                                  <span>{extra.name} · {extra.price}</span>
                                </label>
                              )
                            })}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="order-empty-state">Todavía no has agregado ninguna pasta. Elige una arriba y toca “Agregar al pedido”.</div>
                )}
              </section>

              <section className="order-modal__section">
                <div className="order-modal__section-head">
                  <div>
                    <p className="eyebrow">Paso 3</p>
                    <h3>Bebidas</h3>
                  </div>
                </div>

                <div className="order-drink-grid">
                  {drinksCatalog.map((drink) => (
                    <article className="order-drink-card" key={drink.id}>
                      <div className="order-drink-card__media">
                        <img src={drink.image} alt={drink.name} />
                      </div>
                      <div className="order-drink-card__body">
                        <div>
                          <h4>{drink.name}</h4>
                          <p>{drink.description}</p>
                        </div>
                        <strong>{drink.price}</strong>
                      </div>
                      <QuantityStepper value={drinkQuantities[drink.id] || 0} onIncrement={() => incrementDrink(drink.id)} onDecrement={() => decrementDrink(drink.id)} label={`cantidad de ${drink.name}`} />
                    </article>
                  ))}
                </div>
              </section>

              <section className="order-modal__section order-modal__section--summary">
                <div className="order-modal__section-head">
                  <div>
                    <p className="eyebrow">Paso 4</p>
                    <h3>Resumen y envío</h3>
                  </div>
                </div>

                <label className="order-notes">
                  <span>Notas para tu pedido</span>
                  <textarea value={orderNotes} onChange={(event) => setOrderNotes(event.target.value)} rows="4" placeholder="Ej. sin cubiertos, sin picante extra, llego en 20 minutos..." />
                </label>

                <div className="order-summary-card">
                  <div className="order-summary-card__lines">
                    {orderSummary.lineItems.map((item) => (
                      <div className="order-summary-row" key={`summary-${item.lineId}`}>
                        <div>
                          <strong>{item.quantity} x {item.product.name}</strong>
                          <span>{item.extras.length ? `Extras: ${item.extras.map((extra) => extra.name).join(', ')}` : 'Sin extras'}</span>
                        </div>
                        <b>{formatCurrency(item.subtotal)}</b>
                      </div>
                    ))}
                    {orderSummary.drinkItems.map((item) => (
                      <div className="order-summary-row" key={`drink-${item.drinkId}`}>
                        <div>
                          <strong>{item.quantity} x {item.product.name}</strong>
                          <span>Bebida</span>
                        </div>
                        <b>{formatCurrency(item.subtotal)}</b>
                      </div>
                    ))}
                    {!hasOrderItems ? <div className="order-empty-state order-empty-state--compact">Tu subtotal aparecerá aquí cuando agregues pastas o bebidas.</div> : null}
                  </div>

                  <div className="order-summary-card__total">
                    <span>Subtotal estimado</span>
                    <strong>{formatCurrency(orderSubtotal)}</strong>
                  </div>
                  <p className="order-summary-card__pickup">Pedido solo para recoger en la ubicación.</p>
                </div>

                <button className="button button--primary" type="button" onClick={handleSendOrderWhatsApp} disabled={!hasOrderItems}>
                  Enviar pedido por WhatsApp
                </button>
              </section>
            </div>
          </div>
        </div>
      ) : null}

      {chatOpen ? (
        <div className="chat-modal chat-modal--open" role="dialog" aria-modal="true" aria-label="Chat de WhatsApp">
          <button className="chat-modal__backdrop" type="button" aria-label="Cerrar chat" onClick={closeChat} />
          <div className="chat-modal__panel">
            <div className="chat-modal__header">
              <div>
                <strong>La Mia Pasta</strong>
                <p>Cuéntanos qué pasta se te antoja y preparamos tu pedido con el toque de la casa.</p>
              </div>
              <button ref={closeButtonRef} className="chat-modal__close" type="button" aria-label="Cerrar" onClick={closeChat}>
                ×
              </button>
            </div>
            <label className="chat-modal__body">
              <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows="5" aria-label="Escribe tu mensaje para WhatsApp" />
            </label>
            <div className="chat-modal__actions">
              <button className="button button--secondary" type="button" onClick={closeChat}>
                Cancelar
              </button>
              <button className="button button--primary" type="button" onClick={handleSendWhatsApp}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
