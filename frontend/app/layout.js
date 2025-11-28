import './globals.css'

export const metadata = {
  title: 'Ecommerce Shop',
  description: 'Moderna ecommerce aplikacija',
}

export default function RootLayout({ children }) {
  return (
    <html lang="hr">
      <body>{children}</body>
    </html>
  )
}

