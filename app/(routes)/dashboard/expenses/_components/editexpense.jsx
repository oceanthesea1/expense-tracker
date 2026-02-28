"use client"
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUser } from '@clerk/nextjs'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'

function EditExpense({ expenseInfo, refreshData }) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const { user } = useUser();

  useEffect(() => {
    if (expenseInfo) {
      setName(expenseInfo?.name);
      setAmount(expenseInfo?.amount);
    }
  }, [expenseInfo])

  const onUpdateExpense = async () => {
    const result = await db.update(Expenses).set({
      name: name,
      amount: amount,
    }).where(eq(Expenses.id, expenseInfo.id)).returning();

    if (result) {
      refreshData();
      toast("Expense updated successfully");
    }
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2 cursor-pointer transform transition-all duration-200 ease-in-out hover:scale-105" onClick={(e) => e.stopPropagation()}><PenBox /> Edit</Button>
        </DialogTrigger>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
            <DialogDescription>
              <div className='mt-5'>
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Expense Name</h2>
                  <Input placeholder="Enter expense name" defaultValue={expenseInfo?.name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                  <Input type="number" placeholder="Enter expense amount" defaultValue={expenseInfo?.amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button disabled={!(name && amount)} onClick={() => onUpdateExpense()} className="mt-5 w-full cursor-pointer">Edit Expense</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditExpense