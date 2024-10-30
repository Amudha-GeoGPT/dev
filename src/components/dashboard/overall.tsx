import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, OutlinedInput, Chip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Sample data
const states = ['Tamil Nadu', 'Assam', 'Andhra Pradesh'];
const districts = ['Anantapur', 'Ariyalur', 'Adilabad'];
const ranks = ['Show All', 'Rank 1', 'Rank 2', 'Rank 3'];
const indices = ['Show MIS', 'Index 1', 'Index 2', 'Index 3'];

const Overall: React.FC = () => {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedRank, setSelectedRank] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<string>('');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const drawerWidth = isMobile ? 200 : 240;

  const handleStateChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedStates(value);
  };

  const handleDistrictChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedDistricts(value);
  };

  const handleRankChange = (event: SelectChangeEvent<string>) => {
    setSelectedRank(event.target.value as string);
  };

  const handleIndexChange = (event: SelectChangeEvent<string>) => {
    setSelectedIndex(event.target.value as string);
  };

  const handleClearFilter = () => {
    setSelectedStates([]);
    setSelectedDistricts([]);
    setSelectedRank('');
    setSelectedIndex('');
  };

  // Function to remove an individual state
  const handleDeleteState = (stateToDelete: string) => {
    setSelectedStates((prevStates) => prevStates.filter((state) => state !== stateToDelete));
  };

  // Function to remove an individual district
  const handleDeleteDistrict = (districtToDelete: string) => {
    setSelectedDistricts((prevDistricts) => prevDistricts.filter((district) => district !== districtToDelete));
  };

  return (
    <Box display="flex" alignItems="center" p={3} bgcolor="#f7faf7" gap={2} sx={{ flexGrow: 1, p: 3, overflow: 'auto', ml: { sm: `${drawerWidth}px` }, marginTop: '85px' }}>
      
      {/* State Selection */}
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel>State</InputLabel>
        <Select
          multiple
          value={selectedStates}
          onChange={handleStateChange}
          input={<OutlinedInput label="State" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() => handleDeleteState(value)} // Removing a state
                />
              ))}
            </Box>
          )}
        >
          {states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* District Selection */}
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel>District</InputLabel>
        <Select
          multiple
          value={selectedDistricts}
          onChange={handleDistrictChange}
          input={<OutlinedInput label="District" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() => handleDeleteDistrict(value)} // Removing a district
                />
              ))}
            </Box>
          )}
        >
          {districts.map((district) => (
            <MenuItem key={district} value={district}>
              {district}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Rank Selection */}
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel>Select Rank</InputLabel>
        <Select
          value={selectedRank}
          onChange={handleRankChange}
          label="Select Rank"
        >
          {ranks.map((rank) => (
            <MenuItem key={rank} value={rank}>
              {rank}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Index Selection */}
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel>Select Index</InputLabel>
        <Select
          value={selectedIndex}
          onChange={handleIndexChange}
          label="Select Index"
        >
          {indices.map((index) => (
            <MenuItem key={index} value={index}>
              {index}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Clear Filter Button */}
      <Button variant="contained" color="success" onClick={handleClearFilter} sx={{ height: 56 }}>
        Clear Filter
      </Button>
    </Box>
  );
};

export default Overall;
