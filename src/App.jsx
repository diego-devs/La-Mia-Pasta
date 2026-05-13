import { useEffect, useRef, useState } from 'react'
import './App.css'

const WHATSAPP_NUMBER = '524424230777'
const PDF_MENU_PATH = '/La-Mia-Pasta/LA_MIA_PASTA.pdf'
const BASE_URL = import.meta.env.BASE_URL

const DISH_IMAGES = {
  fetucciniPoblano: `${BASE_URL}images/dishes/fetuccini-poblano.jpg`,
  spaguettiBolognesa: `${BASE_URL}images/dishes/spaguetti-bolognesa.jpg`,
  penneChipotle: `${BASE_URL}images/dishes/penne-chipotle.jpg`,
}

const HERO_IMAGE = `${BASE_URL}images/hero/spaguetti-servido.jpg`

const featuredPhrases = ['Ingredientes seleccionados', 'Recetas artesanales', 'Hechas con pasión']

const signatureDishes = [
  {
    name: 'Spaguetti boloñesa',
    category: 'Clásico reconfortante',
    description: 'Una receta cálida y generosa con salsa boloñesa, parmesano y ese sabor casero que siempre se antoja.',
    price: '$130',
    image: DISH_IMAGES.spaguettiBolognesa,
  },
  {
    name: 'Fetuccini poblano',
    category: 'Favorito de la casa',
    description: 'Salsa cremosa de chile poblano, pasta fresca y un acabado delicado para una experiencia con carácter.',
    price: '$130',
    image: DISH_IMAGES.fetucciniPoblano,
  },
  {
    name: 'Penne chipotle',
    category: 'Toque mexicano',
    description: 'Una combinación cremosa y ligeramente picante pensada para quienes quieren pasta con personalidad.',
    price: '$130',
    image: DISH_IMAGES.penneChipotle,
  },
]

const menuSections = [
  {
    title: 'Pastas básicas',
    description: 'Opciones directas, apetecibles y perfectas para venta diaria.',
    items: [
      { name: 'Spaguetti boloñesa', description: '300 g de pasta fresca con 8 oz de salsa boloñesa, pan y queso parmesano.', price: '$130' },
      { name: 'Penne champiñones', description: '300 g de pasta fresca con salsa cremosa de champiñones, pan y parmesano.', price: '$130' },
      { name: 'Fetuccini poblano', description: '300 g de pasta fresca con salsa de chile poblano, pan y parmesano.', price: '$130' },
      { name: 'Penne chipotle', description: '300 g de pasta fresca con salsa chipotle, pan y parmesano.', price: '$130' },
      { name: 'Macarrones cheddar', description: '300 g de pasta fresca con salsa cheddar, pan y parmesano.', price: '$130' },
    ],
  },
  {
    title: 'Especialidades',
    description: 'Platos más completos con proteína y mayor protagonismo visual.',
    items: [
      { name: 'Spaguetti boloñesa con albóndigas', description: 'Pasta fresca, salsa boloñesa, albóndigas, pan, parmesano y perejil.', price: '$160' },
      { name: 'Penne champiñones con camarones', description: 'Pasta fresca, salsa de champiñones, camarones, pan, parmesano y perejil.', price: '$170' },
      { name: 'Fetuccini poblano con pollo', description: 'Pasta fresca, salsa poblana, pollo, pan, parmesano y perejil.', price: '$160' },
      { name: 'Penne chipotle con chuleta ahumada', description: 'Pasta fresca, salsa chipotle, chuleta ahumada, pan, parmesano y perejil.', price: '$160' },
      { name: 'Macarrones cheddar con tocino', description: 'Pasta fresca, salsa cheddar, tocino, pan, parmesano y perejil.', price: '$160' },
    ],
  },
]

const complements = [
  {
    title: 'Bebidas',
    items: [
      { name: 'Refrescos', description: 'Coca-Cola, Fanta, Sidral Mundet y agua mineral Peñafiel.', price: '$40' },
      { name: 'Aguas artesanales', description: 'Jamaica, horchata y limón con chía.', price: '$35' },
    ],
  },
  {
    title: 'Extras',
    items: [
      { name: 'Extra de proteína', description: 'Camarones, pollo, albóndigas, chuleta ahumada o tocino.', price: '$40' },
      { name: 'Extra de parmesano', description: 'El remate ideal para cualquier plato.', price: '$35' },
    ],
  },
]

const featureItems = [
  {
    title: 'Ingredientes seleccionados',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 41c8.5-5.6 13-12 13-20.1 0-6.1-4.2-10.4-9.6-10.4-3.5 0-6.2 1.7-8.4 4.9-2.2-3.2-4.9-4.9-8.4-4.9C5.2 10.5 1 14.8 1 20.9 1 29 5.5 35.4 14 41c3.3 2.2 6.7 4 10 5.8 3.3-1.8 6.7-3.6 10-5.8Z" />
        <path d="M24 17c2.7 4.4 6 7.5 10 9.2" />
      </svg>
    ),
  },
  {
    title: 'Recetas artesanales',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 36h28" />
        <path d="M14 36V18c0-5.5 4.5-10 10-10s10 4.5 10 10v18" />
        <path d="M18 14c1.8 2.2 4 3.3 6 3.3s4.2-1.1 6-3.3" />
      </svg>
    ),
  },
  {
    title: 'Hechas con pasión',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 42c-8.4-5.6-14-11.2-14-18.8C10 17.8 13.8 14 18.5 14c2.9 0 5 1.2 5.5 4 0.5-2.8 2.6-4 5.5-4 4.7 0 8.5 3.8 8.5 9.2C38 30.8 32.4 36.4 24 42Z" />
      </svg>
    ),
  },
  {
    title: 'Disfruta en casa',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 23.5 24 11l16 12.5" />
        <path d="M14 21v16h20V21" />
        <path d="M21 37V27h6v10" />
      </svg>
    ),
  },
]

function LogoMark() {
  return <img className="logo-image" src={`${BASE_URL}logo.jpg`} alt="Logo de La Mia Pasta" />
}

function MenuItem({ item }) {
  return (
    <article className="menu-item">
      <div className="menu-item__top">
        <h3>{item.name}</h3>
        <span>{item.price}</span>
      </div>
      <p>{item.description}</p>
    </article>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M27.2 4.7A15 15 0 0 0 3.7 22.8L2 30l7.4-1.9A15 15 0 1 0 27.2 4.7Zm-11.2 24a12.5 12.5 0 0 1-6.4-1.8l-.5-.3-4.4 1.1 1.2-4.3-.3-.5a12.5 12.5 0 1 1 10.4 5.8Zm6.8-9.3c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.9.2s-1 1.2-1.2 1.4c-.2.2-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1-2-2.2-2.2-2.6-.2-.4 0-.6.1-.8l.6-.7.4-.6c.2-.3.1-.5 0-.7L11.8 9c-.1-.3-.3-.6-.7-.6h-.6c-.3 0-.7.1-1 .4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.8 5.9 5.1.8.4 1.5.6 2 .7.8.2 1.6.2 2.1.1.6-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.1-.4-.2-.8-.4Z" />
    </svg>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState('Hola! Quiero hacer un pedido en La Mia Pasta.')
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setChatOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    if (!chatOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [chatOpen])

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

  return (
    <div className={`site-shell ${menuOpen ? 'site-shell--menu-open' : ''}`}>
      <header className="hero" id="inicio">
        <nav className="topbar">
          <button
            className={`menu-toggle ${menuOpen ? 'menu-toggle--active' : ''}`}
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>

          <a className="wordmark wordmark--centered" href="#inicio" aria-label="Ir al inicio">
            <LogoMark />
          </a>

          <button className="topbar__whatsapp" type="button" onClick={() => setChatOpen(true)}>
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
          <div className="hero__text">
            <p className="eyebrow">Pasión por la pasta</p>
            <div className="hero__accent" aria-hidden="true" />
            <h1>
              Pastas frescas, recetas con carácter y una experiencia hecha para <em>disfrutar.</em>
            </h1>
            <p className="hero__lead">
              Ingredientes seleccionados, combinaciones reconfortantes y el sabor de lo hecho en casa, en cada bocado.
            </p>

            <div className="hero__actions">
              <button className="button button--whatsapp" type="button" onClick={() => setChatOpen(true)}>
                <span className="button__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 4h12l2 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7l2-3Z" />
                    <path d="M6 8h12" />
                  </svg>
                </span>
                <span>
                  <strong>Pedidos por WhatsApp</strong>
                  <small>Rápido, fácil y seguro</small>
                </span>
              </button>
            </div>

            <div className="hero__phrases" aria-label="Valores de la marca">
              {featuredPhrases.map((phrase) => (
                <span key={phrase}>{phrase}</span>
              ))}
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__image-wrap">
              <img className="hero__image" src={HERO_IMAGE} alt="Plato de spaghetti cremoso con albahaca fresca" />
            </div>
            <aside className="hero__seal" aria-label="Hechas con pasión, sabor que reconforta">
              <div className="hero__seal-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48">
                  <path d="M24 42c7.8-5 12-10.7 12-17.9 0-5.7-3.6-9.6-8.5-9.6-2.8 0-4.9 1.2-6.5 3.5-1.6-2.3-3.7-3.5-6.5-3.5-4.9 0-8.5 3.9-8.5 9.6C12 31.3 16.2 37 24 42Z" />
                </svg>
              </div>
              <p>Hechas con pasión</p>
              <span>Sabor que reconforta</span>
            </aside>
          </div>
        </div>
      </header>

      <main>
        <section className="section signature-section" id="especialidades">
          <div className="section-heading section-heading--narrow">
            <p className="eyebrow">Especialidades</p>
            <h2>Selecciones con presencia, textura y ese estilo casero-premium que define a La Mia Pasta.</h2>
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

        <section className="section features-section" aria-label="Valores principales de La Mia Pasta">
          <div className="features-panel">
            {featureItems.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-card__icon">{feature.icon}</div>
                <p>{feature.title}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section menu-section" id="menu">
          <div className="section-heading">
            <p className="eyebrow">Menú</p>
            <h2>Pastas básicas, especialidades y complementos para pedir fácil y disfrutar en casa.</h2>
          </div>

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
                </div>
                <div className="menu-grid menu-grid--compact">
                  {group.items.map((item) => (
                    <MenuItem item={item} key={item.name} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer" id="contacto">
        <div className="footer__brand-lockup">
          <LogoMark />
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
          <button className="button button--primary" type="button" onClick={() => setChatOpen(true)}>
            Pedir ahora
          </button>
        </div>
      </footer>

      <button className="whatsapp-fab" type="button" onClick={() => setChatOpen(true)} aria-label="Abrir chat de WhatsApp">
        <span className="whatsapp-fab__pulse" />
        <WhatsAppIcon />
      </button>

      {chatOpen ? (
        <div className="chat-modal" role="dialog" aria-modal="true" aria-label="Chat de WhatsApp">
          <button className="chat-modal__backdrop" type="button" aria-label="Cerrar chat" onClick={() => setChatOpen(false)} />
          <div className="chat-modal__panel">
            <div className="chat-modal__header">
              <div>
                <strong>La Mia Pasta</strong>
                <p>Hola. Cuéntanos qué pasta se te antoja y te respondemos en seguida.</p>
              </div>
              <button ref={closeButtonRef} className="chat-modal__close" type="button" aria-label="Cerrar" onClick={() => setChatOpen(false)}>
                ×
              </button>
            </div>
            <label className="chat-modal__body">
              <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows="5" aria-label="Escribe tu mensaje para WhatsApp" />
            </label>
            <div className="chat-modal__actions">
              <button className="button button--secondary" type="button" onClick={() => setChatOpen(false)}>
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
