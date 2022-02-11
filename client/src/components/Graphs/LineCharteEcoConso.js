import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "../../styles/recharts.css";

function LineCharteEcoConso({ selectedRegion, token }) {
  const [data, setData] = React.useState(null);

  //Make request to API each time selectedRegion change.
  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/eco2/${selectedRegion}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        setData([]);
        console.log(
          `API not responding LineChart-> ${process.env.REACT_APP_API_URL}/eco2/${selectedRegion}\n${error}`
        );
      });
    return () => {};
  }, [selectedRegion]);
  return (
    <LineChart
      width={400}
      height={200}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="jour_heure" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="consommation"
        stroke="#82ca9d"
        dot={false}
      />
    </LineChart>
  );
}

export default LineCharteEcoConso;
