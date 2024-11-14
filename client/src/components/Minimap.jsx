import "./Minimap.css";

const Minimap = ({ pixelColors }) => {
  const minimapWidth = 160; // Width of the minimap in pixels
  const minimapHeight = 120; // Height of the minimap in pixels
  const pixelWidth = Math.floor(minimapWidth / 40); // Width of each pixel in minimap
  const pixelHeight = Math.floor(minimapHeight / 30); // Height of each pixel in minimap

  return (
    <div className="minimap" id="minimapCapture">
      {pixelColors.map((color, index) => (
        <div
          key={index}
          className="minimap-pixel"
          style={{
            backgroundColor: color,
            width: pixelWidth,
            height: pixelHeight,
          }}
        />
      ))}
    </div>
  );
};

export default Minimap;
