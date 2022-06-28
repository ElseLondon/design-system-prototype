import { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BrushIcon from '@mui/icons-material/Brush';

const appStyle = {
  '& > :not(style)': { m: 1, width: '25ch' },
  maxWidth: '53vh'
}

function App() {
  const [paddingTop,    setPaddingTop]    = useState('');
  const [paddingBottom, setPaddingBottom] = useState('');
  const [paddingLeft,   setPaddingLeft]   = useState('');
  const [paddingRight,  setPaddingRight]  = useState('');

  const onPaddingTopChange = (eventChange: string) => {
    if (eventChange !== paddingTop) setPaddingTop(eventChange);
  };

  const onPaddingBottomChange = (eventChange: string) => {
    if (eventChange !== paddingBottom) setPaddingBottom(eventChange);
  };

  const onPaddingLeftChange = (eventChange: string) => {
    if (eventChange !== paddingLeft) setPaddingLeft(eventChange);
  };

  const onPaddingRightChange = (eventChange: string) => {
    if (eventChange !== paddingRight) setPaddingRight(eventChange);
  };

  const submitStyleInfo = () => {
    console.log('Style Info being submitted...');
  };

  const inactivate = () => {
    console.log('Checking for whether to inactivate button...');
    console.log('paddingTop',    paddingTop);
    console.log('paddingBottom', paddingBottom);
    console.log('paddingLeft',   paddingLeft);
    console.log('paddingRight',  paddingRight);
    if (paddingTop === '' || paddingBottom === '' || paddingLeft === '' || paddingRight === '') return true;

    // if any cannot be parsed into numbers - return true
    // if any cannot are negative           - return true

    return false;
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <p><code>Design System Prototype</code></p>

        <Box
          component="form"
          sx={appStyle}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Padding Top" 
            onChange={e => onPaddingTopChange(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Padding Bottom"
            onChange={e => onPaddingBottomChange(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Padding Left" 
            onChange={e => onPaddingLeftChange(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Padding Right"
            onChange={e => onPaddingRightChange(e.target.value)}
          />

          <Button variant="contained" onClick={submitStyleInfo} disabled={inactivate()} endIcon={<BrushIcon />}>
            Apply Styling
          </Button>
        </Box>

      </header>
    </div>
  );
}

export default App;
