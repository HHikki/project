import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface SummaryProps {
  income: number;
  expenses: number;
}

export default function Summary({ income, expenses }: SummaryProps) {
  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
        className="bg-gray-800 p-6 rounded-lg"
      >
        <div className="flex items-center space-x-3">
          <div className="bg-green-500/20 p-3 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-gray-400">Ingresos</p>
            <p className="text-2xl font-bold text-white">S/{income.toFixed(2)}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800 p-6 rounded-lg"
      >
        <div className="flex items-center space-x-3">
          <div className="bg-red-500/20 p-3 rounded-full">
            <TrendingDown className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-gray-400">Gastos</p>
            <p className="text-2xl font-bold text-white">S/{expenses.toFixed(2)}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800 p-6 rounded-lg"
      >
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500/20 p-3 rounded-full">
            <Wallet className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-gray-400">Balance</p>
            <p className="text-2xl font-bold text-white">S/{balance.toFixed(2)}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}