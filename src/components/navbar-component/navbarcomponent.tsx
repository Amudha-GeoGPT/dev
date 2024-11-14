import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { Box, Button, Divider, useMediaQuery,Grid} from '@mui/material';
import Tabledata from '../dashboard/data-grid/tabledata';
import Graphcontroller from '../dashboard/graph-controller/graphcontroller';
import BarChartIcon from '@mui/icons-material/BarChart';
import Mapcontroller from '../dashboard/map-controller/mapcontroller';
import { useTheme } from '@mui/material/styles';
import Staticmacoutlet from '../dashboard/systematic outlet/outletplanning';
import IndiaMap from '../dashboard/map/tamilnadumap';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, overflow: 'hidden' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const Overalltabbar = () => {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(event);
    };

    return (
        <Box sx={{ width: '100%' }}>
          
    <Divider sx={{ my: '10px' }} />
    <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} md={9}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="responsive tabs"
                    variant={isSmDown ? 'scrollable' : 'standard'}
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{ display: 'flex', alignItems: 'start' }}
                >
                    <Tab sx={{ textTransform: 'none',width:200 }} label="Table" {...a11yProps(0)} disableRipple />
                    <Tab sx={{ textTransform: 'none',width:200 }} label="Graph" {...a11yProps(1)} disableRipple />
                    <Tab sx={{ textTransform: 'none',width:200 }} label="Map" {...a11yProps(2)} disableRipple />
                </Tabs>
            </Box>
        </Grid>
        
        <Grid item xs={12} md={3} display="flex" justifyContent={{ xs: 'center', md: 'flex-end' }}>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#001B04', // Dark green color
                    color: '#FFFFFF',
                    textTransform: 'none',
                    fontSize: '12px',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    '&:hover': {
                        backgroundColor: '#0A330A', // Slightly darker on hover
                    },
                }}
                startIcon={<BarChartIcon />}
            >
                Export CSV
            </Button>
        </Grid>
    </Grid>

   
           

            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <CustomTabPanel value={value} index={0}>
                <Tabledata />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                <Graphcontroller/>
                    
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <IndiaMap/>
                </CustomTabPanel>
            </Box>
        </Box>
    );
};

export default Overalltabbar;
