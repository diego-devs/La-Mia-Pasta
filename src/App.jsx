import { useEffect, useState } from 'react'
import './App.css'

const WHATSAPP_NUMBER = '5210000000000'

const featuredDishes = [
  {
    name: 'Fetuccini poblano',
    category: 'Favorito de la casa',
    description: 'Salsa cremosa de chile poblano, pasta fresca y un acabado delicado con parmesano.',
    price: '$130',
    image:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Spaguetti boloñesa',
    category: 'Clásico reconfortante',
    description: 'Una preparación generosa, cálida y muy antojable para abrir el apetito desde el primer vistazo.',
    price: '$130',
    image:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Penne chipotle',
    category: 'Toque mexicano',
    description: 'Una versión con carácter, cremosa y ligeramente picante, pensada para una marca con identidad propia.',
    price: '$130',
    image:
      'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&w=1200&q=80',
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
    description: 'Platos más completos con proteína y más protagonismo visual.',
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

function LogoMark() {
  return <img className="logo-image" src="/La-Mia-Pasta/logo.jpg" alt="Logo de La Mia Pasta" />
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState('Hola, quiero información sobre La Mia Pasta.')

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

  const navItems = [
    { href: '#platillos', label: 'Platillos' },
    { href: '#menu', label: 'Menú' },
    { href: '#contacto', label: 'Contacto' },
  ]

  const handleSendWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message.trim() || 'Hola, quiero información sobre La Mia Pasta.')
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
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
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
            WhatsApp
          </button>
        </nav>

        <div className={`nav-drawer ${menuOpen ? 'nav-drawer--open' : ''}`}>
          {navItems.map((item) => (
            <a href={item.href} key={item.href} onClick={handleNavClick}>
              {item.label}
            </a>
          ))}
        </div>

        <div className="hero__content">
          <div className="hero__text">
            <p className="eyebrow">Pasión por la pasta</p>
            <h1>Pasta artesanal con una identidad elegante y sabor memorable.</h1>
            <p className="hero__lead">
              Pastas frescas, combinaciones reconfortantes y una propuesta pensada para antojar desde la primera visita, especialmente en celular.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#platillos">
                Ver platillos
              </a>
              <button className="button button--secondary" type="button" onClick={() => setChatOpen(true)}>
                Pedir por WhatsApp
              </button>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__logo-card">
              <LogoMark />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="section dishes" id="platillos">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Platillos destacados</p>
            <h2>Sabores que entran primero por los ojos y se quedan por el sabor.</h2>
          </div>

          <div className="dish-grid">
            {featuredDishes.map((dish) => (
              <article className="dish-card" key={dish.name}>
                <div className="dish-card__image-wrap">
                  <img className="dish-card__image" src={dish.image} alt={dish.name} />
                  <span className="dish-card__badge">{dish.category}</span>
                </div>
                <div className="dish-card__body">
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

        <section className="section brand-strip">
          <div>
            <p className="eyebrow">Nuestra esencia</p>
            <h2>Una marca con carácter visual, platos apetecibles y experiencia simple para pedir.</h2>
          </div>
          <div className="brand-strip__points">
            <span>Diseño limpio y enfocado en producto</span>
            <span>Navegación cómoda en celular</span>
            <span>Acceso directo a pedido por WhatsApp</span>
          </div>
        </section>

        <section className="section menu-section" id="menu">
          <div className="section-heading">
            <p className="eyebrow">Menú</p>
            <h2>Una carta clara, ordenada y fácil de recorrer desde el teléfono.</h2>
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
        <div className="footer__brand">
          <LogoMark />
        </div>
        <div className="footer__text">
          <p>La Mia Pasta</p>
          <span>Pasta fresca, sabores memorables y pedidos fáciles por WhatsApp.</span>
        </div>
      </footer>

      <button className="whatsapp-fab" type="button" onClick={() => setChatOpen(true)} aria-label="Abrir chat de WhatsApp">
        <span className="whatsapp-fab__pulse" />
        <span className="whatsapp-fab__label">WhatsApp</span>
      </button>

      {chatOpen ? (
        <div className="chat-modal" role="dialog" aria-modal="true" aria-label="Chat de WhatsApp">
          <button className="chat-modal__backdrop" type="button" aria-label="Cerrar chat" onClick={() => setChatOpen(false)} />
          <div className="chat-modal__panel">
            <div className="chat-modal__header">
              <div>
                <strong>La Mia Pasta</strong>
                <p>Escribe tu mensaje y te llevamos a WhatsApp.</p>
              </div>
              <button className="chat-modal__close" type="button" aria-label="Cerrar" onClick={() => setChatOpen(false)}>
                ×
              </button>
            </div>
            <label className="chat-modal__body">
              <span>Mensaje</span>
              <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows="5" />
            </label>
            <div className="chat-modal__actions">
              <button className="button button--secondary" type="button" onClick={() => setChatOpen(false)}>
                Cancelar
              </button>
              <button className="button button--primary" type="button" onClick={handleSendWhatsApp}>
                Send
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
