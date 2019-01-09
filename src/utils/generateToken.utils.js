import jwt from 'jsonwebtoken';

const generateToken = userId => jwt.sign({ userId }, 'secretkey', { expiresIn: '24h' });

export { generateToken as default };
