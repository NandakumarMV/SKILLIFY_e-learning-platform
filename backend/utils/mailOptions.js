import otpgenerator from "otp-generator";
// import transporter from "../utils/nodemailTransporter";

export const generateOtp = (length) => {
  return otpgenerator.generate(length, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });
};

export const configureMailOptions = (email, otp, subject) => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .header {
            font-size: 24px;
            font-weight: bold;
            color: #333;
          }
          .content {
            margin-top: 20px;
            font-size: 16px;
            color: #555;
          }
        </style>
      </head>
      <body>
        <div class="header">Skillify E-learning</div>
        <div class="content">
          Your OTP for ${subject} is: ${otp}
        </div>
      </body>
    </html>
  `;

  return {
    from: process.env.USER_EMAIL,
    to: email,
    subject: "OTP Verification",
    html: htmlContent,
  };
};
