import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({ budgetList }) {
  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg mb-5'>Budget Activity</h2>
      <ResponsiveContainer width={'100%'} height={400}>
        <BarChart data={budgetList}>
          <XAxis dataKey= 'name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar name='Total Spend' dataKey='totalSpend' stackId="a" fill='#4845d2' />
          <Bar name='Budget Amount' dataKey='amount' stackId="b" fill='#C3C2FF' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard