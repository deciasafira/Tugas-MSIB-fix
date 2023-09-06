import React from 'react';
import { useTable } from 'react-table';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from './userSlice'; // Pastikan Anda membuat file userSlice.js terlebih dahulu
import faker from 'faker';

const Table = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Salary',
        accessor: 'salary',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <button
              onClick={() => dispatch(deleteUser(row.original.id))}
              className="text-red-500 mr-2"
            >
              Delete
            </button>
            <button className="text-blue-500">Edit</button>
          </div>
        ),
      },
    ],
    [dispatch]
  );

  const data = React.useMemo(() => {
    return users.map(user => ({
      ...user,
      actions: '',
    }));
  }, [users]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} className="table-auto">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
