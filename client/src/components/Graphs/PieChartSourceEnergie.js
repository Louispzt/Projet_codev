import React from "react";
import { PieChart, Pie } from "recharts";

function PieChartSourceEnergie({ selectedRegion, token }) {
  const [dataSource, setDataSource] = React.useState([]);
  const [dataType, setDataType] = React.useState([]);
  //Make request to API each time selectedRegion change.
  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/eco2/sum/${selectedRegion}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let dataSourceTemp = [];
        let dataTypeTemp = [];
        const sources = [
          "thermique",
          "nucleaire",
          "solaire",
          "hydraulique",
          "bioenergies",
          "eolien",
        ];
        const types = ["non_renewable", "renewable"];
        for (const source of sources) {
          dataSourceTemp.push({ name: source, value: res[source] });
        }
        for (const type of types) {
          dataTypeTemp.push({ name: type, value: res[type] });
        }
        setDataSource(dataSourceTemp);
        setDataType(dataTypeTemp);
      })
      .catch((error) => {
        setDataSource([]);
        setDataType([]);
        console.log(
          `API not responding PieChart -> ${process.env.REACT_APP_API_URL}/eco2/${selectedRegion}\n${error}`
        );
      });
    return () => {};
  }, [selectedRegion]);
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return dataSource[index].name;
  };

  return (
    <PieChart width={400} height={200}>
      <Pie
        startAngle={180}
        endAngle={0}
        data={dataType}
        dataKey="value"
        cx={200}
        cy={200}
        outerRadius={60}
        fill="#8884d8"
        key={Math.random()}
      />
      <Pie
        startAngle={180}
        endAngle={0}
        data={dataSource}
        dataKey="value"
        cx={200}
        cy={200}
        key={Math.random()}
        innerRadius={70}
        outerRadius={120}
        isAnimationActive={true}
        legendType="line"
        label={renderCustomizedLabel}
        fill="#82ca9d"
      />
    </PieChart>
  );
}

export default PieChartSourceEnergie;
