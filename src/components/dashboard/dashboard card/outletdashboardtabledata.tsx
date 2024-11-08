import React, { useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  styled,
  Box,
  IconButton
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { Add, Remove } from '@mui/icons-material';

interface District {
  districtName: string;
  jc13: number;
  jc01: number;
  jc02: number;
  subDistricts?: District[];
}

interface StateData {
  stateName: string;
  jc13: number;
  jc01: number;
  jc02: number;
  districts: District[];
}

const data: StateData[] = [
  {
    stateName: 'Tamil Nadu',
    jc13: 126555,
    jc01: 126555,
    jc02: 126555,
    districts: [
      {
        districtName: 'Ariyalur',
        jc13: 36500,
        jc01: 36500,
        jc02: 36500,
        subDistricts: [
          { districtName: 'Pasanur', jc13: 10200, jc01: 10200, jc02: 10200 },
          { districtName: 'Semparai', jc13: 10200, jc01: 10200, jc02: 10200 },
          { districtName: 'Ammanoor', jc13: 10200, jc01: 10200, jc02: 10200 },
          { districtName: 'Kainoor', jc13: 10200, jc01: 10200, jc02: 10200 }
        ]
      }
    ]
  }
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#001B04',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#F9F9F9",
  },
  '&:nth-of-type(even)': {
    backgroundColor: "#FFFFFF",
  },
}));

const TotalRow = styled(TableRow)(() => ({
  backgroundColor: '#001B04',
  '& td': {
    color: 'white',
    fontWeight: 'bold'
  }
}));

const DashboardTabledata: React.FC = () => {
  const [expandedStates, setExpandedStates] = useState<{ [key: string]: boolean }>({});
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

  const handleExpandClick = (key: string, isState: boolean, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event from bubbling up to the parent
    if (isState) {
      setExpandedStates((prev) => ({
        ...prev,
        [key]: !prev[key]
      }));
    } else {
      setExpandedRows((prev) => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  const renderDistrictRow = (district: District, level: number, key: string) => {
    const isExpanded = expandedRows[key];
    const hasSubDistricts = district.subDistricts && district.subDistricts.length > 0;

    return (
      <React.Fragment key={key}>
        <StyledTableRow>
          <TableCell width={30}>
            {hasSubDistricts && (
              <IconButton size="small" onClick={(event) => handleExpandClick(key, false, event)}>
                {isExpanded ? <Remove /> : <Add />}
              </IconButton>
            )}
          </TableCell>
          <TableCell style={{ paddingLeft: level * 20 }}>
            <Typography color="textSecondary" variant="subtitle2">
              {district.districtName}
            </Typography>
          </TableCell>
          <TableCell>{district.jc13}</TableCell>
          <TableCell>{district.jc01}</TableCell>
          <TableCell>{district.jc02}</TableCell>
        </StyledTableRow>
        {isExpanded && district.subDistricts && district.subDistricts.map((subDistrict, index) =>
          renderDistrictRow(subDistrict, level + 1, `${key}-${index}`)
        )}
      </React.Fragment>
    );
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'auto', p: 2 }}>
      <TableContainer>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={30} />
              <StyledTableCell>State</StyledTableCell>
              <StyledTableCell>JC13</StyledTableCell>
              <StyledTableCell>JC01</StyledTableCell>
              <StyledTableCell>JC02</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((state, stateIndex) => {
              const stateKey = `state-${stateIndex}`;
              const isStateExpanded = expandedStates[stateKey];
              return (
                <React.Fragment key={stateKey}>
                  <StyledTableRow>
                    <TableCell width={30}>
                      <IconButton size="small" onClick={(event) => handleExpandClick(stateKey, true, event)}>
                        {isStateExpanded ? <Remove /> : <Add />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{state.stateName}</TableCell>
                    <TableCell>{state.jc13}</TableCell>
                    <TableCell>{state.jc01}</TableCell>
                    <TableCell>{state.jc02}</TableCell>
                  </StyledTableRow>
                  {isStateExpanded && state.districts.map((district, districtIndex) =>
                    renderDistrictRow(district, 1, `${stateKey}-${districtIndex}`)
                  )}
                </React.Fragment>
              );
            })}
            <TotalRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell>126555</TableCell>
              <TableCell>126555</TableCell>
              <TableCell>126555</TableCell>
            </TotalRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DashboardTabledata;