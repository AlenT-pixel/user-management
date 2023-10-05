"use client";
import Layout from '../components/layout'
import User from '../components/user/user'
import { NextUIProvider, useUser } from '@nextui-org/react'

export default function Home() {
  return (
    <NextUIProvider>
      <Layout>
        <User />
      </Layout>
    </NextUIProvider>
  )
}
