import { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BrushIcon from '@mui/icons-material/Brush';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { doc, updateDoc } from "firebase/firestore"; 
import { initializeFirebase } from './Firestore';

const db = initializeFirebase();

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

  const checkForPaddingError = (paddingValue: string, position: string) => {
    if (variableSet) {
      if (position === 'top') {
        const doesPaddingFormulaIncludeVariable = paddingTop.includes(variableName);

        const doesPaddingFormulaIncludeOperand = ['+', '-', '*', '/' ].some(element => {
          if (paddingTop.includes(element)) return true;
          return false;
        });

        const isMultipleValid = parseInt(
          paddingTop.replace(variableName, '')
            .replace('+', '').replace('-', '').replace('*', '').replace('/', '')
        ); 
        
        if (!doesPaddingFormulaIncludeVariable) return true;
        if (!doesPaddingFormulaIncludeOperand)  return true;
        if (!isMultipleValid)                   return true;
      }
    };

    if (!variableSet) return checkForOnlyNumericalCharacters(paddingValue);
    
    return false;
  };

  const getPaddingErrorHelperText = () => {
    if (!variableSet) return checkForPaddingError(paddingTop, 'top') ? "Please use only numerical characters" : ""

    if (variableSet) {
      const doesPaddingFormulaIncludeOperand = ['+', '-', '*', '/' ].some(element => {
        if (paddingTop.includes(element)) return true;
        return false;
      });

      const isMultipleValid = parseInt(
        paddingTop.replace(variableName, '')
          .replace('+', '').replace('-', '').replace('*', '').replace('/', '')
      ); 

      if (!variableName)                      return "Please enter a variable name"
      if (!paddingTop.includes(variableName)) return "Please include the variable in the formula"
      if (!doesPaddingFormulaIncludeOperand)  return "Please include an operand in the formula"
      if (!isMultipleValid)                   return "Please include a valid numerical value"
    }
  }

  const inactivateSubmitButton = () => {
    if (paddingTop === '' || paddingBottom === '' || paddingLeft === '' || paddingRight === '') return true;

    if (variableSet && (!variableName || !variableValue)) return true;
    
    return false;
  };

  const submitStyleInfo = async () => {
    console.log('Style Info being submitted...');

    console.log('variableName', variableName)
    console.log('variableValue', variableValue)
    
    // if variable set, calculate the values here
    // remove variable
    // remove whitespace
    // check order of operations 
    // apply order of operations

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
          sx={{'& > :not(style)': { m: 1, width: '25ch' }, maxWidth: '53vh' }}
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
            error={checkForPaddingError(paddingTop, 'top')}
            helperText={getPaddingErrorHelperText()}
            onChange={e => onPaddingChange(e.target.value, paddingTop, 'top')}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Padding Bottom"
            error={checkForPaddingError(paddingBottom, 'bottom')}
            helperText={checkForPaddingError(paddingBottom, 'bottom') ? "Please use only numerical characters" : ""}
            onChange={e => onPaddingChange(e.target.value, paddingBottom, 'bottom')}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Padding Left" 
            error={checkForPaddingError(paddingLeft, 'left')}
            helperText={checkForPaddingError(paddingLeft, 'left') ? "Please use only numerical characters" : ""}
            onChange={e => onPaddingChange(e.target.value, paddingLeft, 'left')}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Padding Right"
            error={checkForPaddingError(paddingRight, 'right')}
            helperText={checkForPaddingError(paddingRight, 'right') ? "Please use only numerical characters" : ""}
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
