import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import CustomAutocomplete from "../../components/common/CustomAutocomplete";
import CustomSelect from "../../components/common/CustomSelect";

export default function StateComponent() {
  const [stateValue, setStateValue] = useState<string[]>([]);
  const [stateIndex, setIndexValue] = useState<string>("");
  const [stateRank, setStateRank] = useState<string>("");
  const handleSelectStateChange = (value: string[]) => {
    setStateValue(value);
  };
  const handleSelectIndexChange = (value: string) => {
    setIndexValue(value);
  };
  const handleSelectRankChange = (value: string) => {
    setStateRank(value);
  };

  return (
    <Box sx={{ px: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Box>
            <CustomAutocomplete
              label="State"
              placeholder="Select one or more states"
              insideplaceholder="Search State"
              options={[
                "Andhra Pradesh",
                "Tamil Nadu",
                "Assam",
                "Bihar",
                "Karnataka",
                "Punjab",
              ]}
              value={stateValue}
              onInputChange={handleSelectStateChange}
              noOptionsText="No states found"
              sx={{ marginTop: "4px" }}
              selectAllLabel="Select All"
              deselectAllLabel="Deselect All"
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <CustomSelect
              label="State Index"
              placeholder="Select Index"
              options={["Show MIS", "Show MAS"]}
              value={stateIndex}
              onChange={handleSelectIndexChange}
              sx={{
                marginTop: "4px",
                height: "39px",
              }}
              
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <CustomSelect
              label="Select Rank"
              placeholder="Select Rank"
              options={[
                "Show All",
                "Top 10",
                "Top 50",
                "Top 100",
                "Bottom 10",
                "Bottom 50",
                "Bottom 100",
              ]}
              value={stateRank}
              onChange={handleSelectRankChange}
              sx={{ marginTop: "4px", height: "39px" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
