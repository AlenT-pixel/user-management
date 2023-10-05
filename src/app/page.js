"use client";
import Layout from '../components/layout'
import User from '../components/user/user'
import { NextUIProvider, useUser } from '@nextui-org/react'

export default function Home() {
  const { user } = useUser({ redirectTo: '/auth/login' })
  if (!user || user.isLoggedIn === false) {
    return  <div className="min-h-screen flex items-center justify-center">
      <p className="text-2xl font-bold">loading...</p>
    </div>
  }
  
  return (
    <NextUIProvider>
      <Layout>
        <User />
      </Layout>
    </NextUIProvider>
  )
}
