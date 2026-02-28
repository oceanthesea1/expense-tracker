"use client"
import React, { useEffect, useState } from 'react'
import ExpensesListTable from './_components/expenseslisttable'
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';

function ExpensesPage() {
    const [expensesList, setExpensesList] = useState([]);
    const {user} = useUser();

    useEffect(() => {
        user&&getExpensesList();
    }, [user])

    const getExpensesList = async () => {
        const result = await db.select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
        budgetId: Expenses.budgetId,
        }).from(Budgets).rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(Expenses.createdAt, 'desc');
    
        setExpensesList(result);
    }

  return (
    <div className='pr-5 pl-5'>
        <ExpensesListTable expensesList={expensesList} refreshData={() => getExpensesList()} />
    </div>
  )
}

export default ExpensesPage