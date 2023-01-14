import axios from 'axios';
import { useState } from 'react';
import Cross from '../assets/Cross';
import { useMutation, useQueryClient } from 'react-query';

const AddUserModalContent = ({ close }: any) => {
  const queryClient = useQueryClient();

  const [newUserDetails, setNewUserDetails] = useState({
    name: '',
    email: '',
    role: '',
  });

  const handleChange = (e: any) => {
    setNewUserDetails({
      ...newUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addUserAPICall = async () => {
    const params = new URLSearchParams();
    params.append('name', newUserDetails.name);
    params.append('email', newUserDetails.email);
    params.append('role', newUserDetails.role);
    params.append('status', 'Invited');
    params.append('lastLogin', new Date().toISOString());

    const { data: response } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
      params
    );
    return response.data;
  };

  const { mutate: addUser, isLoading } = useMutation(addUserAPICall, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('users');
    },
    onError: () => {
      console.log('Error while adding new user');
    },
    onSettled: () => {
      console.log('New user creation mutation settled');
    },
  });

  return (
    <div className='flex flex-col w-[400px] gap-4 rounded-lg shadow-xl '>
      <header className='p-4 text-lg font-semibold border-b-2'>
        <div className='flex items-center justify-between '>
          <p>Add New User</p>
          <button onClick={close}>
            <Cross />
          </button>
        </div>
      </header>
      <main className='p-4'>
        <p>Enter user details</p>

        <form className='flex flex-col items-start '>
          <p>Name</p>
          <input
            name='name'
            onChange={handleChange}
            type='text'
            placeholder='Name'
            value={newUserDetails.name}
            className='input'
          />
          <p>Email</p>
          <input
            name='email'
            onChange={handleChange}
            type='text'
            placeholder='Email'
            value={newUserDetails.email}
            className='input'
          />
          <p>Role</p>
          <input
            name='role'
            onChange={handleChange}
            type='text'
            placeholder='Role'
            value={newUserDetails.role}
            className='input'
          />

          {/* <input
          type='text'
          placeholder='ID'
          value={userId}
          className={`${inputStyling} cursor-not-allowed bg-gray-100`}
        /> */}
          {/* <input
          type='text'
          placeholder='Email'
          value={userToEdit.email}
          className={inputStyling}
      /> */}
          {/* <input
        type='text'
        placeholder='Status'
        value={userToEdit.status}
        className={inputStyling}
      /> */}
        </form>
      </main>

      <section className='flex justify-end gap-4 p-4'>
        <button className='btn-secondary ' onClick={close}>
          Cancel
        </button>
        <button
          className='btn-primary'
          onClick={() => {
            addUser();
            close();
          }}
        >
          Save
        </button>
      </section>
    </div>
  );
};

export default AddUserModalContent;
