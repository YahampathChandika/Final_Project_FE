import React, { useState } from "react";
import { Table } from "rsuite";
import { mockUsers } from "../../assets/mocks/mockUsers";

export default function PatientsTable() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const { Column, HeaderCell, Cell } = Table;
  const data = mockUsers(10);

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
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

  return (
    <Table
      height={420}
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
      onRowClick={handleOnRowClick}
    >
      <Column flexGrow={70} align="center" fixed sortable>
        <HeaderCell>ID</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column flexGrow={130} fixed sortable>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>Admitted Date</HeaderCell>
        <Cell dataKey="date" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>Bed No</HeaderCell>
        <Cell dataKey="age" />
      </Column>

      <Column flexGrow={200} sortable>
        <HeaderCell>Diagnosis</HeaderCell>
        <Cell dataKey="sickness" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>Status</HeaderCell>
        <Cell dataKey="discharge" />
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