import { PiggyBank, ReceiptText, Wallet2 } from 'lucide-react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function CardInfo({ budgetList }) {
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);

    useEffect(() => {
      budgetList&&calculateCardInfo();
    }, [budgetList])

    const calculateCardInfo = () => {
      let totalBudget_ = 0;
      let totalSpend_ = 0;

      budgetList.forEach(element => {
        totalBudget_ = totalBudget_ + Number(element.amount);
        totalSpend_ = totalSpend_ + Number(element.totalSpend);
      });

      setTotalBudget(totalBudget_);
      setTotalSpend(totalSpend_);
    }

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value || 0);
    };

  return (
    <div>
      {budgetList?.length > 0? <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <Link href="/dashboard/budgets" className='hover:shadow-md rounded-lg'>
          <div className='p-6 bg-white border border-gray-300 rounded-lg shadow-md flex justify-between items-center'>
            <div>
              <h2 className='text-sm text-gray-600'>Total Budget</h2>
              <h2 className='font-bold text-2xl text-gray-900'>
                {formatCurrency(totalBudget)}
              </h2>
            </div>
            <PiggyBank size="30px" />
          </div>
        </Link>
        <Link href="/dashboard/expenses" className='hover:shadow-md rounded-lg'>
          <div className='p-6 bg-white border border-gray-300 rounded-lg shadow-md flex justify-between items-center'>
            <div>
              <h2 className='text-sm text-gray-600'>Total Spent</h2>
              <h2 className='font-bold text-2xl text-gray-900'>
                {formatCurrency(totalSpend)}
              </h2>
            </div>
            <ReceiptText size="30px" />
          </div>
        </Link>
        <Link href="/dashboard/budgets" className='hover:shadow-md rounded-lg'>
          <div className='p-6 bg-white border border-gray-300 rounded-lg shadow-md flex justify-between items-center'>
            <div>
              <h2 className='text-sm text-gray-600'>No. Of Budget</h2>
              <h2 className='font-bold text-2xl text-gray-900'>
                {budgetList?.length || 0 }
              </h2>
            </div>
            <Wallet2 size="30px" />
          </div>
        </Link>
      </div>
      : 
      <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {[1, 2, 3].map((item, index) => (
          <div key={index} className='w-full bg-slate-200 rounded-lg h-[115px] animate-pulse relative overflow-hidden'>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>
        ))}
      </div>
      }
    </div>
  )
}

export default CardInfo