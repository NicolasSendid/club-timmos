
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

  // 📩 Mail pour toi
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: "Nouvel apport d'affaires - Club TimmoS",
    text: `
Nouvel apport :

Nom : ${data.apporteur_nom}
Email : ${data.apporteur_email}
Téléphone : ${data.apporteur_tel}

Contact recommandé :
${data.contact_recommande}
    `,
  });

  // 📩 Mail de confirmation à l’apporteur
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: data.apporteur_email,
    subject: "Votre recommandation a bien été reçue",
    text: `
Bonjour ${data.apporteur_nom},

Nous avons bien reçu votre recommandation.
Vos données seront enregistrées et protégées dans notre logiciel Hektor - La Boîte Immo
Nous reviendrons vers vous pour vous informer de l'état d'avancement du dossier et si le dossier aboutit.

Merci pour votre confiance.

L'équipe TimmoS
    `,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
