import React from "react";
import { useGetSignedUserQuery } from "../../store/api/userApi";

export default function UserDetails() {
  const { data: signedUser } = useGetSignedUserQuery();
  const user = signedUser?.payload;
  console.log("User", user)
  return (
    <div className="flex">
      <img
        src={`https://6931-112-135-220-49.ngrok-free.app/${user?.image}`}
        // src={`http://localhost:4000/${user?.image}`}
        // src={`http://44.204.115.155:4000/${user?.image}`}
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
