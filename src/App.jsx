import { useEffect, useRef, useState } from 'react'
import './App.css'

const WHATSAPP_NUMBER = '524424230777'
const PDF_MENU_PATH = '/La-Mia-Pasta/LA_MIA_PASTA.pdf'
const DISH_IMAGES = {
  fetucciniPoblano: '/La-Mia-Pasta/images/dishes/fetuccini-poblano.jpg',
  spaguettiBolognesa: '/La-Mia-Pasta/images/dishes/spaguetti-bolognesa.jpg',
  penneChipotle: '/La-Mia-Pasta/images/dishes/penne-chipotle.jpg',
}
const HERO_IMAGES = {
  pastaCremosa: '/La-Mia-Pasta/images/hero/pasta-cremosa.jpg',
  spaguettiServido: '/La-Mia-Pasta/images/hero/spaguetti-servido.jpg',
  penneSalsa: '/La-Mia-Pasta/images/hero/penne-salsa.jpg',
}

const featuredDishes = [
  {
    name: 'Fetuccini poblano',
    category: 'Favorito de la casa',
    description: 'Salsa cremosa de chile poblano, pasta fresca y un acabado delicado con parmesano.',
    price: '$130',
    image: DISH_IMAGES.fetucciniPoblano,
  },
  {
    name: 'Spaguetti boloñesa',
    category: 'Clásico reconfortante',
    description: 'Una preparación generosa, cálida y muy antojable para abrir el apetito desde el primer vistazo.',
    price: '$130',
    image: DISH_IMAGES.spaguettiBolognesa,
  },
  {
    name: 'Penne chipotle',
    category: 'Toque mexicano',
    description: 'Una versión con carácter, cremosa y ligeramente picante, pensada para una marca con identidad propia.',
    price: '$130',
    image: DISH_IMAGES.penneChipotle,
  },
]

const heroGallery = [
  {
    name: 'Pasta cremosa al centro',
    image: HERO_IMAGES.pastaCremosa,
  },
  {
    name: 'Spaguetti recién servido',
    image: HERO_IMAGES.spaguettiServido,
  },
  {
    name: 'Penne con salsa intensa',
    image: HERO_IMAGES.penneSalsa,
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
  return <img className="logo-image" src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo de La Mia Pasta" />
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
  const [message, setMessage] = useState('Hola! Quiero información sobre La Mia Pasta.')
  const closeButtonRef = useRef(null)
  const heroHighlights = ['Pasta fresca', 'Salsas caseras', 'Pedidos por WhatsApp']

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
    { href: '#platillos', label: 'Platillos' },
    { href: '#menu', label: 'Menú' },
    { href: '#contacto', label: 'Contacto' },
  ]

  const handleSendWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message.trim() || 'Hola! Quiero información sobre La Mia Pasta.')
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

          <div className="topbar__links" aria-label="Navegación principal">
            {navItems.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <button className="topbar__whatsapp" type="button" onClick={() => setChatOpen(true)}>
            WhatsApp
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
          <div className="hero__gallery hero__gallery--lead" aria-label="Galería destacada de pastas">
            <article className="hero__gallery-main">
              <img src={heroGallery[0].image} alt={heroGallery[0].name} />
              <div className="hero__gallery-caption">
                <span>Selección de la casa</span>
                <strong>Sabores que entran primero por los ojos</strong>
              </div>
            </article>

            <div className="hero__gallery-stack">
              {heroGallery.slice(1).map((item) => (
                <article className="hero__gallery-card" key={item.name}>
                  <img src={item.image} alt={item.name} />
                </article>
              ))}
            </div>
          </div>

          <div className="hero__text">
            <p className="eyebrow">Pasión por la pasta</p>
            <div className="hero__kicker-row">
              {heroHighlights.map((item) => (
                <span className="hero__kicker-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <h1>Pasta fresca, recetas con carácter y una experiencia hecha para antojar.</h1>
            <p className="hero__lead">
              Pastas frescas, combinaciones reconfortantes y una propuesta pensada para abrir el apetito desde la primera vista.
            </p>
            <div className="hero__actions">
              <button className="button button--primary" type="button" onClick={() => setChatOpen(true)}>
                Pedir por WhatsApp
              </button>
              <a className="button button--secondary" href="#platillos">
                Ver platillos
              </a>
              <a className="button button--ghost" href={PDF_MENU_PATH} target="_blank" rel="noreferrer">
                Descargar menú
              </a>
            </div>
            <div className="hero__mini-note">
              <strong>Hecho para antojar desde el primer scroll.</strong>
              <span>Imagen cálida, menú claro y acceso directo para pedir sin fricción.</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="section dishes" id="platillos">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Platillos destacados</p>
            <h2>Platillos preparados para disfrutarse desde el primer vistazo hasta el último bocado.</h2>
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
            <h2>Cocinamos pasta fresca con salsas intensas, ingredientes generosos y ese toque casero que siempre se antoja.</h2>
          </div>
          <div className="brand-strip__points">
            <span>Pasta fresca preparada al momento</span>
            <span>Salsas cremosas, intensas y reconfortantes</span>
            <span>Porciones generosas para disfrutar y compartir</span>
          </div>
        </section>

        <section className="section menu-section" id="menu">
          <div className="section-heading">
            <p className="eyebrow">Menú</p>
            <h2>Recetas clásicas y especialidades pensadas para satisfacer cualquier antojo.</h2>
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
                <p>hola! En qué podemos ayudarte? Te respondemos en seguida!</p>
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
