import React from 'react';
import { LineChart, XAxis, YAxis,Legend,Tooltip, CartesianGrid, Line } from 'recharts';
const Recharts = () => {
    const data = [
        { name: 'Jan', uv: 400, pv: 2400 },
        { name: 'Feb', uv: 300, pv: 1398 },
        { name: 'Mar', uv: 200, pv: 9800 },
        // Add more data points as needed
      ];



      const dataSecond = [
        { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
        { name: 'Feb', uv: 300, pv: 1398, amt: 2210 },
        { name: 'Mar', uv: 200, pv: 9800, amt: 2290 },
        { name: 'Apr', uv: 278, pv: 3908, amt: 2000 },
        { name: 'May', uv: 189, pv: 4800, amt: 2181 },
        { name: 'Jun', uv: 239, pv: 3800, amt: 2500 },
        // Add more data points as needed
      ];

      const dataThird= [
        { name: 'Jan', temperature: 10 },
        { name: 'Feb', temperature: 15 },
        { name: 'Mar', temperature: 18 },
        { name: 'Apr', temperature: 22 },
        { name: 'May', temperature: 25 },
        { name: 'Jun', temperature: 28 },
        // Add more data points as needed
      ];
    return (
        <div>
      <LineChart width={400} height={400} data={data} margin={{ top: 50, right: 10, left: 10, bottom: 5 }}>
        <XAxis dataKey="name" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
        <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
      </LineChart>

      <LineChart width={600} height={400} data={dataSecond} margin={{ top: 50, right: 10, left: 10, bottom: 5}}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      <Line type="monotone" dataKey="amt" stroke="#ffc658" />
    </LineChart>

    <LineChart width={600} height={400} data={dataThird}  margin={{ top: 50, right: 10, left: 10, bottom: 5}}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Line type="monotone" dataKey="temperature" stroke="#8884d8" dot={{ r: 6, strokeWidth: 2, fill: 'white' }} />
    </LineChart>

      </div>

    );
  };
  
  export default Recharts;
  