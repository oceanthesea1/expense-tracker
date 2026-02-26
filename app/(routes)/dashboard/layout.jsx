"use client"
import React, { use, useEffect } from 'react'
import SideNav from './_components/sidenav'
import DashboardHeader from './_components/dashboardheader'
import { Budgets } from '@/utils/schema'
import { db } from '@/utils/dbConfig'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'

function DashboardLayout({children}) {
  const {user} = useUser();
  const router = useRouter();

  useEffect(() => {
    user&&checkUserBudget();
  }, [user])

  const checkUserBudget = async () => {
    const result = await db.select().from(Budgets).where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
    console.log(result);
    if (result?.length == 0) {
      router.replace('/dashboard/budgets')
    }
  }
  return (
    <div className="dashboard-layout">
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout