import { useContext } from "react";
import { UserContext } from "../context/UserContext"; // Importiere den UserContext
import "./Navbar.css";

const Navbar = ({ setShowGallery, setShowRegister }) => {
  const { userInfo, login, logout } = useContext(UserContext); // Nutze den UserContext

  const handleLogin = () => {
    const username = prompt("Please enter your username:");
    if (username) {
      login(username); // UserContext-Login-Funktion verwenden
    }
  };

  const handleRegister = () => {
    setShowRegister(true); // Setze die Anzeige der Registrierungsseite
    setShowGallery(false); // Stelle sicher, dass die Galerie nicht angezeigt wird
  };

  return (
    <nav className="navbar">
      <h1>Pixelbox</h1>
      {userInfo && (
        <span className="logged-in-as">
          Logged in as: {userInfo.username}! - UserId: {userInfo.id}
        </span>
      )}
      <button
        onClick={() => {
          setShowRegister(false);
          setShowGallery(false);
        }}
      >
        Pixelbox
      </button>
      <button
        onClick={() => {
          setShowRegister(false);
          setShowGallery(true);
        }}
      >
        GALLERY
      </button>
      {userInfo ? (
        <div>
          <button onClick={logout}>LOGOUT</button> {/* Logout-Button */}
        </div>
      ) : (
        <div>
          <button onClick={handleRegister}>REGISTER</button>{" "}
          {/* Registrierung */}
          <button onClick={handleLogin}>LOGIN</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
