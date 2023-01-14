import React from 'react';
import Cross from '../assets/Cross';
import { useMutation } from 'react-query';
import axios from 'axios';
import { QueryClient } from 'react-query';

const DeleteUserModalContent = ({ close, userToDelete }: any) => {
  // User deletion
  const userId = userToDelete.id;
  const queryClient = new QueryClient();

  const deleteUserAPICall = async (userId: string) => {
    const { data: response } = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`
    );
    console.log(response);

    return response.data;
  };

  const { mutate: deleteUser, isLoading } = useMutation(deleteUserAPICall, {
    onSuccess: (data) => {
      console.log(data);
      //   queryClient.refetchQueries('fetchAllUsers');
      //   queryClient.invalidateQueries('fetchAllUsers');
      //   const message = "success"
      //   alert(message)
    },
    onError: () => {
      alert('there was an error');
    },
    onSettled: () => {
      console.log('settled');
      //   queryClient.invalidateQueries('fetchAllUsers');
      //   queryClient.refetchQueries('fetchAllUsers');
    },
  });

  return (
    <div className='flex flex-col gap-4 rounded-lg shadow-xl'>
      <header className='p-4 text-lg font-semibold border-b-2'>
        <div className='flex items-center justify-between '>
          <p>Delete User</p>
          <button onClick={close}>
            <Cross />
          </button>
        </div>
      </header>
      <main className='p-4'>
        <p>
          Are you sure you want to delete user
          <span className='font-semibold '> {userToDelete.name}</span>?
        </p>
        <p>This action cannot be reversed.</p>
      </main>

      <section className='flex justify-end gap-4 p-4'>
        <button
          className='uppercase text-sm font-medium border-[1px] shadow-sm transition duration-150 ease-in-out hover:bg-gray-100 border-gray-500 px-6 py-2.5 rounded'
          onClick={close}
        >
          Cancel
        </button>
        <button
          className='bg-red-500 btn-primary hover:bg-red-600 '
          onClick={() => {
            deleteUser(userId);
            close();
          }}
        >
          Confirm
        </button>
      </section>
    </div>
  );
};

export default DeleteUserModalContent;
