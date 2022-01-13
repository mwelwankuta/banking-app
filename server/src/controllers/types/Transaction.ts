export interface Transaction {
  from: string;
  to: string;
  amount: number;
  transaction_id: string;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}
