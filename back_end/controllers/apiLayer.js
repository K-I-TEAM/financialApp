import axios from 'axios';

const getSymbols = async (_, res) => {
  try {
    const getSymbolsApiLayer = await axios.get('https://api.apilayer.com/fixer/symbols', {
      headers: {
        apikey: process.env.APILAYER_APIKEY,
      },
    });
    return res.send(getSymbolsApiLayer.data);
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getSymbols };
