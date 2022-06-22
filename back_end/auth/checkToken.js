import jwtDecode from 'jwt-decode';
import { getUserByEmail } from '../controllers/user.js';

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'] || req.headers.authorization || '';
    if (!token) return res.status(401).send('No token provided');

    const decoded = jwtDecode(token);
    if (!decoded) return res.status(400).send('Not a valid JWT token');

    if (!decoded.email) return res.status(400).send('Incomplete JWT token');

    const userExists = await getUserByEmail(decoded.email);
    if (!userExists) return res.status(400).send('User without privilegdes');

    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

export { checkToken };
