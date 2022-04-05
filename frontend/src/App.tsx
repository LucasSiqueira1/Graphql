import { gql, useQuery } from "@apollo/client";
import React from "react";
import { NewUserForm } from "./components/NewUserForm";

type User = {
  id: string;
  name: string;
};
export const GET_USER = gql`
  query {
    user {
      id
      name
    }
  }
`;

function App() {
  const { data, loading } = useQuery<{ user: User[] }>(GET_USER);

  if (loading) {
    return <p> Carregando...</p>;
  }

  console.log(data);
  return (
    <>
      <div>
        <ul>
          {data?.user.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <NewUserForm/>
      </div>
    </>
  );
}

export default App;
