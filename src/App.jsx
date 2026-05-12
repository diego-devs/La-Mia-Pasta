import './App.css'

const basics = [
  {
    name: 'Spaguetti boloñesa',
    description:
      '300 g de pasta fresca acompañada de 8 oz de salsa boloñesa, una pieza de pan y queso parmesano.',
    price: '$130',
  },
  {
    name: 'Penne champiñones',
    description:
      '300 g de pasta fresca acompañada de 8 oz de salsa de champiñones, una pieza de pan y queso parmesano.',
    price: '$130',
  },
  {
    name: 'Fetuccini poblano',
    description:
      '300 g de pasta fresca acompañada de 8 oz de salsa de chile poblano, una pieza de pan y queso parmesano.',
    price: '$130',
  },
  {
    name: 'Penne chipotle',
    description:
      '300 g de pasta fresca acompañada de 8 oz de salsa de chipotle, una pieza de pan y queso parmesano. Ideal para quienes disfrutan un toque picante.',
    price: '$130',
  },
  {
    name: 'Macarrones cheddar',
    description:
      '300 g de pasta fresca acompañada de 8 oz de salsa de queso cheddar, una pieza de pan y queso parmesano.',
    price: '$130',
  },
]

const specialties = [
  {
    name: 'Spaguetti boloñesa con albóndigas',
    description:
      '300 g de pasta fresca, 8 oz de salsa boloñesa, 80 g de proteína, pan, queso parmesano y perejil.',
    price: '$160',
  },
  {
    name: 'Penne champiñones con camarones',
    description:
      '300 g de pasta fresca, 8 oz de salsa de champiñones, 80 g de proteína, pan, queso parmesano y perejil.',
    price: '$170',
  },
  {
    name: 'Fetuccini poblano con pollo',
    description:
      '300 g de pasta fresca, 8 oz de salsa de chile poblano, 80 g de proteína, pan, queso parmesano y perejil.',
    price: '$160',
  },
  {
    name: 'Penne chipotle con chuleta ahumada',
    description:
      '300 g de pasta fresca, 8 oz de salsa de chipotle, 80 g de proteína, pan, queso parmesano y perejil. Con ese punto ahumado y picante que distingue a la casa.',
    price: '$160',
  },
  {
    name: 'Macarrones cheddar con tocino',
    description:
      '300 g de pasta fresca, 8 oz de salsa de queso cheddar, 80 g de proteína, pan, queso parmesano y perejil.',
    price: '$160',
  },
]

const drinks = [
  { name: 'Refrescos', description: 'Coca-Cola, Fanta, Sidral Mundet y agua mineral Peñafiel.', price: '$40' },
  { name: 'Aguas artesanales', description: 'Jamaica, horchata y limón con chía.', price: '$35' },
]

const extras = [
  { name: 'Extra de proteína', description: 'Camarones, pollo, albóndigas, chuleta ahumada o tocino.', price: '$40' },
  { name: 'Extra de queso parmesano', description: 'El complemento perfecto para terminar el plato.', price: '$35' },
]

const features = [
  {
    title: 'Pasta fresca hecha por ellos',
    text: 'La Mia Pasta produce su propia pasta para asegurar textura, frescura y una experiencia artesanal en cada plato.',
  },
  {
    title: 'Fusión México-Italiana',
    text: 'La propuesta mezcla cortes tradicionales italianos con ingredientes y salsas inspiradas en sabores mexicanos.',
  },
  {
    title: 'Línea de pasta seca con personalidad',
    text: 'Además del menú preparado, la marca proyecta una línea de pasta seca con sabores como espinaca, remolacha y chile poblano.',
  },
]

function MenuCard({ item }) {
  return (
    <article className="menu-card">
      <div className="menu-card__top">
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
          <div className="brand-mark">
            <div className="brand-mark__seal">✦</div>
            <div>
              <p className="eyebrow">LA MIA PASTA</p>
              <span>Pasión por la pasta</span>
            </div>
          </div>
          <div className="nav-links">
            <a href="#menu">Menú</a>
            <a href="#story">Nuestra esencia</a>
            <a href="#contacto">Contacto</a>
          </div>
        </nav>

        <div className="hero__content">
          <div className="hero__text">
            <p className="eyebrow">Fusión México-Italiana</p>
            <h1>Pasta artesanal con alma italiana y sabores profundamente mexicanos.</h1>
            <p className="hero__lead">
              Un demo visual para presentar una marca de comida casera que transforma ingredientes mexicanos en una experiencia de pasta fresca, cálida y memorable.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#menu">
                Ver menú
              </a>
              <a className="button button--ghost" href="#story">
                Conocer la marca
              </a>
            </div>
          </div>

          <div className="hero__card">
            <div className="plate plate--main">
              <span className="plate__label">Especialidad de la casa</span>
              <h2>Fetuccini poblano</h2>
              <p>
                Pasta fresca con salsa cremosa de chile poblano, terminada con parmesano. Una mezcla elegante entre comfort food y cocina de autor casera.
              </p>
            </div>
            <div className="plate plate--accent">
              <span className="plate__label">Próximamente</span>
              <h3>Pasta seca de sabores</h3>
              <p>Espinaca, remolacha, chile poblano y otras fusiones para llevar la marca a más mesas.</p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="section intro-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </section>

        <section className="section story" id="story">
          <div className="story__text">
            <p className="eyebrow">Nuestra esencia</p>
            <h2>Tradición, precisión artesanal y una identidad que se siente propia.</h2>
            <p>
              La Mia Pasta nace desde la idea de unir la tradición italiana con ingredientes representativos de México. Su identidad parte de un sello florentino: simetría, orden, detalle y herencia artesanal.
            </p>
            <p>
              La marca busca ofrecer una experiencia gastronómica auténtica, fresca y creativa. No solo vende platos de pasta: propone una cocina reconocible, hecha con dedicación, calidad y una visión muy clara de producto.
            </p>
          </div>
          <div className="story__panel">
            <div className="seal-showcase">
              <div className="seal-showcase__icon">✺</div>
              <h3>Sello Florentino</h3>
              <p>
                Un emblema que comunica perfección, tradición y cuidado en cada detalle, evocando cortes clásicos de pasta y la belleza ornamental italiana.
              </p>
            </div>
          </div>
        </section>

        <section className="section mission-grid">
          <article className="mission-card">
            <p className="eyebrow">Misión</p>
            <p>
              Crear experiencias gastronómicas únicas mediante la fusión de cocina italiana y mexicana, elaborando pastas propias con ingredientes de alta calidad, sabores auténticos y opciones creativas que también puedan sentirse saludables.
            </p>
          </article>
          <article className="mission-card">
            <p className="eyebrow">Visión</p>
            <p>
              Posicionarse como una marca referente en pasta artesanal en México, reconocida por su innovación, frescura y originalidad, llevando sabores mexicanos a más hogares sin perder la esencia tradicional italiana.
            </p>
          </article>
        </section>

        <section className="section menu-section" id="menu">
          <div className="section-heading">
            <p className="eyebrow">Menú</p>
            <h2>Sabores que ya cuentan su historia desde el primer bocado.</h2>
            <p>
              Tomamos como base el menú actual para construir una experiencia web elegante, apetecible y lista para convertirse después en un sitio más completo.
            </p>
          </div>

          <div className="menu-block">
            <div className="menu-block__header">
              <h3>Básicas</h3>
              <p>Las combinaciones más directas y antojables del menú actual.</p>
            </div>
            <div className="menu-grid">
              {basics.map((item) => (
                <MenuCard item={item} key={item.name} />
              ))}
            </div>
          </div>

          <div className="menu-block">
            <div className="menu-block__header">
              <h3>Especialidades</h3>
              <p>Platos con proteína y perfiles más intensos para una experiencia más completa.</p>
            </div>
            <div className="menu-grid">
              {specialties.map((item) => (
                <MenuCard item={item} key={item.name} />
              ))}
            </div>
          </div>

          <div className="menu-split">
            <div>
              <div className="menu-block__header">
                <h3>Bebidas</h3>
              </div>
              <div className="menu-grid menu-grid--compact">
                {drinks.map((item) => (
                  <MenuCard item={item} key={item.name} />
                ))}
              </div>
            </div>
            <div>
              <div className="menu-block__header">
                <h3>Extras</h3>
              </div>
              <div className="menu-grid menu-grid--compact">
                {extras.map((item) => (
                  <MenuCard item={item} key={item.name} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section showcase-band">
          <div>
            <p className="eyebrow">Lo que vende esta propuesta</p>
            <h2>Una marca casera, refinada y distinta dentro de la comida italiana en México.</h2>
          </div>
          <p>
            Esta primera demo propone una dirección visual cálida, artesanal y contemporánea. En cuanto compartas el logo y los materiales visuales, puedo aterrizar todavía mejor color, tipografía, iconografía y layout final.
          </p>
        </section>
      </main>

      <footer className="footer" id="contacto">
        <div>
          <p className="eyebrow">LA MIA PASTA</p>
          <h3>Pasión por la pasta</h3>
          <p>Demo conceptual listo para afinar con logo, menú final en diseño y activos reales de la marca.</p>
        </div>
        <div className="footer__contact">
          <span>Fusión México-Italiana</span>
          <span>Pasta fresca artesanal</span>
          <span>Ideal para venta directa y pasta seca de sabores</span>
        </div>
      </footer>
    </div>
  )
}

export default App
