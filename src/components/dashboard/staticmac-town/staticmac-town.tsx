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
 
const options = {
  first: [
    { label: "Show MIS", value: "Show MIS" },
    { label: "Show MAS", value: "Show MAS" },
  ],
  second: [
    { label: "Show All", value: "Show All" },
    { label: "Top 10", value: "Top 10" },
    { label: "Top 50", value: "Top 50" },
    { label: "Top 100", value: "Top 100" },
    { label: "Bottom 10", value: "Bottom 10" },
    { label: "Bottom 50", value: "Bottom 50" },
    { label: "Bottom 100", value: "Bottom 100" }
  ],
};


const Staticmactown: React.FC = () => {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selecteddistrict, setSelecteddistrict] = useState<string[]>([]);
  const [showTabData, setShowTabData] = useState(false);
  const [values, setValues] = useState({ first: '', second: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchdistrictTerm, setSearchsearchdistrictTerm] = useState('');
  
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

 




  return (
    <Box alignItems="center"  sx={{ flexGrow: 1, p: 2, overflow: 'auto', ml: { sm: `${drawerWidth}px` }, marginTop: '60px' }}>
       <Grid container spacing={2} sx={{ width: '100%', padding: 2 }}>
        {/* States Selection */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <Typography variant='caption' sx={{ marginBottom: 1, textAlign: 'left', fontSize: '0.7rem' }}>
              State
            </Typography>
            <Autocomplete
              multiple
              value={selectedStates}
              onChange={handleChange}
              options={filteredStates}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <Box component="li" {...props}>
                  <CheckIcon color={selected ? 'primary' : 'action'} />
                  <Typography>{option}</Typography>
                </Box>
              )}
              renderTags={(value, getTagProps) => (
                <div style={{ maxHeight: 40, overflowY: 'auto', display: 'flex', flexWrap: 'wrap' }}>
                  {value.map((option, index) => (
                    <Chip
                      // key={option}
                      label={option}
                      {...getTagProps({ index })}
                      onDelete={() => {
                        setSelectedStates((prev) => prev.filter((state) => state !== option));
                      }}
                    />
                  ))}
                </div>
              )}
              ListboxProps={{ style: { maxHeight: 300, overflow: 'auto' } }}
              ListboxComponent={React.forwardRef((props: any, ref) => (
                <Box ref={ref}>
                  <ListSubheader sx={{ bgcolor: 'background.paper', position: 'sticky', top: 0, zIndex: 2, padding: 1 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Search States"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { height: 40 } }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </ListSubheader>
                  <Box {...props} />
                  <Box {...props}>
                    <ListSubheader sx={{ bgcolor: 'background.paper', position: 'sticky', bottom: 0, zIndex: 1, paddingY: 1, display: 'flex', justifyContent: 'center' }}>
                      <Button onClick={handleSelectAll} variant="outlined" sx={{ marginRight: 1 }}>
                        Select All
                      </Button>
                      <Button onClick={handleDeselectAll} variant="outlined">
                        Deselect All
                      </Button>
                    </ListSubheader>
                  </Box>
                </Box>
              ))}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Select one or more states"  placeholder="Select one or more states"  sx={{
                  '& .MuiInputBase-input': {
                    height: 5, // Set the height of the input field to 40px
                  },
                  
                }}/>
              )}
              popupIcon={null}
              openOnFocus
            />
          </FormControl>
        </Grid>
 
        {/* Rank and Index Selection */}
        <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
            <Typography variant='caption' sx={{ marginBottom: 1, textAlign: 'left', fontSize: '0.7rem' }}>
              District
            </Typography>
            <Autocomplete
              multiple
              value={selecteddistrict}
              onChange={handledistrictChange}
              options={filtereddistrict}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <Box component="li" {...props}>
                  <CheckIcon color={selected ? 'primary' : 'action'} />
                  <Typography>{option}</Typography>
                </Box>
              )}
              renderTags={(value, getTagProps) => (
                <div style={{ maxHeight: 40, overflowY: 'auto', display: 'flex', flexWrap: 'wrap' }}>
                  {value.map((option, index) => (
                    <Chip
                      // key={option}
                      label={option}
                      {...getTagProps({ index })}
                      onDelete={() => {
                        setSelecteddistrict((prev) => prev.filter((district) => district !== option));
                      }}
                    />
                  ))}
                </div>
              )}
              ListboxProps={{ style: { maxHeight: 300, overflow: 'auto' } }}
              ListboxComponent={React.forwardRef((props: any, ref) => (
                <Box ref={ref}>
                  <ListSubheader sx={{ bgcolor: 'background.paper', position: 'sticky', top: 0, zIndex: 2, padding: 1 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Search District"
                      onChange={(e) => setSearchsearchdistrictTerm(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { height: 40 } }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </ListSubheader>
                  <Box {...props} />
                  <Box {...props}>
                    <ListSubheader sx={{ bgcolor: 'background.paper', position: 'sticky', bottom: 0, zIndex: 1, paddingY: 1, display: 'flex', justifyContent: 'center' }}>
                      <Button onClick={handledistrictSelectAll} variant="outlined" sx={{ marginRight: 1 }}>
                        Select All
                      </Button>
                      <Button onClick={handledistrictDeselectAll} variant="outlined">
                        Deselect All
                      </Button>
                    </ListSubheader>
                  </Box>
                </Box>
              ))}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Select one or more district(s)"  placeholder="Select one or more states"  sx={{
                  '& .MuiInputBase-input': {
                    height: 5, // Set the height of the input field to 40px
                  },
                  
                }}/>
              )}
              popupIcon={null}
              openOnFocus
            />
          </FormControl>
        </Grid>
 
        <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
            <Typography variant='caption' sx={{ marginBottom: 1, textAlign: 'left', fontSize: '0.7rem' }}>
              Class
            </Typography>
            <Autocomplete
              multiple
              value={selecteddistrict}
              onChange={handledistrictChange}
              options={filtereddistrict}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <Box component="li" {...props}>
                  <CheckIcon color={selected ? 'primary' : 'action'} />
                  <Typography>{option}</Typography>
                </Box>
              )}
              renderTags={(value, getTagProps) => (
                <div style={{ maxHeight: 40, overflowY: 'auto', display: 'flex', flexWrap: 'wrap' }}>
                  {value.map((option, index) => (
                    <Chip
                      // key={option}
                      label={option}
                      {...getTagProps({ index })}
                      onDelete={() => {
                        setSelecteddistrict((prev) => prev.filter((district) => district !== option));
                      }}
                    />
                  ))}
                </div>
              )}
              ListboxProps={{ style: { maxHeight: 300, overflow: 'auto' } }}
              ListboxComponent={React.forwardRef((props: any, ref) => (
                <Box ref={ref}>
                  <ListSubheader sx={{ bgcolor: 'background.paper', position: 'sticky', top: 0, zIndex: 2, padding: 1 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Search District"
                      onChange={(e) => setSearchsearchdistrictTerm(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { height: 40 } }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </ListSubheader>
                  <Box {...props} />
                  <Box {...props}>
                    <ListSubheader sx={{ bgcolor: 'background.paper', position: 'sticky', bottom: 0, zIndex: 1, paddingY: 1, display: 'flex', justifyContent: 'center' }}>
                      <Button onClick={handledistrictSelectAll} variant="outlined" sx={{ marginRight: 1 }}>
                        Select All
                      </Button>
                      <Button onClick={handledistrictDeselectAll} variant="outlined">
                        Deselect All
                      </Button>
                    </ListSubheader>
                  </Box>
                </Box>
              ))}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Select one or more town class"  placeholder="Select one or more town class"  sx={{
                  '& .MuiInputBase-input': {
                    height: 5, // Set the height of the input field to 40px
                  },
                  
                }}/>
              )}
              popupIcon={null}
              openOnFocus
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ width: '100%', padding: 2 }}>
      <Grid item xs={12} sm={6} md={4}>
      <FormControl fullWidth>
            <Typography variant="caption" sx={{ marginBottom: 1, textAlign: 'left', fontSize: '0.7rem' }}>
              Select Index
            </Typography>
            <Select
              value={values.first}
              onChange={handleIndexChange('first')}
              displayEmpty
              input={<OutlinedInput sx={{ height: 30 }} />}
              renderValue={(selected) => !selected ? <em style={{ color: 'gray' }}>Select Index</em> : selected}
            >
              {options.first.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
    </Grid>
      <Grid item xs={12} sm={6} md={4}>
      <FormControl fullWidth>
            <Typography variant="caption" sx={{ marginBottom: 1, textAlign: 'left', fontSize: '0.7rem' }}>
              Select Rank
            </Typography>
            <Select
              value={values.second}
              onChange={handleIndexChange('second')}
              displayEmpty
              input={<OutlinedInput sx={{ height: 30 }} />}
              renderValue={(selected) => !selected ? <em style={{ color: 'gray' }}>Select Rank</em> : selected}
            >
              {options.second.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
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
      
       
      {showTabData && <Overalltabbar />}
    </Box>
  );
};

export default Staticmactown;
