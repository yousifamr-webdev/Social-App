import React from 'react'
import "./Notfound.module.css"

export default function Notfound() {
  return (
    <>
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-neutral-800">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-neutral sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <a
              href="/"
              className="btn btn-neutral rounded"
            >
              Go back home
            </a>
           
          </div>
        </div>
      </main>
    </>
  );
}
