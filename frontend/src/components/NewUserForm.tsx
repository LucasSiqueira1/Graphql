import { gql, useMutation } from "@apollo/client";
import { GET_USER } from "../App";
import { FormEvent, useState } from "react";
import { client } from "../lib/apollo";

const CREATE_USER = gql`
  mutation ($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export function NewUserForm() {
    const [name, setName] = useState("");
    const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

    async function handleCreateUser(event: FormEvent) {
        event.preventDefault(); //pra não atualizar a pagina

        if (!name) {
            return;
        }

        await createUser({
            variables: {
                name,
            },
            update(cache, { data: { createUser } }) {
                const { user } = client.readQuery({ query: GET_USER });
                cache.writeQuery({
                    query: GET_USER,
                    data: {
                        user: [...user, createUser],
                    },
                });
            },
        });

        setName('')
    }
    return (
        <>
            <form onSubmit={handleCreateUser}>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button type="submit">Enviar</button>
            </form>
        </>
    );
}
