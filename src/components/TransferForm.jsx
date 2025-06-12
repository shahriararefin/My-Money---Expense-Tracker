
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowRightLeft, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

export function TransferForm({ accounts, onTransfer }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    fromAccount: '',
    toAccount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.fromAccount || !formData.toAccount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.fromAccount === formData.toAccount) {
      toast({
        title: "Invalid Transfer",
        description: "Cannot transfer to the same account.",
        variant: "destructive"
      });
      return;
    }

    const fromAccount = accounts.find(acc => acc.name === formData.fromAccount);
    if (fromAccount.balance < parseFloat(formData.amount)) {
      toast({
        title: "Insufficient Funds",
        description: "Not enough balance in the source account.",
        variant: "destructive"
      });
      return;
    }

    const transfer = {
      id: Date.now().toString(),
      amount: parseFloat(formData.amount),
      fromAccount: formData.fromAccount,
      toAccount: formData.toAccount,
      description: formData.description,
      date: formData.date,
      timestamp: new Date().toISOString()
    };

    onTransfer(transfer);
    
    toast({
      title: "Transfer Completed!",
      description: `Successfully transferred $${formData.amount} from ${formData.fromAccount} to ${formData.toAccount}`,
    });

    setFormData({
      amount: '',
      fromAccount: '',
      toAccount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="transfer-gradient text-gray-800 cursor-pointer card-hover">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ArrowRightLeft className="w-5 h-5" />
                Transfer Money
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ArrowRightLeft className="w-8 h-8" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5" />
            Transfer Money
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
            <label className="text-sm font-medium mb-2 block">From Account *</label>
            <Select value={formData.fromAccount} onValueChange={(value) => setFormData({ ...formData, fromAccount: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select source account" />
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
            <label className="text-sm font-medium mb-2 block">To Account *</label>
            <Select value={formData.toAccount} onValueChange={(value) => setFormData({ ...formData, toAccount: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select destination account" />
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
            Transfer Money
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
