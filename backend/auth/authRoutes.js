const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const router = require('express').Router();

const adminUser = {
  id: 1,
  username: "admin",
  passwordHash: bcrypt.hashSync("admin123", 8)
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== adminUser.username) {
    return res.status(401).json({ message: "Usuário inválido" });
  }

  const isPasswordValid = bcrypt.compareSync(password, adminUser.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Senha incorreta" });
  }

  const token = jwt.sign({ id: adminUser.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;

