```javascript
"use client";

import { useState, useEffect } from "react";

export default function Home() {

  const [status, setStatus] = useState("");
  const [count, setCount] = useState(null);

  useEffect(() => {

    fetch("https://script.google.com/macros/s/AKfycbz_UoC0p1_dLLOVtzEBsGSh1jtyhk-4oE76ashJlmi4kD7et3y3LHfeLM0I3G1bSbX1/exec?action=count")
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
      })
      .catch(() => {});

  }, []);

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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {

        setStatus("✅ Votre recommandation a bien été envoyée !");
        setCount(count + 1);
        e.target.reset();

        let phone = "";

        if (data.collaborateur === "nstimmos@gmail.com") phone = "33624383273";
        if (data.collaborateur === "cstimmos@gmail.com") phone = "33634521079";
        if (data.collaborateur === "gdstimmos@gmail.com") phone = "33628597844";
        if (data.collaborateur === "heloise.timmos@gmail.com") phone = "33625888922";

        const message = encodeURIComponent(
`Nouvelle recommandation Club TimmoS

Apporteur :
${data.apporteur_prenom} ${data.apporteur_nom}
${data.apporteur_tel}

Prospect :
${data.prospect_prenom} ${data.prospect_nom}
${data.prospect_tel}

Adresse :
${data.prospect_adresse}

Type de bien :
${data.type_bien.join(", ")}

Délai estimé :
${data.delai_vente}`
        );

        window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

      } else {
        setStatus("❌ Une erreur est survenue.");
      }

    } catch (error) {
      setStatus("❌ Impossible d'envoyer la recommandation.");
    }
  };

  return (

    <div style={{
      maxWidth: "700px",
      margin: "auto",
      padding: "30px",
      fontFamily: "Arial"
    }}>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src="/logo.png" style={{ width: "160px" }} />
      </div>

      {count !== null && count >= 30 && (

        <div style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "18px",
          color: "#444"
        }}>
          ⭐ Déjà <b>{count}</b> recommandations reçues
        </div>

      )}

      <h1 style={{
        textAlign: "center",
        marginBottom: "10px"
      }}>
        Club TimmoS
      </h1>

      <p style={{
        textAlign: "center",
        marginBottom: "30px",
        fontSize: "18px",
        color: "#444"
      }}>
        Apporteurs et partenaires,<br />
        et si vos recommandations étaient récompensées ?<br /><br />

        <b>300 € pour vous</b> à la conclusion de l'acte définitif de vente*.
      </p>

      <form onSubmit={handleSubmit} style={{
        background: "#f9f9f9",
        padding: "25px",
        borderRadius: "10px"
      }}>

        <h2>L'apporteur</h2>

        <input name="apporteur_nom" placeholder="Nom" required />
        <input name="apporteur_prenom" placeholder="Prénom" required />
        <input name="apporteur_tel" placeholder="Téléphone" required />
        <input name="apporteur_email" type="email" placeholder="Email" required />

        <h2 style={{ marginTop: "30px" }}>Le prospect</h2>

        <input name="prospect_nom" placeholder="Nom" required />
        <input name="prospect_prenom" placeholder="Prénom" required />
        <input name="prospect_tel" placeholder="Téléphone" required />
        <input name="prospect_email" type="email" placeholder="Email" />
        <input name="prospect_adresse" placeholder="Adresse du bien" required />

        <h3 style={{ marginTop: "20px" }}>Type de bien</h3>

        <label><input type="checkbox" name="type_bien" value="Maison" /> Maison</label><br />
        <label><input type="checkbox" name="type_bien" value="Appartement" /> Appartement</label><br />
        <label><input type="checkbox" name="type_bien" value="Terrain" /> Terrain</label><br />
        <label><input type="checkbox" name="type_bien" value="Immeuble" /> Immeuble</label><br />
        <label><input type="checkbox" name="type_bien" value="Commerce" /> Commerce</label>

        <h3 style={{ marginTop: "20px" }}>
          Délai estimé de mise en vente
        </h3>

        <label><input type="radio" name="delai_vente" value="Moins de 3 mois" /> Moins de 3 mois</label><br />
        <label><input type="radio" name="delai_vente" value="Moins de 6 mois" /> Moins de 6 mois</label><br />
        <label><input type="radio" name="delai_vente" value="Plus de 6 mois" /> Plus de 6 mois</label>

        <h2 style={{ marginTop: "30px" }}>Collaborateur TimmoS</h2>

        <select name="collaborateur" required>
          <option value="">Sélectionner</option>
          <option value="nstimmos@gmail.com">Nicolas SENDID</option>
          <option value="cstimmos@gmail.com">Christel SENDID</option>
          <option value="gdstimmos@gmail.com">Gonçalo De Sousa</option>
          <option value="heloise.timmos@gmail.com">Héloïse SENDID IUNGWIRTH</option>
        </select>

        <div style={{ marginTop: "20px", fontSize: "14px" }}>
          <label>
            <input type="checkbox" name="rgpd" required />
            Je confirme avoir informé le prospect que ses données sont
            transmises à l'agence TimmoS dans le cadre d'une mise en relation.
          </label>
        </div>

        <div style={{
          marginTop: "20px",
          fontSize: "12px",
          color: "#666",
          lineHeight: "1.6"
        }}>
          <b>Conditions de la recommandation :</b><br/>
          • La prime de 300 € est versée uniquement en cas de signature de l'acte authentique de vente.<br/>
          • Le prospect recommandé ne doit pas être déjà connu de l'agence TimmoS.<br/>
          • La recommandation doit être faite avant toute prise de contact avec l'agence.<br/>
          • La recommandation doit être concrétisée par la signature d'un mandat de vente avec l'agence TimmoS dans un délai de 12 mois suivant la recommandation.<br/>
          • Le versement intervient après encaissement des honoraires d'agence.<br/>
          • L'agence TimmoS se réserve le droit de refuser une recommandation ne respectant pas ces conditions.
        </div>

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

      <div style={{
        marginTop: "30px",
        textAlign: "center",
        fontSize: "12px",
        color: "#777",
        lineHeight: "1.6"
      }}>
        * La prime d'apport d'affaires de 300 € est versée sous réserve de la signature d'un mandat de vente avec l'agence TimmoS dans les 12 mois suivant la recommandation et de la signature de l'acte authentique de vente. Le prospect recommandé ne doit pas être déjà connu de l'agence. Le versement intervient après encaissement des honoraires d'agence.
      </div>

      <div style={{
        marginTop: "40px",
        textAlign: "center"
      }}>

        <p style={{ fontWeight: "bold" }}>Suivez-nous</p>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "18px",
          marginTop: "12px"
        }}>

          <a href="https://share.google/PVYCH20aRFheURVs8" target="_blank">
            <img src="https://cdn.simpleicons.org/google/000000" width="26"/>
          </a>

          <a href="https://www.facebook.com/TimmosBatignolles" target="_blank">
            <img src="https://cdn.simpleicons.org/facebook/000000" width="26"/>
          </a>

          <a href="https://www.instagram.com/timmosai/" target="_blank">
            <img src="https://cdn.simpleicons.org/instagram/000000" width="26"/>
          </a>

          <a href="https://www.tiktok.com/@timmos" target="_blank">
            <img src="https://cdn.simpleicons.org/tiktok/000000" width="26"/>
          </a>

          <a href="https://www.linkedin.com/company/timmos/posts/?feedView=all" target="_blank">
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg" width="26"/>
          </a>

        </div>

      </div>

      <div style={{
        textAlign: "center",
        marginTop: "40px",
        fontSize: "12px",
        color: "#777"
      }}>
        <a
          href="https://www.la-boite-immo.com/politique-de-gestion-des-donnees-personnelles"
          target="_blank"
          style={{ color: "#777", textDecoration: "none" }}
        >
          Politique de confidentialité et RGPD
        </a>
      </div>

      <div style={{
        textAlign: "center",
        marginTop: "10px",
        fontSize: "12px"
      }}>
        <a
          href="https://www.timmos.fr/mentions-legales"
          target="_blank"
          style={{ color: "#777", textDecoration: "none" }}
        >
          Mentions légales
        </a>
      </div>

    </div>
  );
}
