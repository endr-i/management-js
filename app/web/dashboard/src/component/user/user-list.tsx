import React from 'react';
import { useHttp } from '../../context/http.context';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


export type User = {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: Date;
}

function UserList() {

  const [users, setUsers] = React.useState<User[]>([]);
  const http = useHttp();

  React.useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  const createUser = React.useCallback(async (user: Partial<User>) => {
    try {
      const { request } = await http.post<User>('/api/user', user);
      const newUser = (await request).data
      setUsers([...users, newUser]);
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  const getUsers = async () => {
    try {
      const { request } = await http.get<User[]>('/api/user');

      return (await request).data;
    } catch (e) {
      console.error(e);

      return [];
    }
  }

  const deleteUser = async (id: string) => {
    try {
      const { request } = await http.delete<User>(`/api/user/${id}`);

      setUsers(users.filter(user => user.id !== id));
    } catch (e) {
      console.error(e);
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

  const editUser = (id: string) => {

  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {`${user.firstName} ${user.lastName}`}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.createdAt.toString()}
                </TableCell>
                <TableCell align="center">
                  <div className="flex justify-around align-middle">
                    <Button onClick={() => deleteUser(user.id)}>Delete</Button>
                    <Button onClick={() => editUser(user.id)}>Update</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    // <div className="">
    //   <form onSubmit={handleSubmit}>
    //     <input name="first-name" required/>
    //     <input name="last-name" required/>
    //     <button type="submit">Create User</button>
    //   </form>
    //
    //   <ul>
    //     {users.map(user => (
    //       <li key={user.id}>
    //         {user.firstName} {user.lastName}
    //         <button onClick={() => deleteUser(user.id)}>Delete</button>
    //         {/*<button onClick={() => updateUser(user.id, { id: user.id, name: 'Updated User' })}>Update</button>*/}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  )
}

export default UserList;
