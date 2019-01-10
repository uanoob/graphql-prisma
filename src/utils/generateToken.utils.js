import jwt from 'jsonwebtoken';

const generateToken = userId => jwt.sign({ userId }, process.env.JWT_KEY, { expiresIn: '24h' });

export { generateToken as default };
