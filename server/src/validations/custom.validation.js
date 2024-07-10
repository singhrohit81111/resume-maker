const objectId = (value, helpers) => {
  if (!value.match("/^[0-9a-zA-Z]{24}$/")) {
    return helpers.message("Objectbb id ");
  }
  return value;
};

const password = (value, helpers) => {
  if (!value.match(/[a-zA-Z1-9]/)) {
    return helpers.message(
      "password must contain at least 1 letter and 1 number"
    );
  }
  return value;
};

module.exports = { objectId, password };
