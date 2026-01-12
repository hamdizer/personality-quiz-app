import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Discover your unique personality type with our interactive quiz"
        />
        <meta
          name="keywords"
          content="personality quiz, personality test, self-discovery"
        />
        <meta
          property="og:title"
          content="Personality Quiz - Discover Your True Self"
        />
        <meta
          property="og:description"
          content="Take our personality quiz to discover your unique personality type"
        />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
