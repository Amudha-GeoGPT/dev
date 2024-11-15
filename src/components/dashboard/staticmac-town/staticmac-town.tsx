import React, { useState } from 'react';
import { Box, Button, TextField, Autocomplete, useTheme, useMediaQuery, Grid,  MenuItem,
  FormControl,
  Typography,
  OutlinedInput,
  Select,
  Chip,
  Stack,
  ListSubheader,
  InputAdornment } from '@mui/material';
import Overalltabbar from '../../navbar-component/navbarcomponent';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';
// import Tabdata from './Components/Tabdata';
import { SelectChangeEvent } from '@mui/material/Select';
import CustomAutocomplete from '../../common/CustomAutocomplete';
import CustomSelect from '../../common/CustomSelect';
import TownTabsComponent from '../../TownTabsComponent';

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh"
];
// district
const district = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh"
  ];
 



const Staticmactown: React.FC = () => {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selecteddistrict, setSelecteddistrict] = useState<string[]>([]);
  const [showTabData, setShowTabData] = useState(false);
  const [values, setValues] = useState({ first: '', second: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchdistrictTerm, setSearchsearchdistrictTerm] = useState('');
  const [stateValue, setStateValue] = useState<string[]>([]);
  const [stateIndex, setIndexValue] = useState<string>("");
  const [stateRank, setStateRank] = useState<string>("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const drawerWidth = isMobile ? 200 : 190;
  const handleSelectAll = () => {
    setSelectedStates(states);
  };
 
  const handleDeselectAll = () => {
    setSelectedStates([]);
  };
 
  const handleChange = (_event: React.SyntheticEvent, newValue: string[]) => {
    setSelectedStates(newValue);
  };

//   district

const handledistrictSelectAll = () => {
    setSelecteddistrict(district);
  };
 
  const handledistrictDeselectAll = () => {
    setSelecteddistrict([]);
  };
 
  const handledistrictChange = (_event: React.SyntheticEvent, newValue: string[]) => {
    setSelecteddistrict(newValue);
  };
 
  const handleIndexChange = (type: 'first' | 'second') => (event: SelectChangeEvent<string>) => {
    setValues({ ...values, [type]: event.target.value });
  };
 
  const filtereddistrict = district.filter((district) =>
    district.toLowerCase().includes(searchdistrictTerm.toLowerCase())
  );
  const filteredStates = states.filter((state) =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
    <Box alignItems="center"  sx={{ flexGrow: 1, p: 2, overflow: 'auto', ml: { sm: `${drawerWidth}px` }, marginTop: '60px' }}>
       <Grid container spacing={2} sx={{ width: '100%', padding: 2 }}>
        {/* States Selection */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
           
            <CustomAutocomplete
              label="State"
              placeholder="Select one or more states"
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
          </FormControl>
        </Grid>
 
        {/* Rank and Index Selection */}
        <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          
             <CustomAutocomplete
              label="District"
              placeholder="Select One or more district(s)"
              options={
                ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivagangai", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Villupuram", "Virudhunagar"]
              }
              value={stateValue}
              onInputChange={handleSelectStateChange}
              noOptionsText="No states found"
              sx={{ marginTop: "4px" }}
              selectAllLabel="Select All"
              deselectAllLabel="Deselect All"
            />
          </FormControl>
        </Grid>
 
        <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
           
              <CustomAutocomplete
              label="Class"
              placeholder="Select One or more town class"
              options={[
                "I",
                "II",
                "III",
                "IV",
                "V",
                "VI",
                "VII",
              ]}
              value={stateValue}
              onInputChange={handleSelectStateChange}
              noOptionsText="No states found"
              sx={{ marginTop: "4px" }}
              selectAllLabel="Select All"
              deselectAllLabel="Deselect All"
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ width: '100%', padding: 2 }}>
      <Grid item xs={12} sm={6} md={4}>
      <FormControl fullWidth>
            
             <CustomSelect
              label="State Index"
              placeholder="Select Index"
              options={["Show MIS", "Show MAS"]}
              value={stateIndex}
              onChange={handleSelectIndexChange}
              sx={{ marginTop: "4px", height: "39px" }}
            />
          </FormControl>
    </Grid>
      <Grid item xs={12} sm={6} md={4}>
      <FormControl fullWidth>
            
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
            
          </FormControl>
      </Grid>
      
      </Grid>
      <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end', width: '100%', marginTop: '15px' }}>
        <Button
          variant="contained"
          onClick={() => setShowTabData((prev) => !prev)}
          sx={{ backgroundColor: 'black', color: 'white', padding: '2px 4px', fontSize: '0.65rem' }}
        >
          <AssessmentIcon sx={{ marginRight: 0.5 }} />
          {showTabData ? 'Clear Filter' : 'Generate Report'}
        </Button>
      </Stack>
 
      {/* {showTabData && <Tabdata />} */}
      
       
      {showTabData && <TownTabsComponent />}
    </Box>
  );
};

export default Staticmactown;
