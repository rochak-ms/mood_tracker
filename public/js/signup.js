// "use strict";
//import nodemailer from "nodemailer";
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  console.log(email);

  // require node mailer

  // async function main() {
  //     let transporter = nodemailer.createTransport({
  //       host: "smtp.ethereal.email",
  //       port: 587,
  //       secure: false,
  //       auth: {
  //         user: moodymoodtrackerssss,
  //         pass: moodymoodtracker,
  //       },
  //     });

  //     let info = await transporter.sendMail({
  //       from: '"MoodTracker" <moodymoodtrackerssss@gmail.com>', // sender address
  //       to: email,
  //       subject: "Welcome!",
  //       text: "Welcome to the moodtracker app! We hope that you find a lot of value out of this application!",
  //       html: "<b>Welcome!</b>",
  //     });

  //     console.log("email sent");
  //   }
  //   main().catch(console.error);

  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
