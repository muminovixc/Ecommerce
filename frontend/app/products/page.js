import Link from 'next/link'
import styles from '../page.module.css'

export default function Products() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">
              <h1>🛍️ Ecommerce</h1>
            </Link>
          </div>
          <ul className={styles.navLinks}>
            <li><Link href="/">Početna</Link></li>
            <li><Link href="/products">Proizvodi</Link></li>
            <li><Link href="/about">O nama</Link></li>
            <li><Link href="/contact">Kontakt</Link></li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Naši proizvodi</h1>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>
            Ovdje će biti prikazani proizvodi...
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Ecommerce. Sva prava pridržana.</p>
      </footer>
    </div>
  )
}

