import './App.css'

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
      {
        name: 'Spaguetti boloñesa',
        description: '300 g de pasta fresca con 8 oz de salsa boloñesa, pan y queso parmesano.',
        price: '$130',
      },
      {
        name: 'Penne champiñones',
        description: '300 g de pasta fresca con salsa cremosa de champiñones, pan y parmesano.',
        price: '$130',
      },
      {
        name: 'Fetuccini poblano',
        description: '300 g de pasta fresca con salsa de chile poblano, pan y parmesano.',
        price: '$130',
      },
      {
        name: 'Penne chipotle',
        description: '300 g de pasta fresca con salsa chipotle, pan y parmesano.',
        price: '$130',
      },
      {
        name: 'Macarrones cheddar',
        description: '300 g de pasta fresca con salsa cheddar, pan y parmesano.',
        price: '$130',
      },
    ],
  },
  {
    title: 'Especialidades',
    description: 'Platos más completos con proteína y más protagonismo visual.',
    items: [
      {
        name: 'Spaguetti boloñesa con albóndigas',
        description: 'Pasta fresca, salsa boloñesa, albóndigas, pan, parmesano y perejil.',
        price: '$160',
      },
      {
        name: 'Penne champiñones con camarones',
        description: 'Pasta fresca, salsa de champiñones, camarones, pan, parmesano y perejil.',
        price: '$170',
      },
      {
        name: 'Fetuccini poblano con pollo',
        description: 'Pasta fresca, salsa poblana, pollo, pan, parmesano y perejil.',
        price: '$160',
      },
      {
        name: 'Penne chipotle con chuleta ahumada',
        description: 'Pasta fresca, salsa chipotle, chuleta ahumada, pan, parmesano y perejil.',
        price: '$160',
      },
      {
        name: 'Macarrones cheddar con tocino',
        description: 'Pasta fresca, salsa cheddar, tocino, pan, parmesano y perejil.',
        price: '$160',
      },
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
  return (
    <div className="site-shell">
      <header className="hero">
        <nav className="topbar">
          <a className="wordmark" href="#inicio" aria-label="Ir al inicio">
            <LogoMark />
          </a>
          <div className="nav-links">
            <a href="#platillos">Platillos</a>
            <a href="#menu">Menú</a>
            <a href="#contacto">Contacto</a>
          </div>
        </nav>

        <div className="hero__content" id="inicio">
          <div className="hero__text">
            <p className="eyebrow">Pasión por la pasta</p>
            <h1>Una presentación más limpia, visual y antojable para La Mia Pasta.</h1>
            <p className="hero__lead">
              Simplificamos el discurso, reducimos ruido visual y ponemos la atención donde debe estar: marca, platillos y deseo de compra.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#platillos">
                Ver platillos
              </a>
              <a className="button button--secondary" href="#menu">
                Ver menú completo
              </a>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__logo-card">
              <LogoMark />
            </div>
            <div className="hero__note">
              <span>Identidad más consistente</span>
              <p>Menos tipografías, más aire y una presencia visual que acompaña mejor el logo.</p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="section dishes" id="platillos">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Platillos destacados</p>
            <h2>Imágenes primero, texto justo y una sensación mucho más comercial.</h2>
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
            <p className="eyebrow">Dirección visual</p>
            <h2>El logo ya tiene personalidad. El sitio ahora la acompaña en vez de competir con ella.</h2>
          </div>
          <div className="brand-strip__points">
            <span>Una sola línea visual principal</span>
            <span>Más espacio en blanco</span>
            <span>Más protagonismo del producto</span>
          </div>
        </section>

        <section className="section menu-section" id="menu">
          <div className="section-heading">
            <p className="eyebrow">Menú</p>
            <h2>Una carta clara, ordenada y lista para enseñarse.</h2>
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
          <span>Presentación conceptual con imágenes públicas temporales para mostrar intención visual.</span>
        </div>
      </footer>
    </div>
  )
}

export default App
