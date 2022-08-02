export const checkForOnlyTextCharacters = (textInput: string) => {
  const containsOnlyTextCharacters = /^[a-zA-Z]+$/.test(textInput);

  if (textInput === '') return false;
  if (containsOnlyTextCharacters) return false;

  return true;
};

export const checkForOnlyNumericalCharacters = (textInput: string) => {
  const parsesIntoInteger = parseInt(textInput);

  if (textInput === '') return false;
  if (parsesIntoInteger) return false;

  return true;
};

export const checkForOperand = (textInput: string) => {
  return ['+', '-', '*', '/' ].some(element => {
    if (textInput.includes(element)) return true;
    return false;
  });
};

export const checkForValidFormulaValue = (textInput: string, variableName: string) => {
  return parseInt(
    textInput.replace(variableName, '')
      .replace('+', '').replace('-', '').replace('*', '').replace('/', '')
  );
};