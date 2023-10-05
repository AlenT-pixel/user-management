"use client";

import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import CustomModal from './modal';
import { useDisclosure } from '@nextui-org/react';
import { BASE_API_URL } from '@/confis';

const TableWithPagination = ({ data, handlePagination, totalCount, count, fetchData, loading }) => {
    const itemsPerPage = count; // Number of items per page
    const [currentPage, setCurrentPage] = useState(0);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [editData, setEditData] = useState(null);
    const [role, setRole] = useState('Guest')

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        setRole(user.role)
    }, [])

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        handlePagination(selected, itemsPerPage);
    };

    const handleModal = (item) => {
        setEditData(item);
        onOpen()
    }

    const deleteUser = async (id) => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const res = await fetch(`${BASE_API_URL}/api/user/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json()
            const { message, status } = data;
            if (status === false) {
                alert(message);
            } else {
                alert('success');
                fetchData();
            }
        } catch (error) {
            alert(error?.message)
        }
    }

    return (
        <div>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th >Id</th>
                        <th>Username</th>
                        <th>Email</th>
                        {role === 'admin' ? <th colSpan={2}>Actions</th> : null }
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index}>
                            <td align='center'>{item.id}</td>
                            <td align='center'>{item.username}</td>
                            <td align='center'>{item.email}</td>
                            {role === 'admin' ? <td align='center'><i className='fa fa-pen hover:cursor-pointer' onClick={() => { handleModal(item) }} /></td>: null}
                            {role === 'admin' ?<td align='center'><i className='fa fa-trash hover:cursor-pointer' onClick={() => { deleteUser(item.id) }} /></td>: null}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 pagination">
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={totalCount ? Math.ceil(totalCount / itemsPerPage) : 0}
                    onPageChange={handlePageChange}
                    activeClassName={'active'}
                    containerClassName="pagination-list"
                    pageClassName="pagination-item"
                    previousClassName="pagination-previous"
                    nextClassName="pagination-next"
                    disabledClassName="disabled"
                />
            </div>
            <CustomModal isOpen={isOpen} onOpenChange={onOpenChange} editData={editData} fetchData={fetchData} />
        </div>
    );
};

export default TableWithPagination;
