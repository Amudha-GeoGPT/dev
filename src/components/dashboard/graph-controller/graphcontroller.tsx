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
  { city: 'WestBengal', p1: 200, p2: 250, p3: 100 },
  { city: 'TamilNadu', p1: 150, p2: 250, p3: 100 },
  { city: 'AndhraPradesh', p1: 300, p2: 300, p3: 200 },
  { city: 'Rajasthan', p1: 250, p2: 200, p3: 150 },
  { city: 'Mizoram', p1: 200, p2: 250, p3: 150 },
  { city: 'Puducherry', p1: 300, p2: 200, p3: 100 },
  { city: 'Sikkim', p1: 250, p2: 250, p3: 150 },
  { city: 'Nagaland', p1: 200, p2: 100, p3: 150 },
  { city: 'Nagaland', p1: 200, p2: 150, p3: 100 },
  { city: 'Manipur1', p1: 200, p2: 150, p3: 100 },
];

const Graphcontroller: React.FC = () => {

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
            left: 30,
            bottom: 20,
          }}
          barGap={8} // Adds space between bars 
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="city" 
            tick={{ fontSize: 10 }} 
            interval={0}
          >
            <Label value="City's" position="bottom" />
          </XAxis>
          <YAxis>
            <Label value="MAS" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip cursor={false} /> {/* Removes background gray color on hover */}
          <Legend
            layout="horizontal"
            align="right"
            verticalAlign="top"
            wrapperStyle={{ fontSize: '12px', marginRight: '10px', marginTop: '0px' }}
            formatter={renderLegend}
            iconSize={0}
          />
          <Bar dataKey="p1" stackId="a" fill="#001B04" name="P-1" barSize={25} radius={[3, 3, 0, 0]} />
          <Bar dataKey="p2" stackId="a" fill="#A3E635" name="P-2" barSize={25} radius={[3, 3, 0, 0]} />
          <Bar dataKey="p3" stackId="a" fill="#E3FFC4" name="P-3" barSize={25} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Graphcontroller;
