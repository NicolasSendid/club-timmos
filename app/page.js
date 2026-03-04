
"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (res.ok) {
      setStatus("✅ Votre recommandation a bien été envoyée.");
      e.target.reset();
    } else {
      setStatus("❌ Une erreur est survenue.");
    }
  }

  return (
    <div className="container">
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <Image src="/logo.png" alt="TimmoS" width={180} height={180} />
        <h1>Club TimmoS</h1>
        <p>Apporteurs et Partenaires, recevez 300€ pour vos recommandations à la conclusion de l'acte définitif de vente!</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input name="apporteur_nom" placeholder="Votre nom" required />
        <input name="apporteur_email" placeholder="Votre email" required />
        <input name="apporteur_tel" placeholder="Votre téléphone" required />
      </div>

      <form onSubmit={handleSubmit}>
        <input name="prospect_nom" placeholder="Nom de la personne recommandée" required />
        <input name="prospect_email" placeholder="Email de la personne recommandée" required />
        <input name="prospect_tel" placeholder="Téléphone de la personne recommandée" required />
        <input name="prospect_adresse" placeholder="Adresse de la personne recommandée" required />
        />
        <button type="submit">Envoyer la recommandation</button>
      </form>

      <p style={{ marginTop: "20px", textAlign: "center" }}>{status}</p>
    </div>
  );
}
