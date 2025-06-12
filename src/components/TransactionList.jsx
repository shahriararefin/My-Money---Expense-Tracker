
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, ArrowRightLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export function TransactionList({ transactions, transfers }) {
  const allTransactions = [
    ...transactions.map(t => ({ ...t, transactionType: 'transaction' })),
    ...transfers.map(t => ({ ...t, transactionType: 'transfer' }))
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const getIcon = (transaction) => {
    if (transaction.transactionType === 'transfer') {
      return <ArrowRightLeft className="w-4 h-4 text-orange-500" />;
    }
    return transaction.type === 'income' 
      ? <TrendingUp className="w-4 h-4 text-green-500" />
      : <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const getAmount = (transaction) => {
    if (transaction.transactionType === 'transfer') {
      return `$${transaction.amount.toFixed(2)}`;
    }
    return transaction.type === 'income' 
      ? `+$${transaction.amount.toFixed(2)}`
      : `-$${transaction.amount.toFixed(2)}`;
  };

  const getDescription = (transaction) => {
    if (transaction.transactionType === 'transfer') {
      return `${transaction.fromAccount} → ${transaction.toAccount}`;
    }
    return `${transaction.category} • ${transaction.account}`;
  };

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {allTransactions.length === 0 ? (
          <p className="text-white/60 text-center py-8">No transactions yet</p>
        ) : (
          allTransactions.slice(0, 10).map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                {getIcon(transaction)}
                <div>
                  <p className="text-white font-medium">
                    {transaction.description || getDescription(transaction)}
                  </p>
                  <p className="text-white/60 text-sm">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.transactionType === 'transfer' 
                    ? 'text-orange-400'
                    : transaction.type === 'income' 
                      ? 'text-green-400' 
                      : 'text-red-400'
                }`}>
                  {getAmount(transaction)}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
