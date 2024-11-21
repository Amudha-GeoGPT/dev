import React from 'react';
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
  Checkbox,
  Button
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

// Define the types for the data
interface Reason {
  stateName: string;
  districtName: string;
  totalPopulation: number;
  noOfHousehold: number;
  mis: number;
}

const reasonList: Reason[] = [
  { stateName: 'Andhra Pradesh', districtName: 'Amaravati', totalPopulation: 9621551, noOfHousehold: 2377056, mis: 100 },
  { stateName: 'Tamil Nadu', districtName: 'Chennai', totalPopulation: 11060148, noOfHousehold: 2430616, mis: 94.507 },
  { stateName: 'Assam', districtName: 'Dispur', totalPopulation: 9356962, noOfHousehold: 2027743, mis: 91.665 },
  { stateName: 'Bihar', districtName: 'Patna', totalPopulation: 9429408, noOfHousehold: 2076607, mis: 88.428 },
  { stateName: 'Karnataka', districtName: 'Bangalore', totalPopulation: 10009781, noOfHousehold: 2283567, mis: 77.796 },
  { stateName: 'Punjab', districtName: 'Chandigarh', totalPopulation: 7214225, noOfHousehold: 1705506, mis: 63.795 },
  // Add more data as needed
];

// Styled components for the table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Tabledata: React.FC = () => {

   // Function to handle CSV download
   const downloadCSV = () => {
    const headers = ['State Name', 'District Name', 'Total Population', 'No Of Household', 'MIS'];
    const rows = reasonList.map(reason => [
      reason.stateName,
      reason.districtName,
      reason.totalPopulation,
      reason.noOfHousehold,
      reason.mis
    ]);

    let csvContent = "data:text/csv;charset=utf-8,"
      + [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Box>
        {/* <Button variant="contained" color="primary" onClick={downloadCSV} sx={{ mb: 2 }}>
        Download CSV
      </Button> */}
      <TableContainer
        sx={{
          width: '100%',
          maxHeight: 430, // Limit the height to show only 5 rows (adjust as needed)
          overflowY: 'scroll', // Enable vertical scrolling
          paddingRight: '17px', // Add padding to hide the scrollbar
          '&::-webkit-scrollbar': {
            display: 'none', // Hide the scrollbar in Webkit browsers
          },
          msOverflowStyle: 'none',  // Hide the scrollbar for Internet Explorer and Edge
          scrollbarWidth: 'none',   // Hide the scrollbar for Firefox
        }}
      >
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox />
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" width={200}>State Name</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2">District Name</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2">Total Population</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2">No Of Household</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2">MIS</Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reasonList.map((reason, index) => (
              <StyledTableRow key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2">
                    {reason.stateName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2">
                    {reason.districtName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2">
                    {reason.totalPopulation}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2">
                    {reason.noOfHousehold}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2">
                    {reason.mis}
                  </Typography>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Tabledata;
