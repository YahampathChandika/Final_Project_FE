import React, { useState } from "react";
import { Table } from "rsuite";
import { useGetAllUsersQuery } from "../../store/api/userApi";

export default function UsersTable() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const { Column, HeaderCell, Cell } = Table;

  const {
    data: getAllUsers,
    isLoading,
    error,
  } = useGetAllUsersQuery();

  const getData = () => {
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    if (isLoading) {
      return [];
    }

    if (getAllUsers && getAllUsers.payload) {
      const sortedData = [...getAllUsers.payload];

      if (sortColumn && sortType) {
        sortedData.sort((a, b) => {
          let x = a[sortColumn];
          let y = b[sortColumn];

          if (typeof x === "string") {
            x = x.toLowerCase();
          }
          if (typeof y === "string") {
            y = y.toLowerCase();
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
    }
    return [];
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const handleOnRowClick = (rowIndex) => {
    console.log(rowIndex);
  };

  const ImageCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props}>
      <img
        src={`http://localhost:4000/${rowData[dataKey]}`}
        alt="Profile"
        style={{ width: 35, height: 35, borderRadius: '50%' }}
      />
    </Cell>
  );

  return (
    <Table
      height={420}
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
      onRowClick={handleOnRowClick}
      rowHeight={55}
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
        <Cell dataKey="firstName" />
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
        <HeaderCell>Status</HeaderCell>
        <Cell dataKey="activity" />
      </Column>

      <Column flexGrow={120} sortable>
        <HeaderCell>Actions</HeaderCell>
        <Cell>
          <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 cursor-pointer">
            edit
          </span>
          <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-red mr-3 cursor-pointer">
            delete
          </span>
        </Cell>
      </Column>
    </Table>
  );
}
