import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import Input from './Input';
import { Plus } from 'lucide-react';

interface TransactionFormProps {
  onSubmit: (data: { type: string; description: string; amount: number }) => void;
}

export default function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [type, setType] = useState('income');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type,
      description,
      amount: parseFloat(amount),
    });
    setDescription('');
    setAmount('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg p-6 mb-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setType('income')}
            className={`p-3 rounded-lg transition-colors ${
              type === 'income'
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Ingreso
          </button>
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`p-3 rounded-lg transition-colors ${
              type === 'expense'
                ? 'bg-red-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Gasto
          </button>
        </div>

        <Input
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="bg-gray-700 text-white border-gray-600"
        />

        <Input
          label="Monto"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0"
          step="0.01"
          className="bg-gray-700 text-white border-gray-600"
        />

        <Button type="submit" fullWidth className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Agregar Transacción
        </Button>
      </form>
    </motion.div>
  );
}