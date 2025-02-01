'use client'
import LoginForm from "./_UI/LoginForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/util/firebase/firebase.init";
import HomePage from "./_UI/HomePage";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Spin } from "antd";

const queryClient = new QueryClient()

export default function Home() {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <div className="flex justify-center py-10">
      <Spin size='large' />
    </div>
  }

  if (user) {
    return (
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    );
  }
  return (
    <div className="">
      <LoginForm />
    </div>
  );
}
