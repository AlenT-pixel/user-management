"use client";

import CustomModal from '@/custom-components/modal';
import TableWithPagination from '@/custom-components/tablewithpagination';
import { useDisclosure } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

const User = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(4)
  const [totalCount, setTotalCount] = useState(0);
  const [role, setRole] = useState('Guest')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    setRole(user.role)
    console.log("user=======>", user.role);
  }, [])

  useEffect(() => {
    fetchUser();
  }, [page]);

  const handlePagination = (page, count) => {
    setPage(page + 1);
    setCount(count);
  }

  const fetchData = () => {
    fetchUser();
  }

  const fetchUser = () => {
    setLoading(true);
    fetch(`http://68.178.173.131:5001/api/user?page=${page}&&count=${count}`)
      .then((response) => response.json())
      .then((result) => {
        const { data, count } = result;
        setTotalCount(count);
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }

  return (
    <div>
      <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-1 my-4">
        <div className='col-span-2' />
        {role === 'admin' ? <div className='text-right'><button className='bg-green-700 text-white px-4 py-2 rounded' onClick={() => { onOpen() }}><i className="fa fa-plus fa-md px-2" />Add User</button></div>: null}
      </div>
      <TableWithPagination data={data} handlePagination={handlePagination} totalCount={totalCount} count={count} fetchData={fetchData} loading={loading} />
      <CustomModal isOpen={isOpen} onOpenChange={onOpenChange} fetchData={fetchData} />
    </div>
  );
};

export default User;
