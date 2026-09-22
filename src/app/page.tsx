"use client";

import { useEffect, useState } from "react";

type User = {
  id: string | number;
  name: string;
};

function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchAllUsers() {
      const res = await fetch("/api/users"); 
      const data = await res.json();
      setUsers(data.data); 
    }

    fetchAllUsers();
  }, []);

  return (
    <div>
      <h1 className="text-red-600">USER PAGE</h1>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default Home;