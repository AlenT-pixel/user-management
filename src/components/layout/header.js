import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState('Guest')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    setUser(user.username)
  }, [])

  const handleLogout = () => {
    console.log("works");
    router.push('/auth/login');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return (
    <header className="bg-green-500 p-4">
      <div className='grid grid-flow-row-dense grid-cols-2'>
        <div>
          <h1 className="text-white text-2xl font-semibold">User Management</h1>
        </div>
        <div className='text-right'>
          <button><i className="fa fa-user fa-md px-2" />{user}</button>
          <button className='mx-4 hover:cursor-pointer' onClick={()=> {handleLogout()}}><i className="fa fa-power-off fa-md px-2"/>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
