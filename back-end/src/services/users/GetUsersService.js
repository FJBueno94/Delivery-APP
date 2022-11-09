const { users } = require('../../database/models');

const getSellers = async () => {
  const sellers = await users.findAll({ where: { role: 'seller' } });
  return sellers;
};

const getAllUsers = async () => {
  const allUser = await users.findAll({ attributes: { exclude: ['password'] } });
  return allUser;
};

module.exports = { getSellers, getAllUsers };
