import { Box } from '@mui/material';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

interface DataProps {
  city: string;
  p1: number;
  p2: number;
  p3: number;
}

const data: DataProps[] = [
  { city: 'Karnataka', p1: 200, p2: 300, p3: 100 },
  { city: 'Maharashtra', p1: 400, p2: 400, p3: 200 },
  { city: 'Gujarat', p1: 300, p2: 200, p3: 150 },
  { city: 'West Bengal', p1: 200, p2: 250, p3: 100 },
  { city: 'Tamil Nadu', p1: 150, p2: 250, p3: 100 },
  { city: 'Andhra Pradesh', p1: 300, p2: 300, p3: 200 },
  { city: 'Rajasthan', p1: 250, p2: 200, p3: 150 },
  { city: 'Mizoram', p1: 200, p2: 250, p3: 150 },
  { city: 'Puducherry', p1: 300, p2: 200, p3: 100 },
  { city: 'Sikkim', p1: 250, p2: 250, p3: 150 },
  { city: 'Nagaland', p1: 200, p2: 100, p3: 150 },
  { city: 'Nagaland', p1: 200, p2: 150, p3: 100 },
  { city: 'Manipur1', p1: 200, p2: 150, p3: 100 },
];

const Graphcontroller: React.FC = () => {

    // Custom formatter for legend to render round color indicators
    const renderLegend = (value: string, entry: any) => {
      const { color } = entry;
      return (
        <span style={{ display: 'flex', alignItems: 'center', marginRight: 15 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: color,
              marginRight: 5,
            }}
          />
          {value}
        </span>
      );
    };


  return (
    <Box>
    <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 40, // Increased left margin for Y-axis labels
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" tick={{ fontSize: 9 }}>
            <Label value="City's" position="bottom" offset={1} />
          </XAxis>
          <YAxis>
            <Label value="MAS" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend
            layout="horizontal"
            align="right"
            verticalAlign="top" // Moved legend to the top-right corner
            wrapperStyle={{ fontSize: '12px', marginRight: '10px', marginTop: '0px' }}
            formatter={renderLegend}
             iconSize={0}
          />
         <Bar dataKey="p1" stackId="a" fill="#001B04" name="P-1" barSize={30} radius={[3, 3, 0, 0]} />
         <Bar dataKey="p2" stackId="a" fill="#A3E635" name="P-2" barSize={30} radius={[3, 3, 0, 0]} />
         <Bar dataKey="p3" stackId="a" fill="#E3FFC4" name="P-3" barSize={30} radius={[3, 3, 0, 0]} />

        </BarChart>
      </ResponsiveContainer>
     
    
    </Box>
  );
};

export default Graphcontroller;