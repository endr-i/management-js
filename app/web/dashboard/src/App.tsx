import React from 'react';
import './App.css';
import { diContainer } from "./inversify/container";
import { HttpService } from "./service/http.service";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: Date;
}

function App() {
  const [users, setUsers] = React.useState<User[]>([])

  const http = diContainer.get(HttpService);

  React.useEffect(() => {
    getUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  const createUser = React.useCallback(async (user: Partial<User>) => {
    const { request } = await http.post<User>('/api/user', user);
    const newUser = (await request).data
    setUsers([...users, newUser]);
  }, [users]);

  const getUsers = async () => {
    const { request } = await http.get<User[]>('/api/user');

    return request;
  }

  const deleteUser = async (id: string) => {
    const response = await fetch(`/api/user/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setUsers(users.filter(user => user.id !== id));
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget
    const formData = new FormData(target);
    const user = {
      firstName: formData.get('first-name') as string,
      lastName: formData.get('last-name') as string,
    };
    await createUser(user);
    target.reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="first-name" required/>
        <input name="last-name" required/>
        <button type="submit">Create User</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            {/*<button onClick={() => updateUser(user.id, { id: user.id, name: 'Updated User' })}>Update</button>*/}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
