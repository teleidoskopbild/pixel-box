import { toJpeg } from "html-to-image";

const handleDownload = () => {
  const minimapElement = document.getElementById("minimapCapture");
  console.log(minimapElement.offsetWidth, minimapElement.offsetHeight);
  if (minimapElement) {
    const rect = minimapElement.getBoundingClientRect();
    console.log("Containergröße:", rect.width, rect.height);
    toJpeg(minimapElement, {
      quality: 0.95,
      width: minimapElement.rectWidth,
      height: minimapElement.rectHeight,
    })
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
