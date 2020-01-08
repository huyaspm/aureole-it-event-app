exports.validateRegister = (email, fullName, phoneNumber) => {
  const errors = {};
  if (email.trim() === "") errors.email = "Email must not be empty!";
  else if (
    !email.match(/^[a-z][a-z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/)
  )
    errors.email = "must be a valid";
  if (fullName.trim() === "") errors.fullName = "must not be empty";
  if (phoneNumber.trim() === "") errors.phoneNumber = "must not be empty";
  return { errors, invalid: Object.keys(errors).length > 0 };
};
