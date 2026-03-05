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

    } catch (error) {
      setStatus("❌ Impossible d'envoyer la recommandation.");
    }
  };

  return (

    <div style={{
      maxWidth: "720px",
      margin: "auto",
      padding: "40px",
      fontFamily: "Arial"
    }}>

      {/* BOUTONS LATERAUX */}

      <a
        href="https://www.timmos.fr"
        target="_blank"
        style={{
          position: "fixed",
          left: "20px",
          top: "40%",
          background: "black",
          color: "white",
          padding: "12px 16px",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "14px"
        }}
      >
        Nos biens
      </a>

      <a
        href="https://www.timmos.fr/estimation"
        target="_blank"
        style={{
          position: "fixed",
          right: "20px",
          top: "40%",
          background: "#d4af37",
          color: "black",
          padding: "12px 16px",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: "bold"
        }}
      >
        Estimer mon bien
      </a>

      {/* LOGO */}

      <div style={{ textAlign: "center", marginBottom: "25px" }}>
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
        marginBottom: "35px",
        fontSize: "18px",
        color: "#444"
      }}>
        Apporteurs et partenaires,<br />
        et si vos recommandations étaient récompensées ?<br /><br />

        <b>300 € pour vous</b> à la conclusion de l'acte définitif de vente.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#f9f9f9",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.08)"
        }}
      >

        {/* APPORTEUR */}

        <h2>L'apporteur</h2>

        <input name="apporteur_nom" placeholder="Nom" required style={inputStyle}/>
        <input name="apporteur_prenom" placeholder="Prénom" required style={inputStyle}/>
        <input name="apporteur_tel" placeholder="Téléphone" required style={inputStyle}/>
        <input name="apporteur_email" type="email" placeholder="Email" required style={inputStyle}/>

        {/* PROSPECT */}

        <h2 style={{ marginTop: "35px" }}>Le prospect</h2>

        <input name="prospect_nom" placeholder="Nom" required style={inputStyle}/>
        <input name="prospect_prenom" placeholder="Prénom" required style={inputStyle}/>
        <input name="prospect_tel" placeholder="Téléphone" required style={inputStyle}/>
        <input name="prospect_email" type="email" placeholder="Email" style={inputStyle}/>
        <input name="prospect_adresse" placeholder="Adresse du bien" required style={inputStyle}/>

        {/* TYPE BIEN */}

        <h3 style={{ marginTop: "25px" }}>Type de bien</h3>

        <label><input type="checkbox" name="type_bien" value="Maison" /> Maison</label><br/>
        <label><input type="checkbox" name="type_bien" value="Appartement" /> Appartement</label><br/>
        <label><input type="checkbox" name="type_bien" value="Terrain" /> Terrain</label><br/>
        <label><input type="checkbox" name="type_bien" value="Immeuble" /> Immeuble</label><br/>
        <label><input type="checkbox" name="type_bien" value="Commerce" /> Commerce</label>

        {/* DELAI */}

        <h3 style={{ marginTop: "25px" }}>
          Délai estimé de mise en vente
        </h3>

        <label><input type="radio" name="delai_vente" value="Moins de 3 mois" /> Moins de 3 mois</label><br/>
        <label><input type="radio" name="delai_vente" value="Moins de 6 mois" /> Moins de 6 mois</label><br/>
        <label><input type="radio" name="delai_vente" value="Plus de 6 mois" /> Plus de 6 mois</label>

        {/* COLLABORATEUR */}

        <h2 style={{ marginTop: "35px" }}>Collaborateur TimmoS</h2>

        <select name="collaborateur" required style={inputStyle}>
          <option value="">Sélectionner</option>
          <option value="nstimmos@gmail.com">Nicolas SENDID</option>
          <option value="cstimmos@gmail.com">Christel SENDID</option>
          <option value="gdstimmos@gmail.com">Gonçalo De Sousa</option>
          <option value="heloise.timmos@gmail.com">Héloïse SENDID IUNGWIRTH</option>
        </select>

        {/* RGPD */}

        <div style={{ marginTop: "25px", fontSize: "14px" }}>
          <label>
            <input type="checkbox" name="rgpd" required />
            Je confirme avoir informé le prospect que ses données sont
            transmises à l'agence TimmoS dans le cadre d'une mise en relation.
          </label>
        </div>

        {/* BOUTON */}

        <button type="submit" style={{
          marginTop: "30px",
          width: "100%",
          padding: "14px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer"
        }}>
          Envoyer la recommandation
        </button>

      </form>

      {/* STATUT */}

      <p style={{
        marginTop: "25px",
        textAlign: "center",
        fontWeight: "bold"
      }}>
        {status}
      </p>

      {/* RGPD BAS DE PAGE */}

      <p style={{
        textAlign: "center",
        marginTop: "40px",
        fontSize: "13px",
        color: "#777"
      }}>
        Données personnelles :
        <a
          href="https://www.la-boite-immo.com/politique-de-gestion-des-donnees-personnelles"
          target="_blank"
          style={{ marginLeft: "5px", color: "#777" }}
        >
          Politique de gestion des données
        </a>
      </p>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};
