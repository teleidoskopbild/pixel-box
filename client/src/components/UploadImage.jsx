const UploadImage = ({ pixelColors, title, setImageTitle, userId }) => {
  // userId als Prop
  const handleUpload = async () => {
    const imageData = pixelColors; // Farbdaten des aktuellen Pixelgrids
    console.log("UserId im Frontend:", userId); //
    try {
      const response = await fetch("http://localhost:5005/gallery/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, imageData, title }), // userId hier verwenden
      });

      console.log(imageData, title, userId);
      console.log("Response:", response); // Antwort im Log

      if (!response.ok) {
        const errorMessage = await response.text(); // Fehlertext lesen
        throw new Error(`Fehler beim Hochladen des Bildes: ${errorMessage}`);
      }

      const result = await response.json(); // Ergebnis vom Server abrufen
      setImageTitle("");
      window.alert("Image uploaded successfully!");
      console.log("Bild erfolgreich hochgeladen:", result);
    } catch (error) {
      console.error("Fehler beim Hochladen des Bildes:", error);
    }
  };

  return (
    <div>
      <button onClick={handleUpload}>Bild hochladen</button>
    </div>
  );
};

export default UploadImage;
