import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, Slider, Typography } from '@mui/material';

const ChartOptionsControl = ({ options, setOptions, setChartType, chartType }) => {
    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };

    const handleLineTensionChange = (event) => {
        setOptions({
            ...options,
            elements: { ...options.elements, line: { ...options.elements.line, tension: event.target.value } }
        });
    };

    const handlePointRadiusChange = (event) => {
        setOptions({
            ...options,
            elements: { ...options.elements, point: { ...options.elements.point, radius: event.target.value } }
        });
    };

    const toggleSecondaryAxis = (event) => {
        setOptions({
            ...options,
            scales: {
                ...options.scales,
                y1: { ...options.scales.y1, display: event.target.checked }
            }
        });
    };

    const handleTimeUnitChange = (event) => {
        setOptions({
            ...options,
            scales: {
                ...options.scales,
                x: { ...options.scales.x, time: { ...options.scales.x.time, unit: event.target.value } }
            }
        });
    };

    const handleBorderWidthChange = (event) => {
        setOptions({
            ...options,
            elements: {
                ...options.elements,
                line: { ...options.elements.line, borderWidth: event.target.value }
            }
        });
    };

    const handleFillChange = (event) => {
        setOptions({
            ...options,
            elements: {
                ...options.elements,
                line: { ...options.elements.line, fill: event.target.checked }
            }
        });
    };



    const renderLineControls = () => (
        <>
            <Typography gutterBottom>
                Fill under lines
            </Typography>
            <FormControlLabel
                control={<Checkbox checked={options.elements.line.fill} onChange={handleFillChange} />}
                label="Fill Line"
            />
            <Typography gutterBottom>
                Line Border Width
            </Typography>
            <Slider
                value={options.elements.line.borderWidth}
                min={0}
                max={3}
                step={0.1}
                onChange={handleBorderWidthChange}
                valueLabelDisplay="auto"
            />

            <Typography gutterBottom>
                Line Tension
            </Typography>
            <Slider
                value={options.elements.line.tension}
                min={0}
                max={1}
                step={0.1}
                onChange={handleLineTensionChange}
                valueLabelDisplay="auto"
            />

            <Typography gutterBottom>
                Point Radius
            </Typography>
            <Slider
                value={options.elements.point.radius}
                min={0}
                max={10}
                step={0.5}
                onChange={handlePointRadiusChange}
                valueLabelDisplay="auto"
            />
        </>
    );

    const renderPointControls = () => (
        <>
            <Typography gutterBottom>
                Point Radius
            </Typography>
            <Slider
                value={options.elements.point.radius}
                min={0}
                max={10}
                step={0.5}
                onChange={handlePointRadiusChange}
                valueLabelDisplay="auto"
            />
        </>
    );

    const renderBarControls = () => (
        <>
            <Typography gutterBottom>
                Bar Border Width
            </Typography>
            <Slider
                value={options.elements.bar.borderWidth}
                min={0}
                max={3}
                step={0.1}
                onChange={handleBorderWidthChange}
                valueLabelDisplay="auto"
            />
            <Typography gutterBottom>
                Bar Border Radius
            </Typography>
            <Slider
                value={options.elements.bar.borderRadius}
                min={0}
                max={10}
                step={0.5}
                onChange={handlePointRadiusChange}
                valueLabelDisplay="auto"
            />
            <Typography gutterBottom>
                Bar thiccness
            </Typography>
            <Slider
                value={options.elements.bar.thickness}
                min={0}
                max={10}
                step={0.5}
                onChange={handlePointRadiusChange}
                valueLabelDisplay="auto"
            />
        </>
    );

    return (
        <div>
            <FormControl fullWidth margin="normal">
                <InputLabel>Chart Type</InputLabel>
                <Select value={options.type} label="Chart Type" onChange={handleChartTypeChange}>
                    <MenuItem value="line">Line</MenuItem>
                    <MenuItem value="bar">Bar</MenuItem>
                    <MenuItem value="bubble">Bubble</MenuItem>
                    <MenuItem value="scatter">Scatter</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Time Unit</InputLabel>
                <Select value={options.scales.x.time.unit} label="Time Unit" onChange={handleTimeUnitChange}>
                    <MenuItem value="minute">Minute</MenuItem>
                    <MenuItem value="hour">Hour</MenuItem>
                    <MenuItem value="day">Day</MenuItem>
                </Select>
            </FormControl>

            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={options.scales.y1?.display} onChange={toggleSecondaryAxis} />}
                    label="Enable Secondary Axis"
                />
            </FormGroup>

            {chartType === 'line' && renderLineControls()}
            {(chartType === 'scatter' || chartType === 'bubble') && renderPointControls()}
            {chartType === 'bar' && renderBarControls()}
        </div>
    );
};

export default ChartOptionsControl;