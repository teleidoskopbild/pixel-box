import { createContext, useState } from "react";

// Erstelle den UserContext
const UserContext = createContext();

// Erstelle den UserProvider
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null); // Speichert Benutzerinformationen
  const [pixelColors, setPixelColors] = useState(Array(1200).fill("#FFFFFF")); // Pixel colors

  const login = async (username) => {
    try {
      const response = await fetch("http://localhost:5005/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Login fehlgeschlagen: " + errorData.message);
      }

      const data = await response.json();
      console.log("Serverantwort für Login:", data); // Debugging-Log

      if (data.userInfo) {
        setUserInfo(data.userInfo);
        console.log(data);
        console.log("Neuer Zustand von userInfo:", data.userInfo); // Zustand prüfen
        alert(`Welcome back, ${data.userInfo.username}!`);
      } else {
        throw new Error("Benutzerinformationen fehlen in der Serverantwort.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Logout-Funktion
  const logout = () => {
    setUserInfo(null); // Setze den Benutzer auf null zurück
    alert("You have logged out."); // Optional: Bestätigung der Abmeldung
  };

  return (
    <UserContext.Provider
      value={{ userInfo, login, logout, pixelColors, setPixelColors }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
