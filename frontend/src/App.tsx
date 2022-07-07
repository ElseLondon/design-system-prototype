import { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BrushIcon from '@mui/icons-material/Brush';
// extract into firestore: 'src/services/firestore'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, updateDoc } from "firebase/firestore"; 
import { getFirestore } from 'firebase/firestore/lite';
//

const firebaseConfig = {
  apiKey: "AIzaSyBvP_47oJuIehuFnckc0ouq7FvBo1Qvpyw",     //:CONCEAL:
  authDomain: "design-system-prototype.firebaseapp.com",
  projectId: "design-system-prototype",
  storageBucket: "design-system-prototype.appspot.com",
  messagingSenderId: "405543776910",                     //:CONCEAL:
  appId: "1:405543776910:web:2f5a74b6f0855e09cd8fdf",    //:CONCEAL:
  measurementId: "G-TYWTTVWMXW"                          //:CONCEAL:
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();


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

  const submitStyleInfo = async () => {
    console.log('Style Info being submitted...');

    // extract into firestore: 'src/services/firestore'
    // as function saveStyles
    try {
      const styleRef = doc(db, "users", "6MU0LKOQPpG2k9nAbfBk");
      await updateDoc(styleRef, {
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight
      });
      console.log("Document 6MU0LKOQPpG2k9nAbfBk Padding Styles updated");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // 
  };

  const inactivate = () => {
    console.log('Checking for whether to inactivate button...');

    if (paddingTop === '' || paddingBottom === '' || paddingLeft === '' || paddingRight === '') return true;
    // if any cannot be parsed into numbers - return true
    // if any are negative           - return true
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
          {/* can be refactored into "FormField" Component */}
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

          <Button
            variant="contained"
            onClick={submitStyleInfo}
            disabled={inactivate()}
            endIcon={<BrushIcon />}
          >
            Apply Styling
          </Button>
        </Box>

      </header>
    </div>
  );
}

export default App;
