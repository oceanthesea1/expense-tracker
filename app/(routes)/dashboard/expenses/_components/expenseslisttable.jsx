import { Button } from '@/components/ui/button';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash, PenBox } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import EditExpense from './editexpense';

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false 
  };
  return date.toLocaleString('en-US', options);
};

function ExpensesListTable({ expensesList, refreshData }) {
    const router = useRouter();
    const deleteExpense = async (expense) => {
        const result = await db.delete(Expenses).where(eq(Expenses.id, expense.id)).returning();
        if (result) {
            toast('Expense deleted successfully');
            refreshData();
        }
    }

    const goToBudget = (budgetId, event) => {
      event.stopPropagation();
      console.log('Navigating to budget with ID:', budgetId);
      if (!budgetId) {
        toast('Budget ID not found');
        return;
      }
      router.push(`/dashboard/expenses/${budgetId}`);
    }

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
    };

  return (
    <div>
      <h2 className='mt-5 font-bold text-lg'>List of Expenses</h2>
      <div className="mt-3 border border-gray-300 rounded-lg overflow-hidden">
        <div className="flex bg-slate-200 p-3 font-bold gap-6 text-lg border-b border-gray-300">
          <div className="flex-1">Name</div>
          <div className="flex-1">Amount</div>
          <div className="flex-1">Date</div>
          <div className="flex-1">Action</div>
        </div>
        {expensesList.map((expense, index) => (
          <div key={index} className="flex border-t p-3 gap-6 text-lg border-gray-300 hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer"
            onClick={(event) => goToBudget(expense.budgetId, event)}
          >
            <div className="flex-1">{expense.name}</div>
            <div className="flex-1">{formatCurrency(expense.amount)}</div>
            <div className="flex-1">{formatDateTime(expense.createdAt)}</div>
            <div className="flex-1 flex gap-2">
              <EditExpense expenseInfo={expense} refreshData={refreshData} />
              <Button className="cursor-pointer transform transition-all duration-200 ease-in-out hover:scale-105" variant='destructive' onClick = {(e) => {e.stopPropagation(); deleteExpense(expense);}}><Trash/> Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpensesListTable;