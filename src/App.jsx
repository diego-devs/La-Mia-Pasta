import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const WHATSAPP_NUMBER = '524424230777'
const BASE_URL = import.meta.env.BASE_URL
const PDF_MENU_PATH = `${BASE_URL}LA_MIA_PASTA.pdf`
const LOCATION_URL = 'https://maps.app.goo.gl/jfcreP4xnpdYLhX9A?g_st=ic'
const GOOGLE_MAPS_EMBED_URL = 'https://www.google.com/maps?q=Blvd.+Jurica+la+Campana+1192,+Manzanares,+76230+Juriquilla,+Qro.&output=embed'
const DOWNLOADABLE_MENU_FILENAME = 'La_Mia_Pasta_Menu_Sin_Bordes_v2.pdf'

const aboutContent = {
  mission:
    'Crear experiencias reconfortantes con pasta fresca y sazón casera, combinando el alma italiana con sabores mexicanos en cada pedido.',
  vision:
    'Ser una referencia local de pasta hecha con pasión, reconocida por su identidad cálida, su propuesta México–italiana y su cercanía con cada cliente.',
  logoMeaning:
    'El logotipo representa la identidad de La Mia Pasta: una firma visual elegante que celebra la pasión por la pasta y la unión de inspiración italiana con carácter mexicano.',
}

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    handle: '/LaMiaPasta',
    href: 'https://www.facebook.com/share/15nVQhV4ZW/?mibextid=wwXIfr',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6h1.5V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4V11H8v3h2.6v8h2.9Z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@lamiapastamx',
    href: 'https://www.instagram.com/lamiapastamx?igsh=MXM0emV6d3BqYnp0cA==',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm9.8 1.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    handle: '@lamiapastamx',
    href: 'https://www.tiktok.com/@lamiapastamx',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.7 3c.3 1.8 1.4 3.3 3.1 4.1.9.4 1.8.6 2.7.6v3.1c-1.5 0-3-.4-4.3-1.1v5.1a6 6 0 1 1-5.2-6v3.2a2.9 2.9 0 1 0 2.3 2.8V3h1.4Z" />
      </svg>
    ),
  },
]

const DISH_IMAGES = {
  fetucciniPoblano: `${BASE_URL}images/dishes/fetuccini-poblano.jpg`,
  fetucciniPoblanoPollo: `${BASE_URL}images/dishes/fetuccini-poblano-pollo.jpg`,
  spaguettiBolognesa: `${BASE_URL}images/dishes/spaguetti-bolognesa-real.jpg`,
  spaguettiBolognesaAlbndigas: `${BASE_URL}images/dishes/spaguetti-bolognesa-albondigas.jpg`,
  penneChipotle: `${BASE_URL}images/dishes/penne-chipotle.jpg`,
  penneChipotleChuleta: `${BASE_URL}images/dishes/penne-chipotle-chuleta.jpg`,
  macarronesCheddar: `${BASE_URL}images/dishes/macarrones-cheddar.jpg`,
  macarronesCheddarTocino: `${BASE_URL}images/dishes/macarrones-cheddar-tocino.jpg`,
  penneChampinones: `${BASE_URL}images/dishes/penne-champinones.jpg`,
  penneChampinonesCamarones: `${BASE_URL}images/dishes/penne-champinones-camarones.jpg`,
  albondigas: `${BASE_URL}images/dishes/albondigas.jpg`,
  proteinPollo: `${BASE_URL}images/dishes/protein-pollo.jpg`,
  proteinChuletaAhumada: `${BASE_URL}images/dishes/protein-chuleta-ahumada.jpg`,
  proteinCamarones: `${BASE_URL}images/dishes/protein-camarones.jpg`,
  proteinTocino: `${BASE_URL}images/dishes/protein-tocino.jpg`,
  proteinParmesano: `${BASE_URL}images/dishes/protein-parmesano.jpg`,
  bebidaJamaica: `${BASE_URL}images/dishes/bebida-jamaica.jpg`,
  bebidaLimon: `${BASE_URL}images/dishes/bebida-limon.jpg`,
  bebidaHorchata: `${BASE_URL}images/dishes/bebida-horchata.jpg`,
  bebidaCocaCola: `${BASE_URL}images/dishes/bebida-jamaica.jpg`,
  bebidaFanta: `${BASE_URL}images/dishes/bebida-limon.jpg`,
  bebidaSidral: `${BASE_URL}images/dishes/bebida-horchata.jpg`,
  bebidaPenafiel: `${BASE_URL}images/dishes/bebida-jamaica.jpg`,
}

const beverages = {
  title: 'Bebidas artesanales',
  description: 'Acompaña tu pasta con aguas artesanales o refrescos del menú actualizado.',
  sections: [
    {
      title: 'Aguas artesanales',
      description: 'Jamaica, horchata y limón con chía para acompañar tu pasta con un toque fresco.',
      items: [
        { name: 'Jamaica', description: 'Agua artesanal fría.', price: '$35', image: DISH_IMAGES.bebidaJamaica },
        { name: 'Horchata', description: 'Agua artesanal fría.', price: '$35', image: DISH_IMAGES.bebidaHorchata },
        { name: 'Limón con chía', description: 'Agua artesanal fría.', price: '$35', image: DISH_IMAGES.bebidaLimon },
      ],
    },
    {
      title: 'Refrescos',
      description: 'Refrescos del menú actual para quienes prefieren una opción clásica.',
      items: [
        { name: 'Coca Cola', description: 'Refresco frío.', price: '$40', image: DISH_IMAGES.bebidaCocaCola },
        { name: 'Fanta', description: 'Refresco frío.', price: '$40', image: DISH_IMAGES.bebidaFanta },
        { name: 'Sidral Mundet', description: 'Refresco frío.', price: '$40', image: DISH_IMAGES.bebidaSidral },
        { name: 'Agua mineral Peñafiel', description: 'Refresco frío.', price: '$40', image: DISH_IMAGES.bebidaPenafiel },
      ],
    },
  ],
}

const HERO_IMAGE = `${BASE_URL}images/hero/spaguetti-servido.jpg`

const featuredPhrases = ['Pasta fresca artesanal', 'Menú actualizado', 'Pedidos por WhatsApp']

const signatureDishes = [
  {
    name: 'Spaguetti boloñesa',
    category: 'Clásico reconfortante',
    description: 'Una receta cálida y generosa con salsa boloñesa, parmesano y ese sabor casero que siempre se antoja.',
    price: '$130',
    image: DISH_IMAGES.spaguettiBolognesa,
  },
  {
    name: 'Spaguetti boloñesa con albóndigas',
    category: 'Con proteína',
    description: 'La versión más completa de la casa: salsa boloñesa, albóndigas y parmesano para un antojo con más cuerpo.',
    price: '$160',
    image: DISH_IMAGES.spaguettiBolognesaAlbndigas,
  },
  {
    name: 'Fetuccini poblano con pollo',
    category: 'Favorito de la casa',
    description: 'Salsa cremosa de chile poblano, pasta fresca y pollo a la plancha para una combinación con carácter.',
    price: '$160',
    image: DISH_IMAGES.fetucciniPoblanoPollo,
  },
  {
    name: 'Penne chipotle con chuleta ahumada',
    category: 'Toque mexicano',
    description: 'Una combinación cremosa y ligeramente picante con chuleta ahumada, pensada para quienes quieren pasta con personalidad.',
    price: '$160',
    image: DISH_IMAGES.penneChipotleChuleta,
  },
]

const menuSections = [
  {
    title: 'Tradicional',
    description: 'Pastas base de la casa con perfil italiano y guiños mexicanos como poblano y chipotle.',
    items: [
      { name: 'Spaguetti boloñesa', description: '300 g de pasta fresca acompañada de 8 oz de salsa boloñesa y una pieza de pan, finalizada con queso parmesano y perejil.', price: '$130' },
      { name: 'Penne champiñones', description: '300 g de pasta fresca acompañada de 8 oz de salsa de champiñones y una pieza de pan, finalizada con queso parmesano y perejil.', price: '$130' },
      { name: 'Fetuccini poblano', description: '300 g de pasta fresca acompañada de 8 oz de salsa de chile poblano y una pieza de pan, finalizada con queso parmesano y perejil.', price: '$130' },
      { name: 'Penne chipotle', description: '300 g de pasta fresca acompañada de 8 oz de salsa de chipotle y una pieza de pan, finalizada con queso parmesano y perejil. Ideal para quienes disfrutan un toque picante.', price: '$130' },
      { name: 'Macarrones cheddar', description: '300 g de pasta fresca acompañada de 8 oz de salsa de queso cheddar y una pieza de pan, finalizada con queso parmesano.', price: '$130' },
    ],
  },
  {
    title: 'Especialidades',
    description: 'Versiones más completas con proteína, más intensidad y ese sello casero de la casa.',
    items: [
      { name: 'Spaguetti boloñesa con albóndigas', description: '300 g de pasta fresca acompañada de 8 oz de salsa boloñesa, 80 g de proteína y una pieza de pan, finalizada con queso parmesano y perejil.', price: '$160' },
      { name: 'Penne champiñones con camarones', description: '300 g de pasta fresca acompañada de 8 oz de salsa de champiñones, 80 g de proteína y una pieza de pan, finalizada con queso parmesano y perejil.', price: '$170' },
      { name: 'Fetuccini poblano con pollo', description: '300 g de pasta fresca acompañada de 8 oz de salsa de chile poblano, 80 g de proteína y una pieza de pan, finalizada con queso parmesano y perejil.', price: '$160' },
      { name: 'Penne chipotle con chuleta ahumada', description: '300 g de pasta fresca acompañada de 8 oz de salsa de chipotle, 80 g de proteína y una pieza de pan, finalizada con queso parmesano y perejil. Ideal para quienes disfrutan un toque picante.', price: '$160' },
      { name: 'Macarrones cheddar con tocino', description: '300 g de pasta fresca acompañada de 8 oz de salsa de queso cheddar, 80 g de proteína y una pieza de pan, finalizada con queso parmesano y perejil.', price: '$160' },
    ],
  },
]

const complements = [
  {
    title: 'Extras',
    description: 'Personaliza tu pasta con proteína o queso extra.',
    items: [
      { name: 'Camarones a la mantequilla', description: 'Extra de proteína.', price: '$40', image: DISH_IMAGES.proteinCamarones },
      { name: 'Pollo al Grill', description: 'Extra de proteína.', price: '$30', image: DISH_IMAGES.proteinPollo },
      { name: 'Albóndigas', description: 'Extra de proteína.', price: '$30', image: DISH_IMAGES.albondigas },
      { name: 'Chuleta ahumada', description: 'Extra de proteína.', price: '$30', image: DISH_IMAGES.proteinChuletaAhumada },
      { name: 'Tocino', description: 'Extra de proteína.', price: '$30', image: DISH_IMAGES.proteinTocino },
      { name: 'Queso parmesano', description: 'Extra de queso.', price: '$30', image: DISH_IMAGES.proteinParmesano },
    ],
  },
]

const orderChannels = [
  {
    title: 'Pide y recoge',
    description: 'Haz tu pedido directo por WhatsApp y coordinamos la recolección contigo.',
    actionLabel: 'Pedir por WhatsApp',
    actionType: 'whatsapp',
  },
  {
    title: 'Entrega a domicilio',
    description: 'Si prefieres envío, te llevamos a tu app favorita para completar el pedido en Uber Eats o DiDi Food.',
    links: [
      { label: 'Uber Eats', href: 'https://www.ubereats.com/' },
      { label: 'DiDi Food', href: 'https://www.didi-food.com/es-MX' },
    ],
  },
]

function LogoMark() {
  return (
    <>
      <img className="logo-image" src={`${BASE_URL}logo-dark.png`} alt="Logo de La Mia Pasta" />
      <span className="logo-slogan" aria-label="Menú actualizado y listísimo para pedir">
        <span className="logo-slogan__flag" aria-hidden="true">
          <span className="logo-slogan__green" />
          <span className="logo-slogan__white" />
          <span className="logo-slogan__red" />
        </span>
        <span className="logo-slogan__text">Menú actualizado y listísimo para pedir</span>
      </span>
    </>
  )
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
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.52 0 .18 5.34.18 11.89c0 2.09.55 4.13 1.59 5.92L0 24l6.38-1.67a11.87 11.87 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.17-1.24-6.15-3.45-8.41Zm-8.45 18.3h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.79.99 1.01-3.7-.23-.38a9.88 9.88 0 0 1-1.51-5.22C2.13 6.43 6.61 1.95 12.07 1.95c2.63 0 5.1 1.03 6.95 2.89a9.76 9.76 0 0 1 2.87 6.95c0 5.46-4.45 9.99-9.82 9.99Zm5.43-7.43c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.97 1.19-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.41-1.5-.89-.79-1.49-1.76-1.67-2.06-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.69-1.66-.95-2.27-.25-.59-.5-.51-.69-.52h-.59c-.2 0-.53.08-.81.38-.28.3-1.07 1.04-1.07 2.53 0 1.49 1.1 2.94 1.25 3.14.15.2 2.15 3.28 5.2 4.6.73.32 1.3.51 1.75.65.74.24 1.41.21 1.94.13.59-.09 1.78-.73 2.03-1.44.25-.71.25-1.32.18-1.44-.08-.12-.28-.2-.58-.35Z" />
    </svg>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState('Hola! Quiero hacer un pedido en La Mia Pasta.')
  const [activeMobileCategory, setActiveMobileCategory] = useState('Tradicional')
  const closeButtonRef = useRef(null)

  const mobileMenuCategories = useMemo(
    () => [
      {
        title: 'Tradicional',
        shortLabel: 'Tradicional',
        icon: '◌',
        description: 'Nuestras recetas base con sabor casero y toque italo-mexicano.',
        items: menuSections[0].items.map((item) => ({
          ...item,
          image:
            item.name === 'Spaguetti boloñesa'
              ? DISH_IMAGES.spaguettiBolognesa
              : item.name === 'Penne champiñones'
                ? DISH_IMAGES.penneChampinones
                : item.name === 'Fetuccini poblano'
                  ? DISH_IMAGES.fetucciniPoblano
                  : item.name === 'Penne chipotle'
                    ? DISH_IMAGES.penneChipotle
                    : DISH_IMAGES.macarronesCheddar,
        })),
      },
      {
        title: 'Especialidades',
        shortLabel: 'Especiales',
        icon: '✦',
        description: 'Versiones más completas y protagonistas, listas para pedir.',
        items: menuSections[1].items.map((item) => ({
          ...item,
          image:
            item.name === 'Spaguetti boloñesa con albóndigas'
              ? DISH_IMAGES.spaguettiBolognesaAlbndigas
              : item.name === 'Penne champiñones con camarones'
                ? DISH_IMAGES.penneChampinonesCamarones
                : item.name === 'Fetuccini poblano con pollo'
                  ? DISH_IMAGES.fetucciniPoblanoPollo
                  : item.name === 'Penne chipotle con chuleta ahumada'
                    ? DISH_IMAGES.penneChipotleChuleta
                    : DISH_IMAGES.macarronesCheddarTocino,
        })),
      },
      {
        title: 'Extras',
        shortLabel: 'Extras',
        icon: '✢',
        description: 'Añade proteína o queso para personalizar tu pasta.',
        items: complements[0].items,
      },
      {
        title: beverages.title,
        shortLabel: 'Bebidas',
        icon: '◒',
        description: beverages.description,
        sections: beverages.sections,
        items: beverages.sections.flatMap((section) => section.items),
      },
    ],
    [],
  )

  const activeMobileSection = mobileMenuCategories.find((category) => category.title === activeMobileCategory) ?? mobileMenuCategories[0]

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
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#contacto', label: 'Contacto' },
  ]

  const handleSendWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message.trim() || 'Hola! Quiero hacer un pedido en La Mia Pasta.')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer')
  }

  const handleNavClick = () => setMenuOpen(false)
  const openChat = () => setChatOpen(true)
  const closeChat = () => setChatOpen(false)

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
            <p className="hero__lead">
              Recetas caseras con una personalidad cuidada, elegantes a la vista y fáciles de pedir para disfrutar en casa.
            </p>

            <div className="hero__actions">
              <button className="button button--whatsapp" type="button" onClick={openChat}>
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

          <section className="about-section about-section--mobile" id="nosotros">
            <div className="section-heading section-heading--narrow">
              <p className="eyebrow">Nosotros</p>
              <h2>La esencia de La Mia Pasta vive en cada receta, en su identidad visual y en la manera cercana de compartir la mesa.</h2>
            </div>
            <div className="about-grid">
              <article className="about-card">
                <h3>Misión</h3>
                <p>{aboutContent.mission}</p>
              </article>
              <article className="about-card">
                <h3>Visión</h3>
                <p>{aboutContent.vision}</p>
              </article>
              <article className="about-card about-card--wide">
                <h3>Significado del logotipo</h3>
                <p>{aboutContent.logoMeaning}</p>
              </article>
            </div>
          </section>

          <div className="mobile-menu-experience" aria-label="Menú móvil por categorías">
            <div className="mobile-menu-experience__header">
              <p className="mobile-menu-experience__eyebrow">Categorías</p>
              <h3>Elige una categoría</h3>
            </div>

            <div className="mobile-category-tabs" role="tablist" aria-label="Categorías del menú">
              {mobileMenuCategories.map((category) => {
                const isActive = category.title === activeMobileSection.title
                return (
                  <button
                    key={category.title}
                    className={`mobile-category-tab ${isActive ? 'mobile-category-tab--active' : ''}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveMobileCategory(category.title)}
                  >
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
                {activeMobileSection.sections
                  ? activeMobileSection.sections.map((section) => (
                      <section className="mobile-menu-subsection" key={`${activeMobileSection.title}-${section.title}`}>
                        <div className="mobile-menu-subsection__header">
                          <h4>{section.title}</h4>
                          <p>{section.description}</p>
                        </div>
                        <div className="mobile-menu-cards">
                          {section.items.map((item) => (
                            <article className="mobile-menu-card" key={`${section.title}-${item.name}`}>
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
                      </section>
                    ))
                  : activeMobileSection.items.map((item) => (
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

            <section className="about-section about-section--desktop" id="nosotros-desktop">
              <div className="section-heading section-heading--narrow">
                <p className="eyebrow">Nosotros</p>
                <h2>La esencia de La Mia Pasta vive en cada receta, en su identidad visual y en la manera cercana de compartir la mesa.</h2>
              </div>
              <div className="about-grid">
                <article className="about-card">
                  <h3>Misión</h3>
                  <p>{aboutContent.mission}</p>
                </article>
                <article className="about-card">
                  <h3>Visión</h3>
                  <p>{aboutContent.vision}</p>
                </article>
                <article className="about-card about-card--wide">
                  <h3>Significado del logotipo</h3>
                  <p>{aboutContent.logoMeaning}</p>
                </article>
              </div>
            </section>

            <div className="menu-split">
              <div className="menu-side" key={complements[0].title}>
                <div className="menu-block__header">
                  <h3>{complements[0].title}</h3>
                  <p>{complements[0].description}</p>
                </div>
                <div className="menu-grid menu-grid--compact">
                  {complements[0].items.map((item) => (
                    <MenuItem item={item} key={item.name} />
                  ))}
                </div>
              </div>

              <div className="menu-side" key={beverages.title}>
                <div className="menu-block__header">
                  <h3>{beverages.title}</h3>
                  <p>{beverages.description}</p>
                </div>
                {beverages.sections.map((section) => (
                  <div className="menu-subsection" key={section.title}>
                    <div className="menu-subsection__header">
                      <h4>{section.title}</h4>
                      <p>{section.description}</p>
                    </div>
                    <div className="menu-grid menu-grid--compact">
                      {section.items.map((item) => (
                        <MenuItem item={item} key={item.name} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
                    {channel.actionType === 'whatsapp' ? (
                      <button className="button button--primary ordering-card__button" type="button" onClick={openChat}>
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
        <div className="footer__top">
          <div className="footer__brand-lockup">
            <div className="wordmark wordmark--footer" aria-hidden="true">
              <LogoMark />
            </div>
            <div className="footer__brand-copy">
              <p>Martes a domingo: 12:00pm - 8:00pm</p>
              <span className="footer__tagline" aria-label="Visítanos y pide tu favorita.">
                <span className="footer__tagline-line">Visítanos y</span>
                <span className="footer__tagline-line footer__tagline-line--accent">pide tu favorita.</span>
              </span>
            </div>
          </div>

          <section className="location-card" aria-label="Ubicación y redes sociales">
            <div className="location-card__intro">
              <div className="location-card__copy">
                <div className="location-card__hero">
                  <span className="location-card__hero-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Zm0-9.25A2.75 2.75 0 1 1 12 7.25a2.75 2.75 0 0 1 0 5.5Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="location-card__eyebrow">Encuéntranos en</p>
                    <a className="location-card__maps-link" href={LOCATION_URL} target="_blank" rel="noreferrer">
                      Google Maps
                    </a>
                  </div>
                </div>
                <span className="location-card__divider" aria-hidden="true">
                  <span />
                </span>
                <span className="location-card__note">Toca para llegar fácilmente</span>
              </div>

              <div className="location-card__map-frame-wrap">
                <iframe
                  className="location-card__map-frame"
                  title="Ubicación de La Mia Pasta en Google Maps"
                  src={GOOGLE_MAPS_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a className="location-card__map-overlay" href={LOCATION_URL} target="_blank" rel="noreferrer" aria-label="Abrir ubicación de La Mia Pasta en Google Maps">
                  <span className="location-card__map-badge">Abrir en Google Maps</span>
                </a>
              </div>
            </div>

            <div className="location-card__socials">
              <p>Síguenos en</p>
              <div className="location-card__social-grid">
                {SOCIAL_LINKS.map((social) => (
                  <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={`${social.name} de La Mia Pasta`}>
                    <span className="location-card__social-icon" aria-hidden="true">{social.icon}</span>
                    <small>{social.handle}</small>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="footer__actions">
          <a className="button button--ghost" href={PDF_MENU_PATH} target="_blank" rel="noreferrer" download={DOWNLOADABLE_MENU_FILENAME}>
            Ver menú completo
          </a>
          <button className="button button--primary" type="button" onClick={openChat}>
            Pedir ahora
          </button>
        </div>
      </footer>

      <button className="whatsapp-fab" type="button" onClick={openChat} aria-label="Abrir chat de WhatsApp">
        <span className="whatsapp-fab__pulse" />
        <WhatsAppIcon />
      </button>

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
