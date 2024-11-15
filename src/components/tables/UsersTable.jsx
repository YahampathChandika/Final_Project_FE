import React, { useState } from "react";
import { Table } from "rsuite";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../store/api/userApi";
import FailModal from "../modals/Delete";
import noDataImage from "../../assets/images/nofound.svg";

export default function UsersTable({ users }) {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const [deleteUser] = useDeleteUserMutation();
  const { refetch } = useGetAllUsersQuery();

  const handleDeleteOpen = (id) => {
    setDeleteUserId(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteUserId(null);
  };

  const { Column, HeaderCell, Cell } = Table;

  const getData = () => {
    if (!users) return [];
    const sortedData = [...users];

    if (sortColumn && sortType) {
      sortedData.sort((a, b) => {
        let x, y;

        if (sortColumn === "name") {
          x = `${a.firstName} ${a.lastName}`.toLowerCase();
          y = `${b.firstName} ${b.lastName}`.toLowerCase();
        } else {
          x = a[sortColumn];
          y = b[sortColumn];

          if (typeof x === "string") {
            x = x.toLowerCase();
          }
          if (typeof y === "string") {
            y = y.toLowerCase();
          }
        }

        if (x < y) {
          return sortType === "asc" ? -1 : 1;
        }
        if (x > y) {
          return sortType === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortedData;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const ImageCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props}>
      <img
        src={`${import.meta.env.VITE_API_BASE_URL}/${rowData[dataKey]}`}
        // src={`http://localhost:4000/${rowData[dataKey]}`}
        alt="Profile"
        style={{ width: 35, height: 35, borderRadius: "50%" }}
      />
    </Cell>
  );

  const NameCell = ({ rowData, ...props }) => (
    <Cell {...props}>{`${rowData.firstName} ${rowData.lastName}`}</Cell>
  );

  const ActionCell = ({ rowData, ...props }) => (
    <Cell {...props}>
      <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 cursor-pointer">
        edit
      </span>
      <span
        className="material-symbols-outlined sidebar-icon text-lg font-medium text-red mr-3 cursor-pointer"
        onClick={() => handleDeleteOpen(rowData.id)}
      >
        delete
      </span>
    </Cell>
  );

  return (
    <>
      <Table
        height={420}
        data={getData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
        rowHeight={55}
        renderEmpty={() => (
          <div className="flex flex-col items-center justify-center h-full bg-white">
            <img src={noDataImage} alt="No Data" className="w-56 h-auto" />
            <p className="mt-5 text-lg text-gray-600">No users found!</p>
          </div>
        )}
      >
        <Column width={60} align="center" fixed>
          <HeaderCell></HeaderCell>
          <ImageCell dataKey="image" />
        </Column>

        <Column flexGrow={70} align="center" fixed sortable>
          <HeaderCell>Role</HeaderCell>
          <Cell dataKey="role" />
        </Column>

        <Column flexGrow={130} fixed sortable>
          <HeaderCell>Name</HeaderCell>
          <NameCell dataKey="name" />
        </Column>

        <Column flexGrow={100} sortable>
          <HeaderCell>Reg No</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column flexGrow={100} sortable>
          <HeaderCell>Contact</HeaderCell>
          <Cell dataKey="contactNo" />
        </Column>

        <Column flexGrow={200} sortable>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>

        <Column flexGrow={100} sortable>
          <HeaderCell>Speciality</HeaderCell>
          <Cell dataKey="speciality" />
        </Column>

        <Column flexGrow={120}>
          <HeaderCell>Actions</HeaderCell>
          <ActionCell />
        </Column>
      </Table>
      <FailModal
        open={deleteOpen}
        handleClose={handleDeleteClose}
        headtxt="Delete User"
        bodytxt="Are you sure you want to delete this User? This action cannot be undone!"
        btntxt="Delete"
        id={deleteUserId}
        deleteApi={deleteUser}
        refetchTable={refetch}
      />
    </>
  );
}
