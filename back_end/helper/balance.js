const calculateBalances = (transactions) => {
  let balanceInSpecificTransaction = 0;

  transactions.map((transaction) => {
    let { type, amount } = transaction.dataValues;

    console.log('amount', amount, 'type', typeof amount);
    if (type === 'income') {
      balanceInSpecificTransaction += Number(parseFloat(amount).toFixed(2));
    } else {
      balanceInSpecificTransaction -= Number(parseFloat(amount).toFixed(2));
    }
    transaction.dataValues.balance = balanceInSpecificTransaction;
    return transaction;
  });

  return transactions;
};

const cleanToken = (token) => {
  let cleanToken = token.replace('Bearer ', '');
  cleanToken = cleanToken.replace('"', '');
  cleanToken = cleanToken.replace('"', '');
  return cleanToken;
};

export { calculateBalances, cleanToken };
