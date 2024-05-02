import React from 'react';
import UserForm from '../../../component/user/user-form';
import { useParams } from 'react-router-dom';


const User: React.FC = () => {
  const params = useParams();

  return (
    <div>
      <UserForm id={params.id}/>
    </div>
  );
};

export default User;
