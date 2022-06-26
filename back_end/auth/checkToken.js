import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { cleanToken } from '../helper/balance.js';

const checkToken = async (req, res, next) => {
  try {
    let token = req.headers['x-access-token'] || req.headers.authorization || '';
    if (!token) return res.status(401).send('No token provided');

    // Verifier that expects valid access tokens:
    const verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.USER_POOL_ID,
      tokenUse: process.env.TOKEN_USE,
      clientId: process.env.CLIENT_ID,
    });

    try {
      const payload = await verifier.verify(cleanToken(token));
      console.log('Token is valid. Payload:', payload);
    } catch {
      console.log('Token not valid!');
    }

    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

export { checkToken };
