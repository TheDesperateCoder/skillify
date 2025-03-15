import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const ResultsDisplay = ({ questions, userAnswers }) => {
  const totalQuestions = questions.length;
  let correctAnswers = 0;

  questions.forEach((question, index) => {
    if (userAnswers[index] && question.correctAnswer === userAnswers[index]) {
      correctAnswers++;
    }
  });

  const incorrectAnswers = totalQuestions - correctAnswers;
  const correctPercentage = (correctAnswers / totalQuestions) * 100;
  const incorrectPercentage = (incorrectAnswers / totalQuestions) * 100;

  const data = [
    { name: 'Correct', value: correctAnswers },
    { name: 'Incorrect', value: incorrectAnswers },
  ];

  const COLORS = ['#00C49F', '#FF8042']; // Green for correct, Orange for incorrect

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Results</h3>

      <div className="flex items-center justify-center mb-4">
        <ResponsiveContainer width={300} height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
             <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <p className="text-gray-700">
        Correct Answers: <span className="font-semibold text-green-600">{correctAnswers}</span> ({correctPercentage.toFixed(1)}%)
      </p>
      <p className="text-gray-700">
        Incorrect Answers: <span className="font-semibold text-red-600">{incorrectAnswers}</span> ({incorrectPercentage.toFixed(1)}%)
      </p>
    </div>
  );
};

export default ResultsDisplay;