import React from "react";

interface TooltipProps {
  position: { x: number; y: number };
  data: { name: string };
}

const Tooltip: React.FC<TooltipProps> = ({ position, data }) => {
    
  return (
    <div
      style={{
        position: "absolute",
        top: `${position.y + 10}px`,
        left: `${position.x + 10}px`,
        backgroundColor: "#333",
        color: "#fff",
        padding: "5px 10px",
        borderRadius: "5px",
        fontSize: "8px",
        height: 80,
        width: 100,
        pointerEvents: "none",
      }}
    >
      District: {data.name} <br />
      Rural/Urban: Both <br />
      CK Served Outlets: 20 <br />
      Non CK Served Outlets: 125 <br />
    </div>
  );
};

export default Tooltip;
