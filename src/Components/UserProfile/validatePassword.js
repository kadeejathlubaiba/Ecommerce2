export const ValidatePassword = (errors, condition, touched, values) => {
    if (errors && touched && condition) {
      if (errors && !errors.includes(condition)) {
        return "valid";
      } else {
        return "invalid";
      }
    } else if (touched && errors === undefined && values.length > 1) {
      return "valid";
    } else {
      return null;
    }
  };
  