"use client";

import React, { useEffect, useState } from 'react';
import Header from './header';
import Content from './content';
import { useRouter } from 'next/navigation';

const Layout = ({ children }) => {
  const [user, setUser] = useState(false);
  const router = useRouter();

  const verifyToken = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(`http://localhost:5001/api/verify`,{
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("result===========>", result);
        if (!result.status) {
          setUser(false);
          router.push('auth/login');
        } else {
          setUser(true);
        }
      })
      .catch((error) => {
        setUser(false);
       router.push('auth/login');
      });
  }

  useEffect(() => {
    verifyToken();
  })

  if (!user || user === false) {
    return <div class="min-h-screen flex items-center justify-center">
      <p class="text-2xl font-bold">loading...</p>
    </div>
  }

  return (
    <div className="grid grid-cols-1">
      <div>
        <Header />
      </div>
      <div className="grid grid-cols-1">
        {/* <div className="w-full"><Sidebar /></div> */}
        <div className="w-full"><Content>{children}</Content></div>
      </div>
    </div>
  );
};

export default Layout;
