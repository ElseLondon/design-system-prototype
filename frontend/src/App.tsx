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
import {
  checkForOnlyTextCharacters,
  checkForOnlyNumericalCharacters,
  checkForOperand,
  checkForValidFormulaValue
} from './Helpers';


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

  const onPaddingChange = (eventChange: string, position: string) => {
    if (position === 'top')    setPaddingTop(eventChange);
    if (position === 'bottom') setPaddingBottom(eventChange);
    if (position === 'left')   setPaddingLeft(eventChange);
    if (position === 'right')  setPaddingRight(eventChange);
  };

  const checkForPaddingError = (paddingValue: string, position: string) => {
    if (!variableSet) return checkForOnlyNumericalCharacters(paddingValue);

    if (variableSet) {
      const doesPaddingFormulaIncludeOperand = checkForOperand(paddingValue);
      const isFormulaValueValid = checkForValidFormulaValue(paddingValue, variableName);
      
      if (!paddingValue.includes(variableName)) return true;
      if (!doesPaddingFormulaIncludeOperand)    return true;
      if (!isFormulaValueValid)                 return true;
    };
    
    return false;
  };

  const getPaddingErrorHelperText = (paddingValue: string) => {
    if (!variableSet) {
      return checkForOnlyNumericalCharacters(paddingValue) ? "Please use only numerical characters" : ""
    };

    if (variableSet) {
      const doesPaddingFormulaIncludeOperand = checkForOperand(paddingValue);
      const isFormulaValueValid = checkForValidFormulaValue(paddingValue, variableName);

      if (!variableName)                        return "Please enter a variable name"
      if (!paddingValue.includes(variableName)) return "Please include the variable in the formula"
      if (!doesPaddingFormulaIncludeOperand)    return "Please include an operand in the formula"
      if (!isFormulaValueValid)                 return "Please include a valid numerical value"
    }
  }

  const inactivateSubmitButton = () => {
    if (paddingTop === '' || paddingBottom === '' || paddingLeft === '' || paddingRight === '') return true;
    if (variableSet && (!variableName || !variableValue)) return true;
    
    return false;
  };

  const submitStyleInfo = async () => {
    console.log('Style Info being submitted...');

    // // // // // // // // // // // //
    // Variable Formula Calculation //
    let data = {};
  
    if (!variableSet) {
      data = {
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight
      }
    }
    // 
    console.log('variableSet:', variableSet);
    console.log('data:',        data);
    // 
    // if variable set, calculate the values here
    // remove variable
    // remove whitespace
    // check order of operations 
    // apply order of operations   //
    // // // // // // // // // // //

    // can we move this to firestore file?
    try {
      const styleRef = doc(db, "users", "6MU0LKOQPpG2k9nAbfBk");
      await updateDoc(styleRef, data);
      console.log("Document 6MU0LKOQPpG2k9nAbfBk Padding Styles updated");
    } catch (e) {
      console.error("Error adding document: ", e);
    };
    // 
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
                  error={checkForOnlyTextCharacters(variableName)}
                  helperText={checkForOnlyTextCharacters(variableName) ? "Please use only text characters" : ""}
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
            helperText={getPaddingErrorHelperText(paddingTop)}
            onChange={e => onPaddingChange(e.target.value, 'top')}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Padding Bottom"
            error={checkForPaddingError(paddingBottom, 'bottom')}
            helperText={getPaddingErrorHelperText(paddingBottom)}
            onChange={e => onPaddingChange(e.target.value, 'bottom')}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Padding Left" 
            error={checkForPaddingError(paddingLeft, 'left')}
            helperText={getPaddingErrorHelperText(paddingLeft)}
            onChange={e => onPaddingChange(e.target.value, 'left')}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Padding Right"
            error={checkForPaddingError(paddingRight, 'right')}
            helperText={getPaddingErrorHelperText(paddingRight)}
            onChange={e => onPaddingChange(e.target.value, 'right')}
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
