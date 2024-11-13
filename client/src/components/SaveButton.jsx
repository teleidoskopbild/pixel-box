const SaveButton = ({ pixelColors }) => {
  const savePainting = () => {
    const paintingJSON = JSON.stringify(pixelColors); // convert painting to json
    const blob = new Blob([paintingJSON], { type: "application/json" }); // binary-large-object
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "myPainting.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return <button onClick={savePainting}>Save Painting</button>;
};

export default SaveButton;
