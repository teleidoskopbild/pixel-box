import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import "./Gallery.css"; // Importiere die CSS-Datei

const Gallery = () => {
  const { userInfo } = useContext(UserContext);
  const [images, setImages] = useState([]); // Zustand für die Bilder
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5005/gallery");
        const data = await response.json();
        console.log("Fetched data:", data);
        setImages(data); // Setze die Bilder im Zustand
      } catch (error) {
        console.error("Fehler beim Abrufen der Bilder:", error);
      }
    };

    fetchImages(); // Bilder abrufen, wenn die Komponente geladen wird
  }, []);

  const handleDeleteImage = async (imageId) => {
    console.log("delete img with imageId: ", imageId);
    try {
      const response = await fetch(
        `http://localhost:5005/gallery/delete/${imageId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userInfo.id }),
        }
      );

      if (!response.ok) {
        throw new Error("Fehler beim Löschen des Bildes");
      }

      alert("Bild erfolgreich gelöscht!");
      // Aktualisiere die Bilder nach dem Löschen
      setImages(images.filter((image) => image.id !== imageId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>GALLERY</h2>
      <div className="gallery-container">
        {images.map((image) => (
          <div key={image.id} className="gallery-item">
            <h3>{image.title}</h3>
            <div className="image-grid">
              {JSON.parse(image.image_data).map((color, index) => (
                <div
                  key={index}
                  className="image-pixel"
                  style={{ backgroundColor: color }} // Farbe direkt in den Stil setzen
                />
              ))}
            </div>
            <div>
              <button onClick={() => handleDeleteImage(image.id)}>
                Löschen
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
