import { toJpeg } from "html-to-image";

const handleDownload = () => {
  const minimapElement = document.getElementById("minimapCapture");

  if (minimapElement) {
    toJpeg(minimapElement, { quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "download-image.jpg";
        link.click();
      })
      .catch((error) => {
        console.error("Fehler beim Exportieren:", error);
      });
  }
};

const DownloadImage = () => {
  return <button onClick={handleDownload}>Download Image</button>;
};

export default DownloadImage;
