function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  const re = /^$|^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
  return re.test(String(phone).toLowerCase());
}

function validateTime(time) {
  const re = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return re.test(String(time).toLocaleLowerCase());
}

export function createControl(config, validation) {
  return {
    ...config,
    validation,
    touched: false,
    valid: !validation,
  };
}
export function validate(value, validation = null) {
  if (!validation) {
    return true;
  }
  let isValid = true;
  if (validation.required) {
    isValid = String(value).trim() !== "" && value !== null && isValid;
  }
  if (validation.email) {
    isValid = validateEmail(value) && isValid;
  }
  if (validation.phone) {
    isValid = validatePhone(value) && isValid;
  }
  if (validation.time) {
    isValid = validateTime(value) && isValid;
  }

  return isValid;
}
export function validateForm(formControls) {
  let isFormValid = true;
  Object.keys(formControls).forEach((name) => {
    isFormValid = formControls[name].valid && isFormValid;
  });

  return isFormValid;
}
export function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}
