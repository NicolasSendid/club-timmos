"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const types = formData.getAll("type_bien");
    const data = Object.fromEntries(formData.entries());
    data.type_bien = types;

    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setStatus("Demande envoyée avec succès !");
      e.target.reset();
    } else {
      setStatus("Erreur lors de l'envoi.");
    }
  };

    return (
    <div className="container">
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <Image src="/logo.png" alt="TimmoS" width={180} height={180} />
        <h1>Club Apporteurs TimmoS</h1>
        <p>Apporteurs et Partenaires, vos recommandations sont recompensees a l'acte définitif de vente.</p>
      </div>

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

        <h3 style={{ marginTop: "20px" }}>Type de bien</h3>

        <div style={{ marginTop: "10px" }}>
          <label><input type="checkbox" name="type_bien" value="Maison" /> Maison</label><br />
          <label><input type="checkbox" name="type_bien" value="Appartement" /> Appartement</label><br />
          <label><input type="checkbox" name="type_bien" value="Terrain" /> Terrain</label><br />
          <label><input type="checkbox" name="type_bien" value="Immeuble" /> Immeuble</label><br />
          <label><input type="checkbox" name="type_bien" value="Commerce" /> Commerce</label>
        </div>

        <h3 style={{ marginTop: "20px" }}>
          Délai estimé de mise en vente (facultatif)
        </h3>

        <div style={{ marginTop: "10px" }}>
          <label><input type="radio" name="delai_vente" value="Moins de 3 mois" /> Moins de 3 mois</label><br />
          <label><input type="radio" name="delai_vente" value="Moins de 6 mois" /> Moins de 6 mois</label><br />
          <label><input type="radio" name="delai_vente" value="Plus de 6 mois" /> Plus de 6 mois</label>
        </div>

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

        <button type="submit" style={{ marginTop: "20px" }}>
          Envoyer la recommandation
        </button>

      </form>

      <p style={{ marginTop: "20px", textAlign: "center" }}>
        {status}
      </p>
    </div>
  );
}
