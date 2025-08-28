import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="alternate icon" href="/logo.svg" />
        <link rel="mask-icon" href="/logo.svg" color="#006633" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        <meta name="description" content="GatorEx - The Future of Student Commerce. Connecting University of Florida students through a secure, verified marketplace." />
        <meta name="keywords" content="UF, University of Florida, student marketplace, textbooks, furniture, electronics" />
        <meta name="author" content="GatorEx Team" />
        <meta property="og:title" content="GatorEx - UF Student Marketplace" />
        <meta property="og:description" content="Connecting University of Florida students through a secure, verified marketplace designed exclusively for the Gator community." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GatorEx - UF Student Marketplace" />
        <meta name="twitter:description" content="Connecting University of Florida students through a secure, verified marketplace designed exclusively for the Gator community." />
        <meta name="twitter:image" content="/logo.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}