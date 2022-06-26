import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { cleanToken } from '../helper/balance.js';
import { Error } from '../helper/errorMessages.js';

const checkToken = async (req, res, next) => {
  try {
    let token = req.headers['x-access-token'] || req.headers.authorization || '';
    if (!token) return res.status(401).send(Error.NO_TOKEN);

    // Verifier that expects valid access tokens:
    const verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.USER_POOL_ID,
      tokenUse: process.env.TOKEN_USE,
      clientId: process.env.CLIENT_ID,
    });

    try {
      const payload = await verifier.verify(cleanToken(token));
      console.log('Token is valid. Payload:', payload);
      next();
    } catch {
      res.status(401).send(Error.NOT_VALID_TOKEN);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export { checkToken };
