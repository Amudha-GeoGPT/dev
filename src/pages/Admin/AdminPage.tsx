/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Box, Button, Dialog, Grid, IconButton, styled, Theme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomAutocomplete from '../../components/common/CustomAutocomplete';
import CustomTextfield from '../../components/common/CustomTextfield';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { BoxOwnProps } from '@mui/system';
import { JSX } from 'react/jsx-runtime';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'white',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  width: '100%',
  height: '50px',
  minHeight: '60px',
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1),
    background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)'
  }
}));

interface ColumnOption {
  name: string;
  children: ColumnOption[];
}

export const AdminPage = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    selectedRoles: [] as string[],
    reportName: '',
    columnName: [] as string[],
    openDialog: false
  });
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  

  const columnOptions: ColumnOption[] = [
    {
      name: 'Name',
      children: [
        {
          name: 'Age',
          children: [
            {
              name: 'TL',
              children: []
            }
          ]
        }
      ]
    }
  ];
  const flattenedOptions = columnOptions.map(option => option.name);

  const handleFormChange = (field: string, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateReport = () => handleFormChange('openDialog', true);
  
  const handleContinue = () => {
    handleFormChange('openDialog', false);
    navigate('/indiaMap');
  };

  const handleFilter = (columnName: string) => {
    // Implement filter logic here
    console.log('Filtering:', columnName);
  };

  const handleSort = (columnName: string) => {
    // Implement sort logic here
    console.log('Sorting:', columnName);
  };

  const handleExpand = (columnName: string) => {
    setExpandedItems(prev =>
      prev.includes(columnName)
        ? prev.filter(item => item !== columnName)
        : [...prev, columnName]
    );
  };

  const isExpanded = (columnName: string) => expandedItems.includes(columnName);

  return (
    <>
      <StyledBox>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              options={["IT", "SALES", "OTHER"]}
              label="Select Role"
              placeholder="Choose Role"
              onInputChange={(value) => handleFormChange('selectedRoles', value)}
              selectAllLabel="Select All"
              deselectAllLabel="Deselect All"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomTextfield
              label="Report Name"
              value={formState.reportName}
              onChange={(e) => handleFormChange('reportName', e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
           
<CustomAutocomplete
  options={flattenedOptions}  // Pass the flattened array of strings
  label="Column Name"
  placeholder="Select columns"
  value={formState.columnName}
  onInputChange={(value) => handleFormChange('columnName', value)}
  renderOption={(props: JSX.IntrinsicAttributes & { component: React.ElementType<any, keyof React.JSX.IntrinsicElements>; } & BoxOwnProps<Theme> & Omit<any, keyof BoxOwnProps<Theme>>, option: string) => (
    <Box {...props}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <span>{option.toString()}</span>
        <Box>
          <IconButton onClick={() => handleFilter(option.toString())} size="small">
            <FilterListIcon />
          </IconButton>
          <IconButton onClick={() => handleSort(option.toString())} size="small">
            <SortIcon />
          </IconButton>
          {typeof option === 'string' && columnOptions.find(col => col.name === option)?.children && columnOptions.find(col => col.name === option)!.children!.length > 0 && (
            <IconButton onClick={() => handleExpand(option)} size="small">
              {isExpanded(option) ? <RemoveIcon /> : <AddIcon />}
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  )}/>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              onClick={handleGenerateReport}
              fullWidth
              sx={{
                background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
                height: '56px'
              }}
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </StyledBox>

      <StyledDialog
        open={formState.openDialog}
        onClose={() => handleFormChange('openDialog', false)}
      >
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <h2>Success!</h2>
          <p>Report generated successfully! 🎉</p>
          <Button
            onClick={handleContinue}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
              width: '150px',
              mt: 2
            }}
          >
            Continue
          </Button>
        </Box>
      </StyledDialog>
    </>
  );
};