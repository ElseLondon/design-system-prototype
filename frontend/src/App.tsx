import { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BrushIcon from '@mui/icons-material/Brush';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// extract into firestore: 'src/services/firestore'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, updateDoc } from "firebase/firestore"; 
import { getFirestore } from 'firebase/firestore/lite';
//

const firebaseConfig = {
  // apiKey: "",
  // authDomain: "design-system-prototype-5a79b.firebaseapp.com",
  // projectId: "design-system-prototype-5a79b",
  // storageBucket: "design-system-prototype-5a79b.appspot.com",
  // messagingSenderId: "",
  // appId: "",
  // measurementId: ""
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
  const [variableSet,   setVariableSet]   = useState(false);
  const [variableName,  setVariableName]  = useState('');
  const [variableValue, setVariableValue] = useState('');
  const [paddingTop,    setPaddingTop]    = useState('');
  const [paddingBottom, setPaddingBottom] = useState('');
  const [paddingLeft,   setPaddingLeft]   = useState('');
  const [paddingRight,  setPaddingRight]  = useState('');

  const onVariableSet = () => setVariableSet(!variableSet);

  const onVariableNameChange = (eventChange: string) => setVariableName(eventChange);

  const onVariableValueChange = (eventChange: string) => setVariableValue(eventChange);

  const onPaddingChange = (eventChange: string, paddingValue: string, position: string) => {
    if (eventChange !== paddingValue) {
      if (position === 'top')    setPaddingTop(eventChange);
      if (position === 'bottom') setPaddingBottom(eventChange);
      if (position === 'left')   setPaddingLeft(eventChange);
      if (position === 'right')  setPaddingRight(eventChange);
    };
  };

  const checkForOnlyTextCharacters = () => {
    const containsOnlyTextCharacters = /^[a-zA-Z]+$/.test(variableName);

    if (variableName === '') return false;
    if (containsOnlyTextCharacters) return false;

    return true;
  };

  const checkForOnlyNumericalCharacters = (str: string) => {
    const parsesIntoInteger = parseInt(str);

    if (str === '') return false;
    if (parsesIntoInteger) return false;

    return true;
  };

  const checkForPaddingError = (paddingValue: string) => {
    if (!variableSet) return checkForOnlyNumericalCharacters(paddingValue);
    return false;
  };

  const inactivateSubmitButton = () => {
    if (paddingTop === '' || paddingBottom === '' || paddingLeft === '' || paddingRight === '') return true;

    if (variableSet && (!variableName || !variableValue)) return true;
    
    return false;
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
                  error={checkForOnlyTextCharacters()}
                  helperText={checkForOnlyTextCharacters() ? "Please use only text characters" : ""}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  label="Variable Value"
                  onChange={e => onVariableValueChange(e.target.value)}
                  error={checkForOnlyNumericalCharacters(variableValue)}
                  helperText={checkForOnlyNumericalCharacters(variableValue) ? "Please use only numerical characters" : ""}
                />
              </>
          }

          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Padding Top"
            error={checkForPaddingError(paddingTop)}
            helperText={checkForPaddingError(paddingTop) ? "Please use only numerical characters" : ""}
            onChange={e => onPaddingChange(e.target.value, paddingTop, 'top')}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Padding Bottom"
            error={checkForPaddingError(paddingBottom)}
            helperText={checkForPaddingError(paddingBottom) ? "Please use only numerical characters" : ""}
            onChange={e => onPaddingChange(e.target.value, paddingBottom, 'bottom')}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Padding Left" 
            error={checkForPaddingError(paddingLeft)}
            helperText={checkForPaddingError(paddingLeft) ? "Please use only numerical characters" : ""}
            onChange={e => onPaddingChange(e.target.value, paddingLeft, 'left')}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Padding Right"
            error={checkForPaddingError(paddingRight)}
            helperText={checkForPaddingError(paddingRight) ? "Please use only numerical characters" : ""}
            onChange={e => onPaddingChange(e.target.value, paddingRight, 'right')}
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
