import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

function Header() {
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
        <Image src={'./logo.svg'}
        alt='logo'
        width={60}
        height={60}
        />
        <div className="flex gap-3">
          <SignedOut>
            <SignInButton>
              <button className="bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] text-white rounded-lg font-semibold text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white rounded-lg font-semibold text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
    </div>
  )
}

export default Header