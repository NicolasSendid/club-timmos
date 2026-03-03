
"use client";
import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    if (res.ok) {
      setStatus("Demande envoyée avec succès.");
      e.target.reset();
    } else {
      setStatus("Erreur lors de l'envoi.");
    }
  }

  return (
    <div className="container">
      <h1>Club Apporteurs Timmos</h1>
      <p>300€ par apport d'affaires payé après signature définitive.</p>
      <form onSubmit={handleSubmit}>
        <input name="apporteur_nom" placeholder="Votre nom" required />
        <input name="apporteur_email" placeholder="Votre email" required />
        <input name="apporteur_tel" placeholder="Votre téléphone" required />
        <textarea name="contact_recommande" placeholder="Coordonnées de la personne recommandée" required />
        <button type="submit">Envoyer</button>
      </form>
      <p>{status}</p>
    </div>
  );
}
