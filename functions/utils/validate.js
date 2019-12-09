exports.validateRegister = (email, fullName, phoneNumber) => {
  const errors = {};
  if (email.trim() === "") errors.email = "Email must not be empty!";
  else if (
    !email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  )
    errors.email = "must be a valid";
  if (fullName.trim() === "") errors.fullName = "must not be empty";
  if (phoneNumber.trim() === "") errors.phoneNumber = "must not be empty";
  return { errors, invalid: Object.keys(errors).length > 0 };
};
