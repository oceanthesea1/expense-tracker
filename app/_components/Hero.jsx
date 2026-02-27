import React from 'react'

function Hero() {
  return (
    <section className="bg-white lg:grid">
        <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-prose text-center">
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                    Manage your expenses<br/>
                    <strong className="text-blue-500"> control your waters </strong>
                </h1>

                <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                    start creating your budgets and track your expenses.
                </p>

                <div className="mt-4 flex justify-center gap-4 sm:mt-6">
                    <a className="inline-block rounded border border-blue-400 bg-blue-400 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-500" href="/dashboard">
                    Get Started
                    </a>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero