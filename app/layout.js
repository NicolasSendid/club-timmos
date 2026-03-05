import './globals.css';
import InstallPrompt from "./InstallPrompt";

export const metadata = {
  title: "Club TimmoS",
  description: "Programme Apporteurs d'Affaires - TimmoS",
  manifest: "/manifest.json",
  themeColor: "#111111"
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <InstallPrompt />
      </body>
    </html>
  );
}
