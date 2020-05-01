import Transaction from '../models/Transaction';

interface Balance {
  deposit: number;
  withdrawal: number;
  total: number;
}

// DTO - Data transfer object
interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'deposit' | 'withdrawal';
}


class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const {deposit, withdrawal} = this.transactions.reduce((accountBalance: Balance, transaction: Transaction) => {
      switch ( transaction.type ) {
        case "deposit":
          accountBalance.deposit += transaction.value;
          break
        case "withdrawal":
          accountBalance.withdrawal += transaction.value;
        break;
        default:
          break;
      }

      return accountBalance;
    }, {
      deposit: 0,
      withdrawal: 0,
      total: 0
    });

    const total = deposit - withdrawal;


    return {deposit, withdrawal, total};
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

}

export default TransactionsRepository;