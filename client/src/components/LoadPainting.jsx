const LoadPainting = ({ setPixelColors }) => {
  const loadPainting = async () => {
    try {
      const response = await fetch("http://localhost:5005/api/painting");
      if (!response.ok) {
        throw new Error("Failed to load painting");
      }
      const data = await response.json();
      setPixelColors(data); // Setze die Farben der Pixel
    } catch (error) {
      console.error("Error loading painting:", error);
    }
  };

  return <button onClick={loadPainting}>Load Painting</button>;
};

export default LoadPainting;
