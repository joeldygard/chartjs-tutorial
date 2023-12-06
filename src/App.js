import './App.css';
import jsonData from './JSON/chart_overflow_APST11_SELDK.json';
import React, { useState, useEffect } from 'react';
import CustomChart from './CustomChart';
import ChartOptionsControl from './ChartOptionsControl';
import ChartOptionsDisplay from './ChartOptionsDisplay';
import { parseTimestamp } from './helpers/helperFunctions';

const initialStdOptions = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    line: {
      tension: 0.1,
      borderWidth: 0.75,
      fill: false,
    },
    point: {
      radius: 0,
      hoverRadius: 2.5,
      hitRadius: 10,
    },
  },
  scales: {
    x: {
      type: "timeseries",
      min: '2021-09-16',
      max: '2021-09-17',
      time: {
        unit: 'hour',
        displayFormats: {
          hour: 'MMM-dd HH:mm'
        }
      },
      ticks: {
        source: 'auto',
        autoSkip: false,
        maxTicksLimit: 20,
      },
    },
    y: {
      type: 'linear',
      position: 'left',
    },
    y1: {
      type: 'linear',
      position: 'right',
      display: false,
    }
  },
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: 'x',
        wheel: {
          enabled: true,
        },
      },
      zoom: {
        enabled: true,
        mode: 'x',
        wheel: {
          enabled: true,
        },
      },
    }
  }
}



function App() {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartType, setChartType] = useState('line');
  const [chartOptions, setChartOptions] = useState(initialStdOptions);

  useEffect(() => {
    const datasets = jsonData.chartsData.map((chart) => {
      const data = chart.data.map((dataPoint) => ({
        x: parseTimestamp(dataPoint.timestamp),
        y: dataPoint.value,
      }));

      return {
        label: chart.name,
        data: data,
      };
    });

    setChartData({ datasets });
  }, []);

  const handleChartTypeChange = (newChartType) => {
    setChartType(newChartType);

    let typeSpecificOptions;
    switch (newChartType) {
      case 'line':
        typeSpecificOptions = {
          elements: {
            line: {
              tension: 0.4,
              borderWidth: 2,
              fill: true,
            },
            point: {
              radius: 3,
              hoverRadius: 5,
              hitRadius: 10,
            },
          },
        };
        break;
      case 'bar':
        typeSpecificOptions = {
          elements: {
            bar: {
              borderWidth: 1,
              borderRadius: 4,
              barThickness: 15,
            },
          },
        };
        break;
      case 'bubble':
        typeSpecificOptions = {
          elements: {
            point: {
              radius: (context) => context.raw.size, // Dynamic size based on data
            },
          },
        };
        break;
      case 'scatter':
        typeSpecificOptions = {
          elements: {
            point: {
              radius: 4,
              hoverRadius: 6,
            },
          },
        };
        break;
      // Add more cases if needed
      default:
        typeSpecificOptions = {};
    }
    setChartOptions({
      ...initialStdOptions,
      ...typeSpecificOptions,
    });
  };

  const stdOptions = {
    // Standard options for all chart types
    // ...
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <div style={{ flexBasis: '25%', overflow: 'scroll' }}>
        <ChartOptionsDisplay options={chartOptions} />
      </div>
      <div style={{ flexBasis: '75%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxHeight: "100vh" }}>
        <div style={{ height: "60vh", width: "70vw" }}>
          <CustomChart type={chartType} data={chartData} options={chartOptions} />
        </div>
        <div style={{ maxHeight: "40vh", width: "70vw", overflowY: "scroll", padding: "10px", border: "1px solid lightgray", borderRadius: "5px" }}>
          <ChartOptionsControl setOptions={setChartOptions} options={chartOptions} chartType={chartType} setChartType={setChartType} />
        </div>
      </div>
    </div>
  );
}

export default App;
