const md5 = require('md5');
const { users } = require('../../database/models');

const tokenHelper = require('../../helpers/Token');

const login = async (email, password) => {
  const result = await users.findOne({
    attributes: { email, password },
    where: { email },
    raw: true,
  });
  const verifyPassword = md5(password);
  if (!result || result.password !== verifyPassword) {
    return null;
  }
  const token = tokenHelper.createToken(result);
  return {
    token,
  };
};

module.exports = { login };
