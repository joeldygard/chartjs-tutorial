import React from 'react';
import { Chart } from 'react-chartjs-2';
import ChartJS from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom'; // This is a plugin for adding zoom and scroll to our charts
import 'chartjs-adapter-luxon'; // This is a plugin for parsing dates with Luxon

ChartJS.register(zoomPlugin);

const CustomChart = ({ type, data, options, ...props }) => {
    if (!options) {
        options = {};
    }
    if (!type) {
        type = 'line';
    }
    return (
        <Chart type={type} data={data} options={options} {...props} />
    );
};


export default CustomChart;
