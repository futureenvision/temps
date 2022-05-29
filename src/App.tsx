import { useEffect, useState } from "react";
import "./App.css";
import * as d3 from "d3";

interface ITemps {
  temp: number;
  time: string;
}

const width = 600;
const height = 400;

function App() {
  const [message, setMessage] = useState([""]);

  const [temps, setTemps] = useState<Array<ITemps>>([
    {
      temp: 36,
      time: "1653856094109",
    },
    {
      temp: 35,
      time: "1653856094109",
    },
    {
      temp: 34,
      time: "1653856094109",
    },
    {
      temp: 37,
      time: "1653856094109",
    },
    {
      temp: 38,
      time: "1653856094109",
    },
    {
      temp: 38,
      time: "1653856094109",
    },
    {
      temp: 37,
      time: "1653856094109",
    },
    {
      temp: 36,
      time: "1653856094109",
    },
    {
      temp: 38,
      time: "1653856094109",
    },
    {
      temp: 39,
      time: "1653856094109",
    },
    {
      temp: 38,
      time: "1653856094109",
    },
    {
      temp: 37,
      time: "1653856094109",
    },
    {
      temp: 36,
      time: "1653856094109",
    },
  ]);

  const drawChart = (data: Array<ITemps>) => {
    const svg = d3
      .select(".graph")
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid black");

    var selection = svg.selectAll("rect").data(data.map((d) => d.temp));
    const t: any = [0, d3.max(data.map((d) => d.temp))];
    var yScale = d3
      .scaleLinear()
      .domain(t)
      .range([0, height - 100]);

    selection
      .transition()
      .duration(300)
      .attr("height", (d: any) => yScale(d))
      .attr("y", (d: any) => height - yScale(d));

    selection
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 45)
      .attr("y", (d) => height)
      .attr("width", 40)
      .attr("height", 0)
      .attr("fill", (d) => {
        if (d > 36) {
          return "red";
        } else {
          return "green";
        }
      })
      .transition()
      .duration(300)
      .attr("height", (d: any) => yScale(d))
      .attr("y", (d: any) => height - yScale(d));

    selection
      .exit()
      .transition()
      .duration(300)
      .attr("y", (d) => height)
      .attr("height", 0)
      .remove();
  };

  const onCalculate = () => {
    drawChart(temps);

    let tt = [];
    for (const temp of temps) {
      if (temp.temp > 36) {
        tt.push(temp.temp);
        message.push("WARNING: User is over 36 degrees");

        if (tt.length > 3) {
          console.log("[temp] -> ", temp);
          let total = 0;
          tt.map((t) => { total += t; });
          message.push(`WARNING: User is in danger of overheating, average temperature of ${(total / tt.length)}%`);
          setMessage(message);
          tt = [];
        }
      } else {
        tt = [];
      }
    }

    setCount(count + 1);
  };

  const messages = message.map((m, i) => <p key={i}> #{m}</p>);
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <h3>User Temperatures</h3>
      <svg className="graph"></svg>
      <br />
      <button onClick={onCalculate}>Calculate</button>
      {messages}
      {count}
    </div>
  );
}

export default App;
