import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import "./PixelBox.css";
import ColorPalette from "./ColorPalette.jsx";
import Toolbox from "./ToolBox.jsx";
import Minimap from "./Minimap.jsx";
// import LoadPainting from "./LoadPainting.jsx"; // Pfad zur LoadPainting-Datei
import SaveButton from "./SaveButton.jsx";
import LoadButton from "./LoadButton";
import UploadImage from "./UploadImage.jsx";
import DownloadImage from "./DownloadImage.jsx";

const PixelBox = ({ pixelColors, setPixelColors }) => {
  const { userInfo } = useContext(UserContext);
  // const [userId] = useState(null);
  const userId = userInfo ? userInfo.id : null;
  const [imageTitle, setImageTitle] = useState("");
  const handleTitleChange = (e) => {
    setImageTitle(e.target.value); // Aktualisiere den Titel basierend auf der Eingabe
  };
  // const totalPixels = 40 * 30;
  // const [pixelColors, setPixelColors] = useState(
  //   Array(totalPixels).fill("#FFFFFF")
  // ); // Creates an array with length of totalPixels with white-color elements
  const [selectedBrushColor, setSelectedBrushColor] = useState("#000000"); // sets the brush color
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [activeTool, setActiveTool] = useState("color");

  const handleMouseDown = () => {
    setIsMouseDown(true); // Set to true when mouse is down
  };

  const handleMouseUp = () => {
    setIsMouseDown(false); // Set to false when mouse is up
  };

  const handlePixelMouseEnter = (index) => {
    if (isMouseDown && activeTool === "color") {
      // Check for activeTool
      const newPixelColors = [...pixelColors];
      newPixelColors[index] = selectedBrushColor;
      setPixelColors(newPixelColors);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedBrushColor(color);
  };

  const handlePixelClick = (index) => {
    if (activeTool === "color") {
      const newPixelColors = [...pixelColors]; // creates a copy of the original pixelColors array
      newPixelColors[index] = selectedBrushColor; // set pixel with selected index to brush
      setPixelColors(newPixelColors); // overwrites the original array with copy
      // console.log(newPixelColors);
    } else if (activeTool === "fill") {
      // Fill tool: trigger the floodFill function on the clicked pixel.
      const targetColor = pixelColors[index];
      floodFill(index, targetColor, selectedBrushColor);
    }
  };

  const floodFill = (startIndex, targetColor, replacementColor) => {
    // Avoid infinite loops if the target and replacement colors are the same.
    if (targetColor === replacementColor) return;
    if (pixelColors[startIndex] !== targetColor) return;

    const newPixelColors = [...pixelColors];
    const stack = [startIndex]; // Use a stack for DFS
    const rowSize = 40; // Number of pixels per row

    while (stack.length > 0) {
      const currentIndex = stack.pop();
      newPixelColors[currentIndex] = replacementColor;

      // Define the four possible directions: Left, Right, Up, Down
      const directions = [-1, +1, -rowSize, +rowSize];

      directions.forEach((offset) => {
        const neighborIndex = currentIndex + offset;

        // Check bounds to ensure the neighbor is within the grid
        if (
          neighborIndex >= 0 &&
          neighborIndex < newPixelColors.length &&
          (offset !== -1 || currentIndex % rowSize !== 0) && // Prevent left overflow
          (offset !== 1 || (currentIndex + 1) % rowSize !== 0) && // Prevent right overflow
          newPixelColors[neighborIndex] === targetColor
        ) {
          stack.push(neighborIndex);
        }
      });
    }

    setPixelColors(newPixelColors);
  };

  const renderGrid = () => {
    return pixelColors.map((color, index) => (
      <div
        key={index}
        className="pixel"
        style={{ backgroundColor: color }}
        onClick={() => handlePixelClick(index)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => handlePixelMouseEnter(index)}
      />
    ));
  };

  return (
    <div className="page-container">
      {userInfo && (
        <div>
          <input
            type="text"
            placeholder="Gib einen Titel für das Bild ein"
            value={imageTitle}
            onChange={handleTitleChange}
          />
          <UploadImage
            pixelColors={pixelColors}
            title={imageTitle}
            setImageTitle={setImageTitle}
            userId={userId}
          />
        </div>
      )}
      {/* <h1>PIXELBOX</h1> */}
      <div className="sidebar-container">
        <Toolbox activeTool={activeTool} setActiveTool={setActiveTool} />
        <ColorPalette
          onColorSelect={handleColorSelect}
          selectedBrushColor={selectedBrushColor}
        />
        <Minimap pixelColors={pixelColors} />
      </div>
      {/* <LoadPainting setPixelColors={setPixelColors} /> */}
      <LoadButton setPixelColors={setPixelColors} />
      <SaveButton pixelColors={pixelColors} />
      <DownloadImage />
      <div className="grid-container">{renderGrid()}</div>{" "}
      {/* Render the pixel grid */}
    </div>
  );
};

export default PixelBox;
