"use client";
import { useState } from "react";

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
        <img src="/logo.png" alt="TimmoS" style={{ width: "200px" }} />
        <h1>Club Apporteurs TimmoS</h1>
        <p>Recevez 300€ par recommandation conclue.</p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* L'APPORTEUR */}
        <h2 style={{ marginTop: "30px" }}>L'apporteur</h2>

        <input name="apporteur_nom" placeholder="Nom" required />
        <input name="apporteur_prenom" placeholder="Prénom" required />
        <input name="apporteur_tel" placeholder="Téléphone" required />
        <input name="apporteur_email" type="email" placeholder="Email" required />

        {/* VOTRE RECOMMANDATION */}
        <h2 style={{ marginTop: "30px" }}>Votre recommandation</h2>

        <input name="prospect_nom" placeholder="Nom" required />
        <input name="prospect_prenom" placeholder="Prénom" required />
        <input name="prospect_tel" placeholder="Téléphone" required />
        <input name="prospect_email" type="email" placeholder="Email" />
        <input name="prospect_adresse" placeholder="Adresse du bien" required />
   <textarea
          name="Infos_bien"
          placeholder="Informations sur le bien"
          required

        {/* COLLABORATEUR */}
        <h2 style={{ marginTop: "30px" }}>Collaborateur en charge</h2>

        <select name="collaborateur" required>
          <option value="">Sélectionner un collaborateur</option>
          <option value="nstimmos@gmail.com">Nicolas SENDID</option>
          <option value="cstimmos@gmail.com">Christel SENDID</option>
          <option value="gdstimmos@gmail.com">Gonçalo De Sousa</option>
          <option value="heloise.timmos@gmail.com">Héloïse SENDID IUNGWIRTH</option>
        </select>

        {/* RGPD */}
        <div style={{ marginTop: "20px" }}>
          <label style={{ fontSize: "14px" }}>
            <input type="checkbox" name="rgpd" required />  
            Je confirme avoir informé le prospect que ses données sont transmises 
            à l'agence TimmoS dans le cadre d'une mise en relation commerciale.
          </label>
        </div>

        <button type="submit">Envoyer la recommandation</button>
      </form>

      <p style={{ marginTop: "20px", textAlign: "center" }}>{status}</p>
    </div>
  );
}
