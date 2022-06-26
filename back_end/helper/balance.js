const calculateBalances = (transactions) => {
  let balanceInSpecificTransaction = 0;

  transactions.map((transaction) => {
    let { type, amount } = transaction.dataValues;

    if (type === 'income') {
      balanceInSpecificTransaction += Number(amount);
    } else {
      balanceInSpecificTransaction -= Number(amount);
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
