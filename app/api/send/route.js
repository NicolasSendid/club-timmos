import nodemailer from "nodemailer";

export async function POST(req) {

  const data = await req.json();

  // sécurisation
  const types = Array.isArray(data.type_bien) ? data.type_bien : [];
  const typeBien = types.length ? types.join(", ") : "Non précisé";
  const delai = data.delai_vente || "Non précisé";

  // numéro dossier
  const dossier = "TIM-" + Date.now();

  // date lisible
  const date = new Date().toLocaleString("fr-FR");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // EMAIL AGENCE

  const mailAgence = {
    from: process.env.SMTP_USER,
    to: [
      "timmosbatignolles@gmail.com",
      data.collaborateur
    ],
    subject: "Nouvel apport d'affaire - " + dossier,
    text: `

NOUVEL APPORT D'AFFAIRE

Numéro dossier : ${dossier}
Date : ${date}

=====================
APPORTEUR
=====================

Nom : ${data.apporteur_nom}
Prénom : ${data.apporteur_prenom}
Téléphone : ${data.apporteur_tel}
Email : ${data.apporteur_email}

=====================
PROSPECT
=====================

Nom : ${data.prospect_nom}
Prénom : ${data.prospect_prenom}
Téléphone : ${data.prospect_tel}
Email : ${data.prospect_email || "Non renseigné"}

Adresse du bien :
${data.prospect_adresse}

Type de bien :
${typeBien}

Délai estimé de mise en vente :
${delai}

`
  };

  // EMAIL APPORTEUR

  const mailApporteur = {
    from: process.env.SMTP_USER,
    to: data.apporteur_email,
    subject: "Votre recommandation a bien été enregistrée",
    text: `

Bonjour ${data.apporteur_prenom} ${data.apporteur_nom},

Merci pour votre recommandation.

Votre dossier a bien été enregistré sous le numéro :

${dossier}

Notre équipe va prendre contact avec votre prospect dans les meilleurs délais.

Nous vous rappelons que la rémunération prévue est de 300€ versés après la signature de l'acte authentique de vente.

L'équipe TimmoS

`
  };

  try {

    // envoi emails
    await transporter.sendMail(mailAgence);
    await transporter.sendMail(mailApporteur);

    // ENVOI GOOGLE SHEETS

    await fetch("https://script.google.com/macros/s/AKfycbwHNXgEBdqX6mH_T78kYKh0y42NJu5lbKRfGRs-ddON1iE5RWxoq4xpK6wS4SvBXAk_/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: date,
        dossier: dossier,
        apporteur_nom: data.apporteur_nom,
        apporteur_prenom: data.apporteur_prenom,
        apporteur_tel: data.apporteur_tel,
        apporteur_email: data.apporteur_email,
        prospect_nom: data.prospect_nom,
        prospect_prenom: data.prospect_prenom,
        prospect_tel: data.prospect_tel,
        prospect_email: data.prospect_email,
        prospect_adresse: data.prospect_adresse,
        type_bien: typeBien,
        delai_vente: delai,
        collaborateur: data.collaborateur
      })
    });

    return Response.json({ success: true });

  } catch (error) {

    console.error(error);

    return Response.json(
      { success: false },
      { status: 500 }
    );

  }
}
