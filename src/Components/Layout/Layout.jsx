import React from 'react'
import "./Layout.module.css"
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';


export default function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="mx-auto py-8 container flex-grow">
          <Outlet />
        </main>
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </>
  );
}
