"use client"
import React, {use, useState} from 'react'
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
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { useUser } from '@clerk/nextjs'
import { Budgets } from '@/utils/schema'
import { toast } from 'sonner'

function CreateBudget({refreshData}) {
    const [emojiIcon, setEmojiIcon] = useState('😁');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const {user} = useUser();
    const onCreateBudget = async () => {
        const result = await db.insert(Budgets).values({
            name: name,
            amount: amount,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            icon: emojiIcon 
        }).returning({insertedId: Budgets.id});
        if (result){
            refreshData();
            toast('Budget created successfully');
        }
    }

  return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
                <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 cursor-pointer hover:shadow-md transition-all duration-300'>
                    <h2 className='text-3xl'>+</h2>
                    <h2>Create New Budget</h2>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Budget</DialogTitle>
                    <DialogDescription>
                        <div className='mt-5'>
                            <Button variant='outline' size='lg' className='text-lg' onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emojiIcon}</Button>
                            <div className='absolute z-10'>
                                <EmojiPicker open={openEmojiPicker} onEmojiClick={(e) => {
                                        setEmojiIcon(e.emoji)
                                        setOpenEmojiPicker(false);
                                    }}/>
                            </div>
                            <div className='mt-2'>
                                <h2 className='text-black font-medium my-1'>Budget Name</h2>
                                <Input placeholder="Enter budget name" onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className='mt-2'>
                                <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                                <Input type="number" placeholder="Enter budget amount" onChange={(e) => setAmount(e.target.value)}/>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button disabled={!(name && amount)} onClick={() => onCreateBudget()} className="mt-5 w-full cursor-pointer">Create Budget</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default CreateBudget