const { User } = require('../models');

const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
  
      // Generate a token
      const token = jwt.sign({ userId: user.id },process.env.SECRET_KEY, { expiresIn: '24h' });
  
      // Send the token in the response
      res.json({ user, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.getByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await User.findAll({ where: { userId } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await User.findOne(id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
      const [updated] = await User.update(req.body, {
        where: { id: id }
      });
      if (updated) {
        const updatedUser = await User.findByPk(id);
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' }); 
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
