"use client";

import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(ios);

    const alreadyShown = localStorage.getItem("installPromptShown");
    if (alreadyShown) return;

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    if (ios) {
      setShowInstall(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    localStorage.setItem("installPromptShown", "true");
    setShowInstall(false);
  };

  const closePrompt = () => {
    localStorage.setItem("installPromptShown", "true");
    setShowInstall(false);
  };

  if (!showInstall) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#111",
      color: "#fff",
      padding: "16px",
      borderRadius: "12px",
      zIndex: 9999,
      maxWidth: "90%",
      textAlign: "center",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
    }}>
      {isIOS ? (
        <>
          <p style={{ marginBottom: "10px" }}>
            📲 Installe l'application :
          </p>
          <p style={{ fontSize: "14px", marginBottom: "10px" }}>
            1. Appuie sur <b>Partager</b><br/>
            2. "Sur l'écran d'accueil"<br/>
            3. Ajouter
          </p>
          <button onClick={closePrompt} style={{
            background: "#fff",
            color: "#111",
            padding: "8px 14px",
            borderRadius: "8px",
            border: "none"
          }}>
            OK
          </button>
        </>
      ) : (
        <>
          <p style={{ marginBottom: "10px" }}>
            📲 Installer l'application
          </p>
          <button onClick={handleInstallClick} style={{
            background: "#fff",
            color: "#111",
            padding: "8px 14px",
            borderRadius: "8px",
            border: "none"
          }}>
            Installer
          </button>
        </>
      )}
    </div>
  );
}
