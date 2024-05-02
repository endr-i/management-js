import React from 'react';
import { useHttp } from '../../context/http.context';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';


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
  const navigate = useNavigate();

  React.useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  const deleteUser = React.useCallback(async (id: string) => {
    try {
      await http.delete<User>(`/api/user/${id}`);

      setUsers(users.filter(user => user.id !== id));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  const createUser = React.useCallback(() => {
    navigate('./create');
  }, []);

  const editUser = React.useCallback( (id: string) => {
    navigate(`./${id}`);
  }, []);

  const getUsers = async () => {
    try {
      const { request } = await http.get<User[]>('/api/user');

      return (await request).data;
    } catch (e) {
      console.error(e);

      return [];
    }
  }

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
                    <Button onClick={() => editUser(user.id)}>Edit</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="mt-2 flex justify-around">
        <Button onClick={createUser} variant="outlined">Create User</Button>
      </div>
    </div>
  )
}

export default UserList;
