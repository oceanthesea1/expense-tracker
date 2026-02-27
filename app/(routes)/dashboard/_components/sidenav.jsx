"use client"
import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, Receipt, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import path from 'path'
import React from 'react'

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid, 
            path: '/dashboard'
        }, 
        {
            id: 2,
            name: 'Budgets',
            icon: PiggyBank, 
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: Receipt, 
            path: '/dashboard/expenses'
        }, 
    ]
    const path = usePathname();
  return (
    <div className="h-screen  border shadow-sm">
        <div className='mb-15'>
            <Link href="/dashboard">
                <Image src="/logo.svg" alt="Logo" width={120} height={50} className="mx-auto pt-5" />
            </Link>
        </div>
        <div className='mt-5'>
            {menuList.map((menu) => (
                <Link href={menu.path} key={menu.id}>
                    <h2 className={`flex gap-2 items-center mb-1 text-gray-700 font-medium ml-1 mr-1 p-3 cursor-pointer rounded-md hover:text-blue-800 hover:bg-gray-200 ${path == menu.path && 'text-blue-800 bg-gray-200'}`}>
                        <menu.icon />
                        {menu.name}
                    </h2>
                </Link>
            ))}
        </div>
        <div className="absolute bottom-5 left-0 w-full px-3">
            <div className="flex items-center gap-2 w-full p-3 rounded-md hover:bg-gray-200 cursor-pointer">
                <UserButton />
                <span className="flex-1">Profile</span>
            </div>
        </div>
    </div>
  )
}

export default SideNav