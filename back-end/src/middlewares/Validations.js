const joi = require('joi');

const ERROR_MESSAGE = 'Some required fields are missing';

const loginSchema = joi.object({
  email: joi.string().required().messages(
    { 'string.empty': ERROR_MESSAGE },
  ),
  password: joi.string().required().messages(
    { 'string.empty': ERROR_MESSAGE },
  ),
});
const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};
const createLoginSchema = joi.object({
  displayName: joi.string().min(8).required().messages(
    { 'string.min': '"displayName" length must be at least 8 characters long' },
  ),
  email: joi.string().email().required().messages(
    { 'string.email': '"email" must be a valid email' },
  ),
  password: joi.string().min(6).required().messages(
    { 'string.min': '"password" length must be at least 6 characters long' },
  ),
  image: joi.string().required().messages(
    { 'string.empty': ERROR_MESSAGE },
  ),
});
const createLoginValidation = (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const { error } = createLoginSchema.validate({ displayName, email, password, image });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = { loginValidation, createLoginValidation };