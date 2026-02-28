import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({ budgetList }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0, 
    }).format(value || 0);
  };

  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg mb-5'>Budget Activity</h2>
      <ResponsiveContainer width={'100%'} height={400}>
        <BarChart data={budgetList}>
          <XAxis dataKey= 'name' />
          <YAxis />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />
          <Bar name='Total Spend' dataKey='totalSpend' fill='#1a4680' />
          <Bar name='Budget Amount' dataKey='amount' fill='#4890ff' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard