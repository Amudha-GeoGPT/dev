
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Autocomplete,
  useTheme,
  useMediaQuery,
  Grid,
  MenuItem,
  FormControl,
  Typography,
  OutlinedInput,
  Select,
  Chip,
  Stack,
  ListSubheader,
  InputAdornment,
} from '@mui/material';
// import AssessmentIcon from '@mui/icons-material/Assessment';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';
import { SelectChangeEvent } from '@mui/material/Select';
import Overalltabbar from '../dashboard card/overalltoolbar';
import DashboardIcon from '../../../assets/images/svg/akar-icons_dashboard.svg';
import MapIcon from '../../../assets/images/svg/map 1.svg';

// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const data = {
  states: [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Delhi',
    'Chandigarh',
  ],
  districts: ['District 1', 'District 2', 'District 3'],
  taluks: ['Taluk 1', 'Taluk 2', 'Taluk 3'],
  villages: ['Village 1', 'Village 2', 'Village 3'],
  urbanRural: ['Urban', 'Rural'],
  marketCriteria: ['Criteria 1', 'Criteria 2', 'Criteria 3'],
};

const options = {
  first: [
    { label: 'Show All', value: 'Show All' },
    { label: 'Top 10', value: 'Top 10' },
    { label: 'Top 50', value: 'Top 50' },
    { label: 'Top 100', value: 'Top 100' },
    { label: 'Bottom 10', value: 'Bottom 10' },
    { label: 'Bottom 50', value: 'Bottom 50' },
    { label: 'Bottom 100', value: 'Bottom 100' },
  ],
};

const SelectionField = ({
  label,
  options,
  selectedValues,
  setSelectedValues,
  searchTerm,
  setSearchTerm,
}: any) => {
  const filteredOptions = options.filter((option: string) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    setSelectedValues(options);
  };

  const handleDeselectAll = () => {
    setSelectedValues([]);
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: string[]) => {
    setSelectedValues(newValue);
  };

  return (
    <FormControl fullWidth>
      <Typography
        variant='caption'
        sx={{ marginBottom: 1, textAlign: 'left', fontSize: '0.7rem' }}
      >
        {label}
      </Typography>
      <Autocomplete
        multiple
        value={selectedValues}
        onChange={handleChange}
        options={filteredOptions}
        disableCloseOnSelect
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => (
          <Box component='li' {...props}>
            <CheckIcon color={selected ? 'primary' : 'action'} />
            <Typography>{option}</Typography>
          </Box>
        )}
        renderTags={(value, getTagProps) => (
          <div
            style={{
              maxHeight: 40,
              overflowY: 'auto',
              display: 'flex',
              flexWrap: 'wrap',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}
          >
            {value.map((option, index) => (
              <Chip
                // key={option}
                label={option}
                {...getTagProps({ index })}
                onDelete={() => {
                  setSelectedValues((prev: any) =>
                    prev.filter((state: any) => state !== option)
                  );
                }}
              />
            ))}
          </div>
        )}
        ListboxProps={{ style: { maxHeight: 300, overflow: 'auto', '&::-webkit-scrollbar': {
      display: 'none'
    },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none' } }}
        ListboxComponent={React.forwardRef((props: any, ref) => (
          <Box ref={ref}>
            <ListSubheader
              sx={{
                bgcolor: 'background.paper',
                position: 'sticky',
                top: 0,
                zIndex: 2,
                padding: 1,
              }}
            >
              <TextField
                fullWidth
                variant='outlined'
                placeholder={`Search ${label}`}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { height: 40 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </ListSubheader>
            <Box {...props} />
            <Box {...props}>
              <ListSubheader
                sx={{
                  bgcolor: 'background.paper',
                  position: 'sticky',
                  bottom: 0,
                  zIndex: 1,
                  paddingY: 1,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
              <Button
  onClick={handleSelectAll}
  variant='outlined'
  sx={{
    marginRight: { xs: 0.5, sm: 1 },
    fontSize: { xs: '0.75rem', sm: '0.875rem' },
    padding: { xs: '2px 4px', sm: '2px 8px' },
    minWidth: { xs: '70px', sm: '90px' }
  }}
>
  Select All
</Button>

<Button 
  onClick={handleDeselectAll} 
  variant='outlined'
  sx={{
    fontSize: { xs: '0.75rem', sm: '0.875rem' },
    padding: { xs: '2px 4px', sm: '2px 8px' },
    minWidth: { xs: '70px', sm: '90px' }
  }}
>
  Deselect All
</Button>

              </ListSubheader>
            </Box>
          </Box>
        ))}
        renderInput={(params) => (
          <TextField
  {...params}
  variant='outlined'
  label={`Select one or more ${label}`}
  placeholder={`Select one or more ${label}`}
  sx={{
    '& .MuiInputBase-input': {
                    height: 11.3,
                    paddingTop: 16, // Adjust padding to make space for the label
                  },
                  '& .MuiInputLabel-root': {
                    transform: 'translate(14px, 8px) scale(1)', // Adjust the initial transform
                  },
                  '& .MuiInputLabel-shrink': {
                    transform: 'translate(14px, -7px) scale(0.75)', // Adjust the shrink transform
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px', // Reduced border radius
                    background: '#FFFFFF',
                    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                   
                  },
    
  }}
  // InputProps={{
  //   ...params.InputProps,
  //   endAdornment: (
  //     <InputAdornment position="end">
  //       <ExpandMoreIcon
  //         sx={{
  //           position: 'relative',
  //           top: { xs: '0px', sm: '1px', md: '2px' }, // Adjust top position for different screen sizes
  //           right: { xs: '-10px', sm: '-20px', md: '-30px' }, // Adjust right position for different screen sizes
  //         }}
  //       />
  //     </InputAdornment>
  //   ),
  // }}
/>

        )}
        popupIcon={null}
        openOnFocus
      />
    </FormControl>
  );
};

const Staticmacoutlet: React.FC = () => {
  const [activeButton, setActiveButton] = useState<'dashboard' | 'map'>('dashboard');  
  const [showDashboardContent, setShowDashboardContent] = useState(false);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedTaluks, setSelectedTaluks] = useState<string[]>([]);
  const [selectedVillages, setSelectedVillages] = useState<string[]>([]);
  const [selectedUrbanRural, setSelectedUrbanRural] = useState<string[]>([]);
  const [selectedMarketCriteria, setSelectedMarketCriteria] = useState<
    string[]
  >([]);
  const [showTabData, setShowTabData] = useState(false);
  const [values, setValues] = useState({ first: '', second: '' });
  const [searchTermState, setSearchTermState] = useState('');
  const [searchTermDistrict, setSearchTermDistrict] = useState('');
  const [searchTermTaluk, setSearchTermTaluk] = useState('');
  const [searchTermVillage, setSearchTermVillage] = useState('');
  const [searchTermUrbanRural, setSearchTermUrbanRural] = useState('');
  const [searchTermMarketCriteria, setSearchTermMarketCriteria] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const drawerWidth = isMobile ? 200 : 190;

  const handleIndexChange =
    (type: 'first' | 'second') => (event: SelectChangeEvent<string>) => {
      setValues({ ...values, [type]: event.target.value });
    };

  return (
    <Box
      alignItems='center'
      sx={{
        flexGrow: 1,
        p: 2,
        overflow: 'auto',
        ml: { sm: `${drawerWidth}px` },
        marginTop: '60px',
      }}
    >
     <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 2,
        backgroundColor: '#E2F2E5',
        padding: '4px',
        borderRadius: '8px',
        width: '30%', // Set a percentage-based width
        maxWidth: '270px', // Optional: Set a maximum width
      }}
    >
      <Button
        variant="contained"
        onClick={() => setShowDashboardContent(true)}
        sx={{
          backgroundColor: activeButton === 'dashboard' ? '#003809' : '#FAFAFA',
          color: activeButton === 'dashboard' ? '#FFFFFF' : '#1E1E1E',
          width: 126,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          border: activeButton === 'dashboard' ? 'none' : '1px solid #E1D9F3',
          boxShadow: activeButton === 'dashboard' ? '0px 2px 8px rgba(0, 0, 0, 0.14)' : 'none',
          '&:hover': {
            backgroundColor: activeButton === 'dashboard' ? '#002B07' : '#FAFAFA',
          },
        }}
      >
       <Box
    component="img"
    src={DashboardIcon} sx={{ color: activeButton === 'dashboard' ? '#FFFFFF' : '#1E1E1E' }} />
        <Typography fontWeight="500" fontSize="11px">
          Dashboard
        </Typography>
      </Button>

      <Button
        variant="outlined"
        onClick={() => setActiveButton('map')}
        sx={{
          backgroundColor: activeButton === 'map' ? '#003809' : '#FAFAFA',
          color: activeButton === 'map' ? '#FFFFFF' : '#1E1E1E',
          width: 115,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          border: activeButton === 'map' ? 'none' : '1px solid #E1D9F3',
          boxShadow: activeButton === 'map' ? '0px 2px 8px rgba(0, 0, 0, 0.14)' : 'none',
          '&:hover': {
            backgroundColor: activeButton === 'map' ? '#002B07' : '#FAFAFA',
          },
        }}
      >
        <Box
    component="img"
    src={MapIcon} sx={{ color: activeButton === 'map' ? '#FFFFFF' : '#1E1E1E' }} />
        <Typography fontWeight="500" fontSize="13px">
          Map View
        </Typography>
      </Button>
    </Box>
   
      {showDashboardContent && (
      <Grid container spacing={2} sx={{ width: '100%', paddingLeft: 2 }}>
        <Grid item xs={12} sm={6} md={1.713}>
          <SelectionField
            label='State'
            options={data.states}
            selectedValues={selectedStates}
            setSelectedValues={setSelectedStates}
            searchTerm={searchTermState}
            setSearchTerm={setSearchTermState}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1.713}>
          <SelectionField
            label='District'
            options={data.districts}
            selectedValues={selectedDistricts}
            setSelectedValues={setSelectedDistricts}
            searchTerm={searchTermDistrict}
            setSearchTerm={setSearchTermDistrict}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1.713}>
          <SelectionField
            label='Taluk'
            options={data.taluks}
            selectedValues={selectedTaluks}
            setSelectedValues={setSelectedTaluks}
            searchTerm={searchTermTaluk}
            setSearchTerm={setSearchTermTaluk}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1.713}>
          <SelectionField
            label='Village'
            options={data.villages}
            selectedValues={selectedVillages}
            setSelectedValues={setSelectedVillages}
            searchTerm={searchTermVillage}
            setSearchTerm={setSearchTermVillage}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1.713}>
          <SelectionField
            label='Urban/Rural'
            options={data.urbanRural}
            selectedValues={selectedUrbanRural}
            setSelectedValues={setSelectedUrbanRural}
            searchTerm={searchTermUrbanRural}
            setSearchTerm={setSearchTermUrbanRural}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1.713}>
          <FormControl fullWidth>
            <Typography
              variant='caption'
              sx={{ marginBottom: 1, textAlign: 'left', fontSize: '0.7rem' }}
            >
              Top-Rank
            </Typography>
            <Select
              value={values.first}
              onChange={handleIndexChange('first')}
              displayEmpty
              input={<OutlinedInput  sx={{ marginTop:-0.1,height: 44, borderRadius: '8px' }} />}
              renderValue={(selected) =>
                !selected ? (
                  <em style={{ color: 'gray' }}>Select Top-Rank</em>
                ) : (
                  selected
                )
              }
            >
              {options.first.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={1.713}>
          <SelectionField
            label='Market Criteria'
            options={data.marketCriteria}
            selectedValues={selectedMarketCriteria}
            setSelectedValues={setSelectedMarketCriteria}
            searchTerm={searchTermMarketCriteria}
            setSearchTerm={setSearchTermMarketCriteria}
          />
        </Grid>
      </Grid>
       )}
        {showDashboardContent && (
      <Stack
      spacing={2}
      direction='row'
      sx={{ justifyContent: 'flex-end', width: '100%', marginTop: '15px', paddingRight: '15px' }}
    >
      <Button
        variant='contained'
        onClick={() => setShowTabData(false)}
        sx={{
          backgroundColor: '#E3E3E3',
          color: '#1E1E1E',
          padding: '12px 16px',
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'capitalize',
          boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05), inset 0px 0px 0px 1px rgba(16, 24, 40, 0.18), inset 0px -2px 0px rgba(16, 24, 40, 0.05)',
          borderRadius: '8px',
          width: '93px',
          height: '44px',
          '&:hover': {
            backgroundColor: '#d3d3d3',
          }
        }}
      >
        Clear All
      </Button>
      <Button
        variant='contained'
        onClick={() => setShowTabData(true)}
        sx={{
          backgroundColor: '#001B04',
          color: '#FFFFFF',
          padding: '12px 16px',
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'capitalize',
          boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05), inset 0px 0px 0px 1px rgba(16, 24, 40, 0.18), inset 0px -2px 0px rgba(16, 24, 40, 0.05)',
          borderRadius: '8px',
          width: '114px',
          height: '44px',
          '&:hover': {
            backgroundColor: '#001303',
          }
        }}
      >
        Apply Filter
      </Button>
      </Stack>
      // {showTabData && <Overalltabbar />}
    )}
     {showTabData && <Overalltabbar />}
    </Box>
  );
};

export default Staticmacoutlet;
