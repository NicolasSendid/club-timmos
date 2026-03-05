import nodemailer from "nodemailer";

export async function POST(req) {

  const data = await req.json();

  // sécurisation des champs
  const types = Array.isArray(data.type_bien) ? data.type_bien : [];
  const typeBien = types.length ? types.join(", ") : "Non précisé";
  const delai = data.delai_vente || "Non précisé";

  // génération numéro dossier
  const dossier = "TIM-" + Date.now();

 const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

  // EMAIL AGENCE + COLLABORATEUR

  const mailAgence = {
    from: process.env.EMAIL_USER,
    to: [
      "timmosbatignolles@gmail.com",
      data.collaborateur
    ],
    subject: "Nouvel apport d'affaire - " + dossier,
    text: `

NOUVEL APPORT D'AFFAIRE

Numéro dossier : ${dossier}

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

  // EMAIL CONFIRMATION APPORTEUR

  const mailApporteur = {
    from: process.env.EMAIL_USER,
    to: data.apporteur_email,
    subject: "Votre recommandation a bien été enregistrée",
    text: `

Bonjour ${data.apporteur_prenom},

Merci pour votre recommandation.

Votre dossier a bien été enregistré sous le numéro :

${dossier}

Notre équipe va prendre contact avec votre prospect dans les meilleurs délais.

Nous vous rappelons que la rémunération prévue est de 300€ versés après la signature de l'acte authentique de vente.

L'équipe TimmoS

`
  };

  try {

    await transporter.sendMail(mailAgence);
    await transporter.sendMail(mailApporteur);

    return Response.json({ success: true });

  } catch (error) {

    console.error(error);

    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
