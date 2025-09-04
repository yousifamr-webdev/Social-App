import React from 'react'
import "./Footer.module.css"
import siteLogo from "../../assets/socialApp_logo.png"
export default function Footer() {
  return (
    <>
      <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4 justify-center">
        <aside className="flex items-center justify-center">
          <img
            width="36"
            height="36"
            viewBox="0 0 24 24"
            src={siteLogo}
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          />

       
          <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
        </aside>
      
      </footer>
    </>
  );
}
