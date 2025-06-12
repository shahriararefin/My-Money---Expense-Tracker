
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown, ArrowRightLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export function Dashboard({ accounts, transactions, transfers }) {
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyIncome = transactions
    .filter(t => {
      const date = new Date(t.date);
      return t.type === 'income' && 
             date.getMonth() === currentMonth && 
             date.getFullYear() === currentYear;
    })
    .reduce((sum, t) => sum + t.amount, 0);
    
  const monthlyExpenses = transactions
    .filter(t => {
      const date = new Date(t.date);
      return t.type === 'expense' && 
             date.getMonth() === currentMonth && 
             date.getFullYear() === currentYear;
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyTransfers = transfers
    .filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && 
             date.getFullYear() === currentYear;
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const stats = [
    {
      title: 'Total Balance',
      value: `$${totalBalance.toFixed(2)}`,
      icon: DollarSign,
      gradient: 'gradient-bg'
    },
    {
      title: 'Monthly Income',
      value: `$${monthlyIncome.toFixed(2)}`,
      icon: TrendingUp,
      gradient: 'income-gradient'
    },
    {
      title: 'Monthly Expenses',
      value: `$${monthlyExpenses.toFixed(2)}`,
      icon: TrendingDown,
      gradient: 'expense-gradient'
    },
    {
      title: 'Monthly Transfers',
      value: `$${monthlyTransfers.toFixed(2)}`,
      icon: ArrowRightLeft,
      gradient: 'transfer-gradient'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className={`${stat.gradient} text-white card-hover`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <stat.icon className="w-5 h-5" />
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
