// app/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Chargement de Mediapipe Hands + Camera depuis CDN */}
        <script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"
          defer
        />
        <script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"
          defer
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
