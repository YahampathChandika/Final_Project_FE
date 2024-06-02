import React, { useState } from "react";
import { Table } from "rsuite";
import { useGetAdmittedPatientsQuery } from "../../store/api/patientApi";
import moment from 'moment';


export default function OverviewTable() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const { Column, HeaderCell, Cell } = Table;

  const calculateAge = (dateOfBirth) => {
    const birthDate = moment(dateOfBirth);
    const today = moment();
    const years = today.diff(birthDate, 'years');
    birthDate.add(years, 'years');
    const months = today.diff(birthDate, 'months');
    birthDate.add(months, 'months');
    const days = today.diff(birthDate, 'days');

    return `${years}Y ${months}M ${days}D`;
  };
  
  
  const AgeCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props}>
      {calculateAge(rowData[dataKey])}
    </Cell>
  );
  
  const {
    data: patientData,
    isLoading,
    error,
  } = useGetAdmittedPatientsQuery();

  const getData = () => {
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    if (isLoading) {
      return [];
    }

    if (patientData && patientData.payload) {
      const sortedData = [...patientData.payload];

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

  return (
    <Table
      height={420}
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
    >
      <Column flexGrow={70} align="center" fixed sortable>
        <HeaderCell>ID</HeaderCell>
        <Cell dataKey="hospitalId" />
      </Column>

      <Column flexGrow={130} fixed sortable>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>Age</HeaderCell>
        <AgeCell dataKey="dateOfBirth" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>Gender</HeaderCell>
        <Cell dataKey="gender" />
      </Column>

      <Column flexGrow={200} sortable>
        <HeaderCell>Diagnosis</HeaderCell>
        <Cell dataKey="diagnosis" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>Alerts</HeaderCell>
        <Cell dataKey="alerts" />
      </Column>

      <Column flexGrow={120}>
        <HeaderCell>Status</HeaderCell>
        <Cell dataKey="" />
      </Column>
    </Table>
  );
}
