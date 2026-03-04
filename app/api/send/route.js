const dossierNumber = `TIM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

import nodemailer from "nodemailer";

export async function POST(req) {
  const data = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const collaborateurEmail = data.collaborateur;

  // 📩 Mail interne principal
  subject: `Nouveau dossier ${dossierNumber}`,
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: "Nouvel apport d'affaires - Club TimmoS",
    text: `
=== APPORTEUR ===
Dossier : ${dossierNumber}
Nom : ${data.apporteur_nom}
Prénom : ${data.apporteur_prenom}
Téléphone : ${data.apporteur_tel}
Email : ${data.apporteur_email}

=== PROSPECT ===
Nom : ${data.prospect_nom}
Prénom : ${data.prospect_prenom}
Téléphone : ${data.prospect_tel}
Email : ${data.prospect_email}
Adresse du bien : ${data.prospect_adresse}

Collaborateur sélectionné : ${collaborateurEmail}
    `,
  });

  // 📩 Copie au collaborateur
 await transporter.sendMail({
  from: process.env.SMTP_USER,
  to: collaborateurEmail,
  subject: `Nouveau dossier ${dossierNumber} attribué`,
  text: `
Dossier : ${dossierNumber}

=== PROSPECT ===
Nom : ${data.prospect_nom} ${data.prospect_prenom}
Téléphone : ${data.prospect_tel}
Email : ${data.prospect_email}
Adresse : ${data.prospect_adresse}

=== APPORTEUR ===
Nom : ${data.apporteur_nom} ${data.apporteur_prenom}
Téléphone : ${data.apporteur_tel}
Email : ${data.apporteur_email}
  `,
});
  
  // 📩 Confirmation à l’apporteur
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: data.apporteur_email,
    subject: "Votre recommandation a bien été reçue",
    text: `
Bonjour ${data.apporteur_prenom},

Nous avons bien reçu votre recommandation.
Notre équipe va contacter le prospect dans les meilleurs délais.

Merci pour votre confiance.

L'équipe TimmoS
    `,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
