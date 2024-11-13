import PixelBox from "./components/PixelBox.jsx";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Gallery from "./components/Gallery.jsx";
import Register from "./components/Register.jsx"; // Importiere die Register-Komponente
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const App = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // Zustand für die Registrierung
  const { pixelColors, setPixelColors } = useContext(UserContext);

  return (
    <div>
      <Navbar
        setShowGallery={setShowGallery}
        setShowRegister={setShowRegister}
      />
      {showRegister ? (
        <Register />
      ) : showGallery ? (
        <Gallery />
      ) : (
        <PixelBox pixelColors={pixelColors} setPixelColors={setPixelColors} />
      )}
    </div>
  );
};

export default App;
