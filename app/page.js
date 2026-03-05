"use client";

import { useState } from "react";

export default function Home() {

  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());

    data.type_bien = formData.getAll("type_bien");
    data.delai_vente = formData.get("delai_vente");

    try {

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus("✅ Votre recommandation a bien été envoyée !");
        e.target.reset();
      } else {
        setStatus("❌ Une erreur est survenue.");
      }

    } catch {
      setStatus("❌ Impossible d'envoyer la recommandation.");
    }
  };

  return (

    <div style={container}>

      {/* BOUTONS LATERAUX */}

      <a
        href="https://www.timmos.fr"
        target="_blank"
        style={leftButton}
      >
        Nos biens
      </a>

      <a
        href="https://www.timmos.fr/estimation"
        target="_blank"
        style={rightButton}
      >
        Estimer mon bien
      </a>

      {/* LOGO */}

      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <img src="/logo.png" style={{ width: 160 }} />
      </div>

      {/* TITRE */}

      <h1 style={title}>Club TimmoS</h1>

      <p style={subtitle}>
        Apporteurs et partenaires,<br />
        et si vos recommandations étaient récompensées ?<br /><br />
        <b>300 € pour vous</b> à la signature de l'acte définitif de vente.
      </p>

      {/* FORMULAIRE */}

      <form onSubmit={handleSubmit} style={form}>

        {/* APPORTEUR */}

        <h2 style={section}>L'apporteur</h2>

        <div style={grid}>

          <input name="apporteur_nom" placeholder="Nom" required style={input}/>
          <input name="apporteur_prenom" placeholder="Prénom" required style={input}/>
          <input name="apporteur_tel" placeholder="Téléphone" required style={input}/>
          <input name="apporteur_email" type="email" placeholder="Email" required style={input}/>

        </div>

        {/* PROSPECT */}

        <h2 style={section}>Le prospect</h2>

        <div style={grid}>

          <input name="prospect_nom" placeholder="Nom" required style={input}/>
          <input name="prospect_prenom" placeholder="Prénom" required style={input}/>
          <input name="prospect_tel" placeholder="Téléphone" required style={input}/>
          <input name="prospect_email" type="email" placeholder="Email" style={input}/>

        </div>

        <input
          name="prospect_adresse"
          placeholder="Adresse du bien"
          required
          style={inputFull}
        />

        {/* TYPE */}

        <h3 style={section}>Type de bien</h3>

        <div style={checkboxGrid}>

          <label><input type="checkbox" name="type_bien" value="Maison"/> Maison</label>
          <label><input type="checkbox" name="type_bien" value="Appartement"/> Appartement</label>
          <label><input type="checkbox" name="type_bien" value="Terrain"/> Terrain</label>
          <label><input type="checkbox" name="type_bien" value="Immeuble"/> Immeuble</label>
          <label><input type="checkbox" name="type_bien" value="Commerce"/> Commerce</label>

        </div>

        {/* DELAI */}

        <h3 style={section}>Délai estimé de mise en vente</h3>

        <div style={checkboxGrid}>

          <label><input type="radio" name="delai_vente" value="Moins de 3 mois"/> -3 mois</label>
          <label><input type="radio" name="delai_vente" value="Moins de 6 mois"/> -6 mois</label>
          <label><input type="radio" name="delai_vente" value="Plus de 6 mois"/> +6 mois</label>

        </div>

        {/* COLLABORATEUR */}

        <h2 style={section}>Collaborateur TimmoS</h2>

        <select name="collaborateur" required style={inputFull}>
          <option value="">Sélectionner</option>
          <option value="nstimmos@gmail.com">Nicolas SENDID</option>
          <option value="cstimmos@gmail.com">Christel SENDID</option>
          <option value="gdstimmos@gmail.com">Gonçalo De Sousa</option>
          <option value="heloise.timmos@gmail.com">Héloïse SENDID IUNGWIRTH</option>
        </select>

        {/* RGPD */}

        <div style={rgpd}>

          <label>
            <input type="checkbox" name="rgpd" required/>
            Je confirme avoir informé le prospect de la transmission de ses données à l'agence TimmoS.
          </label>

        </div>

        {/* BOUTON */}

        <button type="submit" style={submit}>

          Envoyer la recommandation

        </button>

      </form>

      {/* STATUT */}

      <p style={statusStyle}>{status}</p>

      {/* RGPD */}

      <p style={footer}>

        Données personnelles :
        <a
          href="https://www.la-boite-immo.com/politique-de-gestion-des-donnees-personnelles"
          target="_blank"
        >
          politique de gestion
        </a>

      </p>

    </div>
  );
}

/* STYLES */

const container = {
  maxWidth: 800,
  margin: "auto",
  padding: 40,
  fontFamily: "Arial"
};

const title = {
  textAlign: "center"
};

const subtitle = {
  textAlign: "center",
  marginBottom: 40,
  color: "#444",
  fontSize: 18
};

const form = {
  background: "#fafafa",
  padding: 35,
  borderRadius: 10,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
};

const section = {
  marginTop: 30
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12
};

const checkboxGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 8,
  marginTop: 10
};

const input = {
  padding: 12,
  borderRadius: 6,
  border: "1px solid #ccc"
};

const inputFull = {
  ...input,
  width: "100%",
  marginTop: 12
};

const submit = {
  marginTop: 30,
  width: "100%",
  padding: 14,
  background: "black",
  color: "white",
  border: "none",
  borderRadius: 6,
  fontSize: 16,
  cursor: "pointer"
};

const rgpd = {
  marginTop: 25,
  fontSize: 14
};

const statusStyle = {
  textAlign: "center",
  marginTop: 20,
  fontWeight: "bold"
};

const footer = {
  textAlign: "center",
  marginTop: 40,
  fontSize: 13,
  color: "#777"
};

const leftButton = {
  position: "fixed",
  left: 20,
  top: "40%",
  background: "black",
  color: "white",
  padding: "12px 16px",
  borderRadius: 8,
  textDecoration: "none"
};

const rightButton = {
  position: "fixed",
  right: 20,
  top: "40%",
  background: "#d4af37",
  color: "black",
  padding: "12px 16px",
  borderRadius: 8,
  textDecoration: "none",
  fontWeight: "bold"
};
