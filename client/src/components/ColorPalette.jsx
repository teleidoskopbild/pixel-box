import "./ColorPalette.css"; // Create a CSS file if needed
import { colors } from "../data/colors.js";
import { useState } from "react";

const ColorPalette = ({ onColorSelect, selectedBrushColor }) => {
  const [customColor, setCustomColor] = useState("#000000");

  const handleCustomColorChange = (event) => {
    const newColor = event.target.value; // Get the new color from input
    setCustomColor(newColor); // Update the state
    onColorSelect(newColor); // Also update the selected color
  };
  return (
    <div className="color-tools">
      {" "}
      <div className="color-palette">
        {colors.map((color) => (
          <div
            key={color}
            className="color-box"
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)} // Set selected color
          />
        ))}
      </div>
      <div
        className="selected-color"
        style={{ backgroundColor: selectedBrushColor }} // Display selected color
      />
      <input
        type="color" // Color input for custom color selection
        value={customColor} // Set value to custom color state
        onChange={handleCustomColorChange} // Handle color change
        className="custom-color-input"
      />
    </div>
  );
};

export default ColorPalette;
