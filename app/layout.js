export const metadata = {
  title: "Club Timmos",
  description: "Programme Apporteurs d'Affaires - TimmoS",
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
