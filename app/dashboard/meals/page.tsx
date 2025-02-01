"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/util/firebase/firebase.init";
import { Spin } from "antd";
import LoginForm from "@/app/_UI/LoginForm";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spin size="large" />
      </div>
    );
  }

  if (user) {
    return (
     <div className="container mx-auto">
        
     </div>
    );
  }
  return (
    <div className="">
      <LoginForm />
    </div>
  );
}
