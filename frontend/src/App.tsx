import { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BrushIcon from '@mui/icons-material/Brush';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// extract into firestore: 'src/services/firestore'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, updateDoc } from "firebase/firestore"; 
import { getFirestore } from 'firebase/firestore/lite';
//

const firebaseConfig = {
  apiKey: "",
  authDomain: "design-system-prototype-5a79b.firebaseapp.com",
  projectId: "design-system-prototype-5a79b",
  storageBucket: "design-system-prototype-5a79b.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
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
  // 
  const [variableSet,  setVariableSet]      = useState(false);
  const [variableName,  setVariableName]    = useState('');
  const [variableValue,  setVariableValue]  = useState('');
  // 
  const [paddingTop,    setPaddingTop]    = useState('');
  const [paddingBottom, setPaddingBottom] = useState('');
  const [paddingLeft,   setPaddingLeft]   = useState('');
  const [paddingRight,  setPaddingRight]  = useState('');

  // Change a Variable
  const onVariableSet = () => setVariableSet(!variableSet);

  const onVariableNameChange = (eventChange: string) => setVariableName(eventChange);

  const onVariableValueChange = (eventChange: string) => setVariableValue(eventChange);
  // 

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

    console.log('variableName', variableName)
    console.log('variableValue', variableValue)

    // what if padding values are numerical, but there is variable name?

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
  };

  const inactivateSubmitButton = () => {
    if (paddingTop === '' || paddingBottom === '' || paddingLeft === '' || paddingRight === '') return true;
    
    return false;
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <code>Design System Prototype</code>
        </p>

        <Box
          component="form"
          sx={appStyle}
          noValidate
          autoComplete="off"
        >
          {/* Change a Variable */}
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked={false} onChange={onVariableSet} />} label="Set a Variable?" />
          </FormGroup>
          {
            variableSet && 
              <>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  label="Variable Name" 
                  onChange={e => onVariableNameChange(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  label="Variable Value"
                  onChange={e => onVariableValueChange(e.target.value)}
                />
              </>
          }
          {/*  */}

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
            disabled={inactivateSubmitButton()}
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
