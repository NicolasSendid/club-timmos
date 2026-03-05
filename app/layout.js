export const metadata = {
  title: "Club TimmoS",
  description: "Programme Apporteurs d'Affaires - TimmoS",
  manifest: "/manifest.json",
  themeColor: "#111111"
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
