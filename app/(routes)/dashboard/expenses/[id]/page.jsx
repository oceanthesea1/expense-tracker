"use client"
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs';
import { eq, getTableColumns, sql } from 'drizzle-orm'
import React, { use, useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/budgetitem';
import AddExpense from '../_components/addexpense';
import ExpensesListTable from '../_components/expenseslisttable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash, PenBox } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../../budgets/_components/editbudget';

function ExpensesData({params}) {
    const { user } = useUser();
    const { id } = React.use(params);
    const [budgetInfo, setBudgetInfo] = useState();
    const [expensesList, setExpensesList] = useState([]);
    const route = useRouter();

    useEffect(() => {
        user&&getBudgetInfo();
    }, [user])

    const getBudgetInfo = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql `count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .where(eq(Budgets.id, id))
        .groupBy(
            Budgets.id,
            Budgets.name,
            Budgets.amount,
            Budgets.icon,
            Budgets.createdBy,
            Budgets.createdAt
        )

        setBudgetInfo(result[0]);
        getExpensesList();
    }

    const getExpensesList = async () => {
        const result = await db.select().from(Expenses).where(eq(Expenses.budgetId, id))
        .orderBy(Expenses.id, 'desc');
        setExpensesList(result);
    }

    const deleteBudget = async () => {
        const deleteExpenses = await db.delete(Expenses).where(eq(Expenses.budgetId, id)).returning();

        if (deleteExpenses) {
            const result = await db.delete(Budgets).where(eq(Budgets.id, id)).returning();
        }
        route.replace('/dashboard/budgets');
        toast('Budget deleted successfully');
    }

  return (
    <div className='p-10'>
        <h2 className='text-3xl font-bold flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
                <ArrowLeft size="35px" className='cursor-pointer' onClick={() => route.back()}/>
                My Expenses
            </div>
            <div className='flex gap-2 items-center'>
                <EditBudget budgetInfo={budgetInfo} refreshData={() => getBudgetInfo()} />

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="flex gap-2 cursor-pointer transform transition-all duration-200 ease-in-out hover:scale-105" variant='destructive'><Trash/> Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[40%]">
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your current budget and all of its associated expenses from our servers.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction className="cursor-pointer" onClick={() => deleteBudget()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-5'>
            { budgetInfo ? <BudgetItem budget = {budgetInfo}/> : 
            <div className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse relative overflow-hidden'>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div> }
            <AddExpense budgetId = {id} user = {user} refreshData={() => getBudgetInfo()} />
        </div>
        <div className='mt-4'>
            <ExpensesListTable expensesList={expensesList} refreshData={() => getBudgetInfo()}/>
        </div>
    </div>
  )
}

export default ExpensesData