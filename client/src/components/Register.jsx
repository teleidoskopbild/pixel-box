import { useState } from "react";
import "./Register.css"; // Importiere die CSS-Datei

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // Für Feedback vom Server

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email); // Einfache E-Mail-Validierung

  const handleRegister = async () => {
    if (username && email) {
      if (!isValidEmail(email)) {
        alert("Bitte gib eine gültige E-Mail-Adresse ein.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5005/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email }),
        });

        if (!response.ok) {
          throw new Error("Registrierung fehlgeschlagen.");
        }

        const data = await response.json(); // Daten vom Server erhalten
        setMessage(data.message); // Nachricht speichern
        setUsername("");
        setEmail("");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Bitte fülle alle Felder aus.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Registrierung</h2>
        <input
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleRegister}>Registrieren</button>
        {message && <p>{message}</p>} {/* Feedback vom Server anzeigen */}
      </div>
    </div>
  );
};

export default Register;
