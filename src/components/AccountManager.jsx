
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const accountTypes = ['Checking', 'Savings', 'Credit Card', 'Investment'];

export function AccountManager({ accounts, onAddAccount }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    balance: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || formData.balance === '') {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (accounts.some(acc => acc.name.toLowerCase() === formData.name.toLowerCase())) {
      toast({
        title: "Account Exists",
        description: "An account with this name already exists.",
        variant: "destructive"
      });
      return;
    }

    const account = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      balance: parseFloat(formData.balance) || 0
    };

    onAddAccount(account);
    
    toast({
      title: "Account Created!",
      description: `Successfully created ${formData.name} account`,
    });

    setFormData({ name: '', type: '', balance: '' });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button className="gradient-bg text-white hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Add Account
          </Button>
        </motion.div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Add New Account
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Account Name *</label>
            <Input
              placeholder="e.g., Main Checking"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Account Type *</label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                {accountTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Initial Balance</label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
