"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { UserDetails, UserRole } from "../../types/userDetails";
import { useAuthStore } from "@/store/auth";
import { useUserDetailsStore } from "@/store/userDetailsStore";

export default function UserDetailsForm() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { userDetails, setUserDetails } = useUserDetailsStore();
  const [formData, setFormData] = useState<UserDetails>({
    uid: user?.uid || "",
    email: user?.email || "",
    profilePicture: "",
    phone: "",
    phoneVerified: false,
    termsAccepted: false,
    termsAcceptedAt: new Date(),
    createdAt: new Date(),
    displayName: "",
    role: UserRole.TUTOR
  });

  useEffect(() => {
    // Pre-fill form with existing user details if available
    if (userDetails && user?.uid === userDetails.uid) {
      setFormData(userDetails);
    }
  }, [user, userDetails]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("You must accept the terms and conditions to proceed.");
      return;
    }
    // Save details to zustand store (simulate DB save)
    setUserDetails(formData);
    alert("User details saved successfully!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 mt-12 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          User Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-300"
            >
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              id="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
            />
          </div>
          <div>
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-gray-300"
            >
              Profile Picture URL
            </label>
            <input
              type="url"
              name="profilePicture"
              id="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-300"
            >
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
            />
          </div>
          {/* <div className="flex items-center">
            <input
              type="checkbox"
              name="phoneVerified"
              id="phoneVerified"
              checked={formData.phoneVerified}
              onChange={handleChange}
              className="h-4 w-4 text-blue-500 border-gray-600 rounded bg-gray-700"
            />
            <label
              htmlFor="phoneVerified"
              className="ml-2 block text-sm text-gray-300"
            >
              Phone Verified
            </label>
          </div> */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              id="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
              className="h-4 w-4 text-blue-500 border-gray-600 rounded bg-gray-700"
            />
            <label
              htmlFor="termsAccepted"
              className="ml-2 block text-sm text-gray-300"
            >
              I accept the terms and conditions
            </label>
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-300"
            >
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
            >
              <option value="tutor">Tutor</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
              <option value="academy">Academy</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Details
          </button>
        </form>
      </div>
    </div>
  );
}
