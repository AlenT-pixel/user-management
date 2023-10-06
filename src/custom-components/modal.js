// components/Modal.js

import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { BASE_API_URL } from '@/confis';


const CustomModal = ({ isOpen, onOpenChange, editData, fetchData }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user'
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('')

    const closeModal = (close) => {
        formData.username = '';
        formData.email = '';
        formData.password = '';
        formData.role = 'user'
        close();
    }

    useEffect(() => {
        formData.username = editData?.username;
        formData.email = editData?.email;
        formData.password = '';
        formData.role = editData?.role;
    }, [editData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e, close) => {
        setMessage('');
        const token = JSON.parse(localStorage.getItem("token"));
        e.preventDefault();
        const validationErrors = validateForm(formData);
        const values = new FormData();
        values.append("username", formData.username);
        values.append("email", formData.email);
        values.append("password", formData.password);
        values.append("role", formData.role);
        if (Object.keys(validationErrors).length === 0) {
            const res = await fetch(`${BASE_API_URL}/api/user/${editData ? editData.id : ''}`, {
                method: editData ? 'PUT' : 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: values,
            })
            const data = await res.json()
            console.log("data============>", data);
            const { message, status } = data;
            if (status === true) {
                close();
                fetchData();
                formData.username = '';
                formData.email = '';
                formData.password = '';
                formData.role = 'user'
            } else { setMessage(message) }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = (data) => {
        const errors = {};
        if (!data.username) {
            errors.username = 'Username is required';
        }
        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(data.email)) {
            errors.email = 'Invalid email address';
        }
        if (!data.password) {
            errors.password = 'Password is required';
        } else if (data.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        return errors;
    };

    const isValidEmail = (email) => {
        // Add email validation logic here (e.g., regex)
        return true;
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className='text-black'>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">User</ModalHeader>
                        <ModalBody>
                            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                                <form >
                                    <div className="relative mb-6" data-te-input-wrapper-init>
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            className="peer block min-h-[auto] rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-dark-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            id="exampleFormControlInput"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="User Name" />
                                        {errors.email && <p className="text-red-500">{errors.username}</p>}
                                    </div>

                                    <div className="relative mb-6" data-te-input-wrapper-init>
                                        <label>Email Address</label>
                                        <input
                                            type="text"
                                            className="peer block min-h-[auto] rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-dark-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            id="exampleFormControlInput2"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email address" />
                                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                                    </div>

                                    <div className="relative mb-6">
                                        <select name='role' value={formData.role} onChange={handleChange} className="peer block min-h-[auto] rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-dark-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0">
                                            <option value={'admin'}>Admin</option>
                                            <option value={'user'}>User</option>
                                        </select>
                                    </div>

                                    <div className="relative mb-6" data-te-input-wrapper-init>
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            className="peer block min-h-[auto] rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-dark-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            id="exampleFormControlInput22"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Password" />
                                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                                    </div>
                                </form>
                            </div>
                            <div><p className='text-red-500'>{message}</p></div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onClick={() => { closeModal(onClose) }}>
                                Close
                            </Button>
                            <Button color="primary" onClick={(e) => handleSubmit(e, onClose)}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CustomModal;
