import React, { useState } from "react";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [subject, setsubject] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name, email, subject);
    const data = { name, email, subject };
    fetch("http://localhost:3000/api/postcontact/", {
      method: "POST",
      headers: {
        "Content-Type": "app/json",
      },
      body: JSON.stringify(data),
    })
      .then((responce) => {
        console.log(responce.text());
        alert("Thanks for contacting us");
        setname("");
        setemail("");
        setsubject("");
      })
      .catch((err) => console.error("Error : ", error));
  };
  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setname(e.target.value);
        break;
      case "email":
        setemail(e.target.value);
        break;
      case "subject":
        setsubject(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.formlabel}>
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleChange}
            name="name"
            placeholder="Your name.."
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.formlabel}>
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="example@email.com"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="subject" className={styles.formlabel}>
            Subject
          </label>
          <textarea
            id="subject"
            name="subject"
            value={subject}
            onChange={handleChange}
            placeholder="Write something.."
            required
          />
        </div>
        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
