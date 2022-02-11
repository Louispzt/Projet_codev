import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "../../styles/recharts.css";
function AreaChartEcoSource({ selectedRegion, token }) {
  const [data, setData] = React.useState(null);

  const fetchData = () => {};
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
          `API not responding AreaChart -> ${process.env.REACT_APP_API_URL}/eco2/${selectedRegion}\n${error}`
        );
      });
    return () => {};
  }, [selectedRegion]);

  const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(0)}%`;

  const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0;

    return toPercent(ratio, 2);
  };

  const renderTooltipContent = (o) => {
    const { payload = [], label } = o;
    if (payload == null) return <div></div>;
    const total = payload.reduce((result, entry) => result + entry.value, 0);

    return (
      <div className="customized-tooltip-content">
        <p className="total">{`${label} (Total: ${total})`}</p>
        <ul className="list">
          {payload.map((entry, index) => (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}(${getPercent(
                entry.value,
                total
              )})`}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <div className="rechart-wrapper">
      <AreaChart
        width={400}
        height={200}
        data={data}
        stackOffset="expand"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jour_heure" />
        <YAxis tickFormatter={toPercent} />
        <Tooltip content={renderTooltipContent} />
        <Area
          type="monotone"
          dataKey="nucleaire"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="solaire"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
        <Area
          type="monotone"
          dataKey="eolien"
          stackId="1"
          stroke="#ff4d4d"
          fill="#ff9999"
        />
        <Area
          type="monotone"
          dataKey="hydraulique"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="thermique"
          stackId="1"
          stroke="#5D1D70"
          fill="#B138D6"
        />
        <Area type="monotone" dataKey="bioenergies" stackId="1" />
      </AreaChart>
    </div>
  );
}

export default AreaChartEcoSource;
