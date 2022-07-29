import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { createUser, getUserByEmail } from '../controllers/user.js';
import { cleanToken } from '../helper/balance.js';
import { Error } from '../helper/errorHandler.js';

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
      const user = await getUserByEmail(payload.email);

      if (!user) {
        const params = {
          name: payload.name,
          email: payload.email,
        };

        const user = await createUser(params);
        if (user.id) {
          next();
        } else {
          return res.status(500).send(user);
        }
      } else {
        next();
      }
    } catch (error) {
      if (error.message.includes(Error.TOKEN_EXPIRED)) {
        return res.status(401).send(Error.TOKEN_EXPIRED);
      } else if (error) {
        return res.status(500).send(error);
      } else {
        return res.status(401).send(Error.NOT_VALID_TOKEN);
      }
    }
  } catch (error) {
    next(error);
  }
};

export { checkToken };
