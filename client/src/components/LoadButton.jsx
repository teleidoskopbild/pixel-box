import { useRef } from "react";

const LoadButton = ({ setPixelColors }) => {
  const fileInputRef = useRef(null); // Referenz für das Datei-Input-Element

  const loadPainting = async (event) => {
    const file = event.target.files[0]; // Hol dir die ausgewählte Datei
    if (!file) return; // Wenn keine Datei ausgewählt wurde, tue nichts

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = JSON.parse(e.target.result); // JSON-Daten parsen
      setPixelColors(data); // Setze die Farben der Pixel
    };
    reader.readAsText(file); // Lese die Datei als Text
  };

  return (
    <>
      <input
        type="file"
        accept=".json"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={loadPainting}
      />
      <button onClick={() => fileInputRef.current.click()}>
        Load Painting
      </button>
    </>
  );
};

export default LoadButton;
