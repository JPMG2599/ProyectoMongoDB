export const isEmpty = (input) => {
  let isEmpty = false;

  if (
    !input.value ||
    input.value === undefined ||
    input.value === null ||
    input.value.length === 0
  ) {
    isEmpty = true;
  }
  return isEmpty;
};