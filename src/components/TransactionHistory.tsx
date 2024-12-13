import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface Transaction {
  id: number;
  type: string;
  description: string;
  amount: number;
  date: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Historial de Transacciones</h2>
      <div className="space-y-4">
        <AnimatePresence>
          {transactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {transaction.type === 'income' ? (
                  <ArrowUpCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <ArrowDownCircle className="w-6 h-6 text-red-500" />
                )}
                <div>
                  <p className="text-white font-medium">{transaction.description}</p>
                  <p className="text-gray-400 text-sm">{transaction.date}</p>
                </div>
              </div>
              <span
                className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'} S/
                {transaction.amount.toFixed(2)}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {transactions.length === 0 && (
          <p className="text-gray-400 text-center py-4">No hay transacciones registradas</p>
        )}
      </div>
    </div>
  );
}