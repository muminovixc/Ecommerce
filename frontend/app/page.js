import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <h1>🛍️ Ecommerce</h1>
          </div>
          <ul className={styles.navLinks}>
            <li><Link href="/login">Login</Link></li>
           
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Dobrodošli u najvecu webtrgovinu knjiga</h1>
          <p className={styles.heroSubtitle}>
            Pronađite najbolje proizvode po najboljim cijenama
          </p>
          <div className={styles.heroButtons}>
            <Link href="/login" className={styles.primaryButton}>
              Pregledaj proizvode
            </Link>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🚚</div>
            <h3>Brza dostava</h3>
            <p>Besplatna dostava za narudžbe preko 200 kn</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h3>Sigurna kupnja</h3>
            <p>Vaši podaci su sigurni i zaštićeni</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💳</div>
            <h3>Različiti načini plaćanja</h3>
            <p>Plaćanje gotovinom, karticom ili online</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>↩️</div>
            <h3>Lako vraćanje</h3>
            <p>Mogućnost vraćanja proizvoda u roku od 30 dana</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Ecommerce. Sva prava pridržana.</p>
      </footer>
    </div>
  )
}

