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
      setStatus("✅ Votre recommandation a bien été envoyée !");
      e.target.reset();
    } else {
      setStatus("❌ Une erreur est survenue.");
    }
  };

  return (

    <div style={{
      maxWidth: "700px",
      margin: "auto",
      padding: "30px",
      fontFamily: "Arial"
    }}>

      {/* LOGO */}

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src="/logo.png" style={{ width: "160px" }} />
      </div>

      {/* TITRE */}

      <h1 style={{
        textAlign: "center",
        marginBottom: "10px"
      }}>
        Club TimmoS
      </h1>

      {/* ACCROCHE */}

      <p style={{
        textAlign: "center",
        marginBottom: "30px",
        fontSize: "18px",
        color: "#444"
      }}>
        Apporteurs et partenaires,<br />
        et si vos recommandations étaient récompensées ?<br /><br />

        <b>300 € pour vous</b> à la conclusion de l'acte définitif de vente.
      </p>

      <form onSubmit={handleSubmit} style={{
        background: "#f9f9f9",
        padding: "25px",
        borderRadius: "10px"
      }}>

        {/* APPORTEUR */}

        <h2>L'apporteur</h2>

        <input name="apporteur_nom" placeholder="Nom" required />
        <input name="apporteur_prenom" placeholder="Prénom" required />
        <input name="apporteur_tel" placeholder="Téléphone" required />
        <input name="apporteur_email" type="email" placeholder="Email" required />

        {/* PROSPECT */}

        <h2 style={{ marginTop: "30px" }}>Le prospect</h2>

        <input name="prospect_nom" placeholder="Nom" required />
        <input name="prospect_prenom" placeholder="Prénom" required />
        <input name="prospect_tel" placeholder="Téléphone" required />
        <input name="prospect_email" type="email" placeholder="Email" />
        <input name="prospect_adresse" placeholder="Adresse du bien" required />

        {/* TYPE BIEN */}

        <h3 style={{ marginTop: "20px" }}>Type de bien</h3>

        <label><input type="checkbox" name="type_bien" value="Maison" /> Maison</label><br />
        <label><input type="checkbox" name="type_bien" value="Appartement" /> Appartement</label><br />
        <label><input type="checkbox" name="type_bien" value="Terrain" /> Terrain</label><br />
        <label><input type="checkbox" name="type_bien" value="Immeuble" /> Immeuble</label><br />
        <label><input type="checkbox" name="type_bien" value="Commerce" /> Commerce</label>

        {/* DELAI */}

        <h3 style={{ marginTop: "20px" }}>
          Délai estimé de mise en vente
        </h3>

        <label><input type="radio" name="delai_vente" value="Moins de 3 mois" /> Moins de 3 mois</label><br />
        <label><input type="radio" name="delai_vente" value="Moins de 6 mois" /> Moins de 6 mois</label><br />
        <label><input type="radio" name="delai_vente" value="Plus de 6 mois" /> Plus de 6 mois</label>

        {/* COLLABORATEUR */}

        <h2 style={{ marginTop: "30px" }}>Collaborateur TimmoS</h2>

        <select name="collaborateur" required>
          <option value="">Sélectionner</option>
          <option value="nstimmos@gmail.com">Nicolas SENDID</option>
          <option value="cstimmos@gmail.com">Christel SENDID</option>
          <option value="gdstimmos@gmail.com">Gonçalo De Sousa</option>
          <option value="heloise.timmos@gmail.com">Héloïse SENDID IUNGWIRTH</option>
        </select>

        {/* RGPD */}

        <div style={{ marginTop: "20px", fontSize: "14px" }}>
          <label>
            <input type="checkbox" name="rgpd" required />
            Je confirme avoir informé le prospect que ses données sont
            transmises à l'agence TimmoS dans le cadre d'une mise en relation.
          </label>
        </div>

        {/* BOUTON */}

        <button type="submit" style={{
          marginTop: "25px",
          width: "100%",
          padding: "12px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px"
        }}>
          Envoyer la recommandation
        </button>

      </form>

      <p style={{
        marginTop: "20px",
        textAlign: "center",
        fontWeight: "bold"
      }}>
        {status}
      </p>

    </div>
  );
}
