import React from "react";
import Header from "./Header";
import { Link, Outlet, useLoaderData } from "react-router-dom";


export async function loadUsers() {
  const users = await fetch("http://localhost:2222/users/");
  return users;
}

export default function Users() {
  const users = useLoaderData();
  const userList = users.map((ur) => (
    <li key={ur.id}>
      <Link to={`${ur.id}`}>
        {ur.name}
      </Link>
    </li>
  ));

  return (
    <>
      <Header />
      <h2>Users</h2>
      <ul>{userList}</ul>
      <div>
        <Outlet />
      </div>
    </>
  );
}
