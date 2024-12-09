import React, { useState, MouseEvent } from "react";
import { Box } from "@mui/material";
import LocationImg from "../../assets/images/location.svg";
import { tamilNaduDistricts, District } from "./DistrictsData";

const Map: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [tooltipData, setTooltipData] = useState<District | null>(null);

  const handleMouseEnter = (event: MouseEvent<SVGImageElement>, districtData: District) => {
    const { clientX, clientY } = event;
    setTooltipPosition({ x: clientX, y: clientY });
    setTooltipData(districtData);
    setShowTooltip(true);
  };

  const handleMouseMove = (event: MouseEvent<SVGImageElement>) => {
    const { clientX, clientY } = event;
    setTooltipPosition({ x: clientX, y: clientY });
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginTop: "20px",
      }}
    >
      <svg
        width="300"
        height="400"
        viewBox="0 0 440 590"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {tamilNaduDistricts.map((district, index) => (
          <path
            key={index}
            fillRule="evenodd"
            clipRule="evenodd"
            d={district.svgPath}
            fill={district.color}
            stroke="black"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {tamilNaduDistricts.map(
          (district, index) =>
            district.isLocated && (
              <image
                key={index}
                xlinkHref={LocationImg}
                x={district.coord?.x}
                y={district.coord?.y}
                width="25"
                height="25"
                onMouseEnter={(e) => handleMouseEnter(e, district)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            )
        )}
      </svg>

      {showTooltip && tooltipData && (
        <div
          style={{
            position: "absolute",
            top: `${tooltipPosition.y + 10}px`,
            left: `${tooltipPosition.x + 10}px`,
            backgroundColor: "#333",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "8px",
            height: 60,
            width: 100,
            pointerEvents: "none",
          }}
        >
          District: {tooltipData.name } <br />
          Rural/urban-Both <br />
          CK Served Outlets-20 <br />
          Non CK Served Outlets -125 <br />
        </div>
      )}
    </Box>
  );
};

export default Map;
