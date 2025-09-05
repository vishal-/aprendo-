"use client";

import React from "react";
import Image from "next/image";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

const AuthPage = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      toast.success("Logged in successfully!");
      router.push("/user/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 mt-12 border border-gray-600 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-light">
          Login or Sign Up
        </h1>
        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 px-4 border border-gray-600 rounded-lg shadow-sm flex items-center justify-center space-x-3 bg-gray-700 text-light hover:bg-gray-600 transition-colors duration-300"
          >
            <Image src="/google.svg" alt="Google Logo" width={20} height={20} />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
