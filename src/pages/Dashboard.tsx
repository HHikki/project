import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';
import ExpenseChart from '../components/ExpenseChart';
import TransactionHistory from '../components/TransactionHistory';
import Summary from '../components/Summary';
import Button from '../components/Button';
import { LogOut, Home } from 'lucide-react';
import axios from 'axios';

interface Transaction {
  id: number;
  type: string;
  description: string;
  amount: number;
  date: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost/api/transactions.php');
      setTransactions(response.data);
      calculateTotals(response.data);
    } catch (error) {
      console.error('Error al obtener transacciones:', error);
    }
  };

  const calculateTotals = (transactions: Transaction[]) => {
    const { totalIncome, totalExpenses } = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.totalIncome += transaction.amount;
        } else {
          acc.totalExpenses += transaction.amount;
        }
        return acc;
      },
      { totalIncome: 0, totalExpenses: 0 }
    );

    setIncome(totalIncome);
    setExpenses(totalExpenses);
  };

  const handleTransactionSubmit = async (data: {
    type: string;
    description: string;
    amount: number;
  }) => {
    try {
      await axios.post('http://localhost/api/transactions.php', data);
      fetchTransactions();
    } catch (error) {
      console.error('Error al agregar transacción:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 text-white p-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gestor de Gastos Personales</h1>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600"
            >
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </Button>
            <Button
              variant="secondary"
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </Button>
          </div>
        </div>
        
        <Summary income={income} expenses={expenses} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <TransactionForm onSubmit={handleTransactionSubmit} />
            <TransactionHistory transactions={transactions} />
          </div>
          <div>
            <ExpenseChart income={income} expenses={expenses} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}