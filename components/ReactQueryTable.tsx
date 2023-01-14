// @ts-nocheck

import { useTable, useSortBy } from 'react-table';
import React from 'react';
import CaretSort from '../assets/CaretSort';
import ArrowDown from '../assets/ArrowDown';
import ArrowUp from '../assets/ArrowUp';
import Pencil from '../assets/Pencil';
import Trashcan from '../assets/Trashcan';
import Popup from 'reactjs-popup';
import DeleteUserModalContent from './DeleteUserModalContent';
import EditUserModalContent from './EditUserModalContent';
import Download from '../assets/Download';
import Add from '../assets/Add';
import AddUserModalContent from './AddUserModalContent';
import ArrowRight from '../assets/ArrowRight';
import ArrowLeft from '../assets/ArrowLeft';
import Badge from './Badge';

const ReactQueryTable = ({ data }) => {
  const pageNumbers = [1, 2, 3, 4, 5];
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id', // accessor is the "key" in the data
      },

      {
        Header: 'Name',
        accessor: 'name',

        // to combine email and photo in the same cell
        Cell: (props: { value: string }) => {
          return (
            <div className='flex items-center gap-3 pr-14'>
              <img
                src={props.row.original.photo}
                className='w-12 rounded-full aspect-square'
              />
              <div>
                <p className='font-medium'>{props.row.original.name}</p>
                <p className='font-light'>{props.row.original.email}</p>
              </div>
            </div>
          );
        },
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: (props: { value: string }) => {
          return <Badge content={props.value} />;
        },
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
      {
        Header: 'Last Login',
        accessor: 'lastLogin',

        // to manipulate the contents of the cell
        Cell: (props: { value: string }) => {
          const date = new Date(props.value).toLocaleDateString('en-US', {
            dateStyle: 'medium',
          });
          const time = new Date(props.value).toLocaleTimeString('en-US', {
            timeStyle: 'short',
          });
          return (
            <>
              <p className='font-medium'>{date}</p>
              <p className='font-light'>{time}</p>
            </>
          );
        },
      },

      // Edit and Delete action buttons
      {
        Header: '',
        accessor: 'actions',
        disableSortBy: true,
        Cell: ({ cell }) => {
          return (
            <div className='flex justify-center gap-4 '>
              <button className='hover-animation' title='Delete'>
                <Popup
                  trigger={<Trashcan width={22} height={22} />}
                  position='right center'
                  modal
                  overlayStyle={{
                    backdropFilter: 'blur(5px)',
                  }}
                  contentStyle={{
                    background: 'white',
                    opacity: '1',
                    borderRadius: '20px',
                  }}
                >
                  {(close) => (
                    <div className='rounded-xl'>
                      <DeleteUserModalContent
                        close={close}
                        userToDelete={{
                          id: cell.row.values.id,
                          name: cell.row.values.name,
                        }}
                      />
                    </div>
                  )}
                </Popup>
              </button>
              <button className='hover-animation ' title='Edit'>
                <Popup
                  trigger={<Pencil width={22} height={22} />}
                  position='right center'
                  modal
                  // closeOnDocumentClick={false}
                  overlayStyle={{
                    backdropFilter: 'blur(5px)',
                  }}
                  contentStyle={{
                    background: 'white',
                    opacity: '1',
                    borderRadius: '20px',
                  }}
                >
                  {(close) => (
                    <div className='rounded-xl'>
                      <EditUserModalContent
                        close={close}
                        userToEdit={{
                          id: cell.row.values.id,
                          name: cell.row.values.name,
                          email: cell.row.values.email,
                          role: cell.row.values.role,
                          status: cell.row.values.status,
                        }}
                      />
                    </div>
                  )}
                </Popup>
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data, initialState: { hiddenColumns: ['id'] } },
      useSortBy
    );
  return (
    <div className='border-2 border-gray-300 shadow-lg rounded-xl'>
      <div className='flex items-center justify-between pr-4'>
        <div className='p-4'>
          <div className='flex items-center gap-3 '>
            <span className='text-2xl font-bold'>Users</span>
            <span className='p-1 px-3 mt-1 text-xs font-bold rounded-full text-emerald-600 bg-emerald-100'>
              {data.length} users
            </span>
          </div>
          <p className='mt-2 font-light '>
            Manage your team members and their account permissions here.
          </p>
        </div>
        <div className='flex gap-4'>
          <button className='flex items-center gap-2 cursor-not-allowed btn-secondary'>
            <span>
              <Download />
            </span>
            Download CSV
          </button>
          <Popup
            trigger={
              <button className='flex items-center gap-2 btn-primary'>
                <span>
                  <Add />
                </span>
                Add new user
              </button>
            }
            position='right center'
            modal
            // closeOnDocumentClick={false}
            // overlayStyle={{ background: 'gray', opacity: '0.9' }}
            overlayStyle={{
              backdropFilter: 'blur(5px)',
            }}
            contentStyle={{
              background: 'white',
              opacity: '1',
              borderRadius: '20px',
            }}
          >
            {(close) => (
              <div className='rounded-xl'>
                <AddUserModalContent close={close} />
              </div>
            )}
          </Popup>
        </div>
      </div>

      <table {...getTableProps()} className='w-full '>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th
                    className='border-t-[1px] p-4 font-semibold text-left '
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <div className='flex items-center gap-3'>
                      <span>{column.render('Header')}</span>
                      {/* Add a sort direction indicator */}
                      <span className='mt-1'>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowDown />
                          ) : (
                            <ArrowUp />
                          )
                        ) : (
                          // Hide the caret sign from 'Actions' column, which doesn't require the sort option
                          !column.disableSortBy && (
                            <CaretSort height={18} width={18} />
                          )
                        )}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className='p-4 even:bg-gray-100'>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className='p-3 border-b-[1px] text-left'
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className='flex items-center justify-between p-4'>
        <button className='flex items-center gap-3 p-3 normal-case cursor-not-allowed btn-secondary'>
          <ArrowLeft className='mt-1' />
          Previous
        </button>
        <p className='flex items-center gap-2'>
          {pageNumbers.map((pg, idx) => (
            <span key={idx} className='px-4 cursor-not-allowed hover-animation'>
              {pg}
            </span>
          ))}
        </p>
        <button className='flex items-center gap-3 p-3 normal-case cursor-not-allowed btn-secondary'>
          Next
          <span>
            <ArrowRight className='mt-1' />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ReactQueryTable;
