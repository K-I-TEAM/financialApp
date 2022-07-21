import axios from 'axios';

const getSymbols = async (_, res, next) => {
  try {
    const getSymbolsApiLayer = await axios.get('https://api.apilayer.com/fixer/symbols', {
      headers: {
        apikey: process.env.APILAYER_APIKEY,
      },
    });
    return res.send(getSymbolsApiLayer.data);
  } catch (error) {
    next(error);
  }
};

export { getSymbols };
