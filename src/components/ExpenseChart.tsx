import React from 'react';
import { motion } from 'framer-motion';
import { VictoryPie, VictoryLabel, VictoryAnimation } from 'victory';

interface ExpenseChartProps {
  income: number;
  expenses: number;
}

export default function ExpenseChart({ income, expenses }: ExpenseChartProps) {
  const total = income + expenses;
  const data = [
    { x: 'Income', y: income, color: '#22c55e' },
    { x: 'Expenses', y: expenses, color: '#ef4444' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg p-6"
    >
      <div style={{ height: 300 }}>
        <VictoryPie
          data={data}
          animate={{
            duration: 1000,
            easing: "bounce"
          }}
          colorScale={data.map(d => d.color)}
          labelComponent={
            <VictoryLabel
              style={{ fill: "white" }}
              animate={{
                duration: 1000,
                easing: "bounce"
              }}
            />
          }
          style={{
            labels: { fontSize: 14, fill: "white" },
            parent: { height: "100%" }
          }}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {data.map((item) => (
          <motion.div
            key={item.x}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div>
              <p className="text-white font-medium">{item.x}</p>
              <p className="text-gray-400 text-sm">
                {((item.y / total) * 100).toFixed(1)}%
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}