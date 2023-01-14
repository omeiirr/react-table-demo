import React, { useState } from 'react';
import Cross from '../assets/Cross';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useQueryClient } from 'react-query';

const EditUserModalContent = ({ close, userToEdit }: any) => {
  const queryClient = useQueryClient();
  const [newUserDetails, setNewUserDetails] = useState({
    name: userToEdit.name,
    role: userToEdit.role,
  });

  const handleChange = (e: any) => {
    setNewUserDetails({
      ...newUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const editUserAPICall = async () => {
    const params = new URLSearchParams();
    params.append('name', newUserDetails.name);
    params.append('role', newUserDetails.role);

    const { data: response } = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userToEdit.id}`,
      params
    );

    return response.data;
  };

  const { mutate: editUser, isLoading } = useMutation(editUserAPICall, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('users');
    },
    onError: () => {
      console.log('Error while editing user');
    },
    onSettled: () => {
      console.log('Edit mutation settled');
    },
  });

  return (
    <div className='flex flex-col w-[400px] modal-container '>
      <header className='p-4 text-lg font-semibold border-b-2'>
        <div className='flex items-center justify-between '>
          <p>Edit User</p>
          <button onClick={close}>
            <Cross />
          </button>
        </div>
      </header>
      <main className='p-4 '>
        <p>Edit details of {userToEdit.name}</p>

        <form className='flex flex-col items-start mt-3 '>
          <p className='mt-2 ml-2 font-semibold'>Name</p>
          <input
            name='name'
            onChange={handleChange}
            type='text'
            placeholder='Name'
            value={newUserDetails.name}
            className='input'
          />
          <p className='mt-2 ml-2 font-semibold'>Role</p>
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
            editUser();
            close();
          }}
        >
          Save
        </button>
      </section>
    </div>
  );
};

export default EditUserModalContent;
