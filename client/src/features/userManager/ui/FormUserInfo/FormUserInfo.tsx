import React, { useEffect } from "react";
import { useUser } from "../../lib/useUser";

export default function FormUserInfo() {
  const { getUserInfo, user } = useUser();

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div style={{ backgroundColor: "green", marginTop: "50px" }}>
      <p>Id: {user?.id}</p>
      <p>Name: {user?.username}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}
