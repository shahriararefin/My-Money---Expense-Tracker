
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const categories = {
  income: [
    'Salary', 'Freelance', 'Business', 'Investment', 'Gift', 'Bonus', 'Other Income'
  ],
  expense: [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Bills & Utilities',
    'Healthcare', 'Education', 'Travel', 'Insurance', 'Other Expense'
  ]
};

export function TransactionForm({ accounts, onAddTransaction, type = 'income' }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    account: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.category || !formData.account) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const transaction = {
      id: Date.now().toString(),
      type,
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      account: formData.account,
      date: formData.date,
      timestamp: new Date().toISOString()
    };

    onAddTransaction(transaction);
    
    toast({
      title: `${type === 'income' ? 'Income' : 'Expense'} Added!`,
      description: `Successfully added $${formData.amount} to ${formData.account}`,
    });

    setFormData({
      amount: '',
      category: '',
      description: '',
      account: '',
      date: new Date().toISOString().split('T')[0]
    });
    setOpen(false);
  };

  const gradientClass = type === 'income' ? 'income-gradient' : 'expense-gradient';
  const Icon = type === 'income' ? TrendingUp : TrendingDown;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className={`${gradientClass} text-white cursor-pointer card-hover`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon className="w-5 h-5" />
                Add {type === 'income' ? 'Income' : 'Expense'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <Plus className="w-8 h-8" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            Add New {type === 'income' ? 'Income' : 'Expense'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Amount *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Date</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Category *</label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories[type].map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Account *</label>
            <Select value={formData.account} onValueChange={(value) => setFormData({ ...formData, account: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.name}>
                    {account.name} (${account.balance.toFixed(2)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Input
              placeholder="Optional description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full">
            Add {type === 'income' ? 'Income' : 'Expense'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
