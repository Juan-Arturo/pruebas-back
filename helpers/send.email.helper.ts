import nodemailer from "nodemailer";


export const sendEmail = async (
  fromEmail: string,
  passwordEmail: string,
  toEmail: string,
  htmlContent: string // Solo pasamos la ruta del archivo HTML
): Promise<void> => {
  try {

    // Configuramos el transporte de correo
    const transporter = nodemailer.createTransport({
      service: "gmail", // Puedes cambiarlo según tu proveedor (Outlook, SMTP, etc.)
      auth: {
        user: fromEmail, // Tu correo de origen
        pass: passwordEmail, // Tu contraseña o app password
      },
    });

    // Configuramos las opciones del correo
    const mailOptions = {
      from: fromEmail,
      to: toEmail,
      subject: "Correo Automático",
      html: htmlContent, // Usamos el contenido del archivo HTML
    };

    // Enviamos el correo
    await transporter.sendMail(mailOptions);
    console.log(`✅ Correo enviado a ${toEmail}`);
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
    throw new Error("No se pudo enviar el correo.");
  }
};
