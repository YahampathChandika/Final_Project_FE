import React from "react";
import { useGetSignedUserQuery } from "../../store/api/userApi";

export default function UserDetails() {
  const { data: signedUser } = useGetSignedUserQuery();
  const user = signedUser?.payload;

  // Determine if the app is running locally or on hosted environment
  const isLocalhost = window.location.hostname === "localhost";
  
  // Determine the base URL based on the environment
  const baseUrl = isLocalhost
    ? "http://localhost:4000"
    : "http://44.204.115.155:4000"; // Replace with your hosted backend URL
  
  // Convert image path based on the OS environment
  const imagePath = isLocalhost 
    ? user?.image.replace(/\//g, "\\") // Convert to Windows-style backslashes locally
    : user?.image.replace(/\\/g, "/"); // Convert to Linux-style forward slashes for hosting
  
  console.log("User", user);

  return (
    <div className="flex">
      <img
        src={`${baseUrl}/${imagePath}`} // Use the modified image path
        alt="Profile"
        className="w-12 h-12 rounded-full mr-5"
      />
      <div>
        <p className="text-xl font-semibold">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-txtgray">{user?.speciality || user?.role}</p>
      </div>
    </div>
  );
}
