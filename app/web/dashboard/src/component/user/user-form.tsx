import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useHttp } from '../../context/http.context';
import { User } from './user-list';
import { useNavigate } from 'react-router-dom';
import Users from '../../root/user/users';

type UserDto = {
  firstName: string;
  lastName: string;
  id?: string;
}

export type UserFormProps = {
  id?: string;
}

const UserForm: FC<UserFormProps> = ({ id }) => {
  const http = useHttp();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (id) {
      getUser(id).then((user) => {
        if (user) {
          setFirstName(user.firstName);
          setLastName(user.lastName);
        }
      });
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      firstName, lastName,
    };
    await sendUser(user);

    navigate(`../`);
  };

const getUser = async (id: string) => {
    try {
      const { request } = await http.get<User>(`/api/user/${id}`);

      return (await request).data;
    } catch (e) {
      console.error(e);
    }
};

  const sendUser = async (userData: Partial<UserDto>) => {
    try {
      const url = id ? `/api/user/${id}` : '/api/user';
      const { request } = await http.post<User>(url, userData);

      return (await request).data;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full p-2">
      <form onSubmit={handleSubmit}>
        <div className="flex mb-2 w-full">
          <TextField
            id="first-name"
            name="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            label="First Name"
            variant="outlined"
            className="w-full" />
        </div>
        <div className="flex mb-2 w-full">
          <TextField
            id="last-name"
            name="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            label="Last Name"
            variant="outlined"
            className="w-full" />
        </div>
        <div className="flex align-middle justify-around">
          <Button type="submit" variant="outlined">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
