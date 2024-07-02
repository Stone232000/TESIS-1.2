const bcrypt = require('bcryptjs');

// Hash almacenado en la base de datos para el usuario "admin"
const storedHash = '$2a$10$CwTycUXWue0Thq9StjUM0uJ8FbF/9D8.FaOTScBo8hRoJv5M2rBxW';
const password = 'admin123';

bcrypt.compare(password, storedHash, (err, result) => {
  if (err) {
    console.error('Error comparing password:', err);
  } else {
    console.log('Password match:', result); // Debe ser true
  }
});
