"use client";
import React from "react";
import "tailwindcss/tailwind.css";

import { signIn, signOut, useSession } from "next-auth/react";

const SignInButton = () => {
  const { data: session } = useSession();
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  if (session && session.user) {
    return (
      <div
      className="flex items-center gap-2 ml-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`rounded rounded-full sm:w-[25px] sm:h-[25px] md:w-[50px] md:h-[50px] ${isHovered ? 'visible' : 'hidden'}`}
        style={{ width: '40px', height: '40px', marginRight: '6px', border:"1px solid yellow" ,
        cursor: 'pointer', backgroundImage:`url(${session.user.image})`, backgroundSize:"cover", backgroundRepeat:"no-repeat" }}
      >

      </div>
      <p className={`text-sky-600 sm:text-sm md:text-sm mr-2 ${isHovered ? 'visible' : 'hidden'}`}
       style={{display:isHovered?'block':'none'}}
      >{session.user.name}</p>
      <button
        onClick={() => signOut()}
        style={{display:isHovered?'block':'none'}}
        className={`text-red-600 sm:text-sm md:text-sm ${isHovered ? 'visible' : 'hidden'}`}
      >
        Sign Out
      </button>
    </div>
    );
  }
  return (
    <button
      onClick={() => signIn()}
      className="text-white py-5 block px-3 rounded bg-black ml-auto"
    >
      Sign In
    </button>
  );
};

export default SignInButton;
