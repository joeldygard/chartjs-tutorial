import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

const ChartOptionsDisplay = ({ options }) => {
  const [highlightedOptions, setHighlightedOptions] = useState('');
  const prevOptionsRef = useRef({});

  useEffect(() => {
    const currentOptionsStr = JSON.stringify(options, null, 2);
    const prevOptionsStr = JSON.stringify(prevOptionsRef.current, null, 2);
    let highlightedText = '';

    if (prevOptionsStr !== currentOptionsStr) {
      const currentOptionsLines = currentOptionsStr.split('\n');
      const prevOptionsLines = prevOptionsStr.split('\n');

      // Highlight changed lines
      for (let i = 0; i < currentOptionsLines.length; i++) {
        if (currentOptionsLines[i] !== prevOptionsLines[i]) {
          highlightedText += `<span style="background-color: yellow;">${currentOptionsLines[i]}</span>\n`;
        } else {
          highlightedText += `${currentOptionsLines[i]}\n`;
        }
      }
    } else {
      highlightedText = currentOptionsStr;
    }

    setHighlightedOptions(highlightedText);
    prevOptionsRef.current = options;
  }, [options]);

  return (
    <Box sx={{
      overflow: 'auto',
      mt: 2,
      p: 2,
      bgcolor: 'background.paper',
      color: 'text.primary',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: '4px',
      fontFamily: 'Monospace'
    }}>
      <Typography variant="subtitle2" gutterBottom>
        Chart Options:
      </Typography>
      <pre dangerouslySetInnerHTML={{ __html: highlightedOptions }} />
    </Box>
  );
};

export default ChartOptionsDisplay;
