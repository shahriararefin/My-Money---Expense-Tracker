
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/toaster';
import { Dashboard } from '@/components/Dashboard';
import { AccountCard } from '@/components/AccountCard';
import { AccountManager } from '@/components/AccountManager';
import { TransactionForm } from '@/components/TransactionForm';
import { TransferForm } from '@/components/TransferForm';
import { TransactionList } from '@/components/TransactionList';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { motion } from 'framer-motion';
import { Wallet, BarChart3, CreditCard, ArrowRightLeft } from 'lucide-react';

function App() {
  const [accounts, setAccounts] = useLocalStorage('money-manager-accounts', [
    { id: '1', name: 'Main Checking', type: 'Checking', balance: 2500.00 },
    { id: '2', name: 'Savings Account', type: 'Savings', balance: 10000.00 },
    { id: '3', name: 'Credit Card', type: 'Credit Card', balance: -850.00 }
  ]);
  
  const [transactions, setTransactions] = useLocalStorage('money-manager-transactions', []);
  const [transfers, setTransfers] = useLocalStorage('money-manager-transfers', []);

  const handleAddAccount = (account) => {
    setAccounts([...accounts, account]);
  };

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    
    // Update account balance
    setAccounts(accounts.map(account => {
      if (account.name === transaction.account) {
        const newBalance = transaction.type === 'income' 
          ? account.balance + transaction.amount
          : account.balance - transaction.amount;
        return { ...account, balance: newBalance };
      }
      return account;
    }));
  };

  const handleTransfer = (transfer) => {
    setTransfers([...transfers, transfer]);
    
    // Update account balances
    setAccounts(accounts.map(account => {
      if (account.name === transfer.fromAccount) {
        return { ...account, balance: account.balance - transfer.amount };
      }
      if (account.name === transfer.toAccount) {
        return { ...account, balance: account.balance + transfer.amount };
      }
      return account;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 mobile-safe">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 float-animation">
            💰 Money Manager
          </h1>
          <p className="text-white/80 text-lg md:text-xl">
            Track your finances with style and ease
          </p>
        </motion.div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 glass-effect border-white/20">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Accounts</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="transfers" className="flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Transfers</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard 
              accounts={accounts} 
              transactions={transactions} 
              transfers={transfers} 
            />
            <TransactionList 
              transactions={transactions} 
              transfers={transfers} 
            />
          </TabsContent>

          <TabsContent value="accounts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Your Accounts</h2>
              <AccountManager accounts={accounts} onAddAccount={handleAddAccount} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map((account, index) => (
                <AccountCard key={account.id} account={account} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Income & Expenses</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TransactionForm 
                accounts={accounts} 
                onAddTransaction={handleAddTransaction} 
                type="income" 
              />
              <TransactionForm 
                accounts={accounts} 
                onAddTransaction={handleAddTransaction} 
                type="expense" 
              />
            </div>
            
            <TransactionList 
              transactions={transactions} 
              transfers={transfers} 
            />
          </TabsContent>

          <TabsContent value="transfers" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Money Transfers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TransferForm 
                accounts={accounts} 
                onTransfer={handleTransfer} 
              />
            </div>
            
            <TransactionList 
              transactions={transactions} 
              transfers={transfers} 
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <Toaster />
    </div>
  );
}

export default App;
