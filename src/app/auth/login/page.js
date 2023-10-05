"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setMessage('')
    e.preventDefault();
    const validationErrors = validateForm(formData);
    const values = new FormData();
        values.append("username", formData.username);
        values.append("password", formData.password);
    if (Object.keys(validationErrors).length === 0) {
      const res = await fetch(`http://localhost:5001/api/login/`, {
        method: 'POST',
        body: values,
      })
      const response = await res.json()
      const { message, status, data, user } = response;
      if (status === true) {
        localStorage.setItem('token', JSON.stringify(data.access_token));
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/users');
      } else { setMessage(message) }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.username) {
      errors.username = 'User Name is required';
    }
    if (!data.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  return <section className="h-screen">
    <div className="h-full">
      <div
        className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        <div
          className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
          <img
            src="https://play-lh.googleusercontent.com/8-C8br4BmokaUNm1IHKL8pSkOn54ZYdcPXZ__z8LTeUvzMAVUipkPA6Hg3tqAQGTWQ=w240-h480-rw"
            // className="w-full"
            alt="Sample image" />
        </div>

        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
          <form onSubmit={handleSubmit}>
            <div className="relative mb-6" data-te-input-wrapper-init>
              <label>User Name</label>
              <input
                type="text"
                className="peer block min-h-[auto] rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput2"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="User Name" />
              {/* <label
                htmlFor="exampleFormControlInput2"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >Email address
              </label> */}
              {errors.username && <p className="text-red-500">{errors.username}</p>}
            </div>

            <div className="relative mb-6" data-te-input-wrapper-init>
              <label>Password</label>
              <input
                type="password"
                className="peer block min-h-[auto] rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput22"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password" />
              {/* <label
                htmlFor="exampleFormControlInput22"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >Password
              </label> */}
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
            <div className="text-center lg:text-left">
              <button
                type="submit"
                className="inline-block rounded bg-green-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-green-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light">
                Login
              </button>
              <div><p className="text-red-500">{message}</p></div>
              <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                Don't have an account? &nbsp;
                <a
                  href="/auth/registration"
                  className="text-green-400 transition duration-150 ease-in-out hover:text-green-500 focus:text-green-600 active:text-green-700"
                >Register</a
                >
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
}