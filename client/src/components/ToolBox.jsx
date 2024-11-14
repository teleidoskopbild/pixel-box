import "./ToolBox.css";

const Toolbox = ({ activeTool, setActiveTool }) => {
  return (
    <div className="toolbox">
      <button
        onClick={() => (setActiveTool("color"), console.log(activeTool))}
        className={`toolbox-button ${activeTool === "color" ? "active" : ""}`}
      >
        Color Tool
      </button>
      <button
        onClick={() => (setActiveTool("fill"), console.log(activeTool))}
        className={`toolbox-button ${activeTool === "fill" ? "active" : ""}`}
      >
        Fill Tool
      </button>
    </div>
  );
};

export default Toolbox;
