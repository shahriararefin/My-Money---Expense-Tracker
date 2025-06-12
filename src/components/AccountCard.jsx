
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, CreditCard, PiggyBank, Building } from 'lucide-react';
import { motion } from 'framer-motion';

const accountIcons = {
  'Checking': Wallet,
  'Savings': PiggyBank,
  'Credit Card': CreditCard,
  'Investment': Building
};

export function AccountCard({ account, index }) {
  const Icon = accountIcons[account.type] || Wallet;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="glass-effect border-white/20 card-hover">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-white">
            <Icon className="w-5 h-5" />
            {account.name}
          </CardTitle>
          <p className="text-white/70 text-sm">{account.type}</p>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            ${account.balance.toFixed(2)}
          </div>
          <p className="text-white/60 text-sm mt-1">Available Balance</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
