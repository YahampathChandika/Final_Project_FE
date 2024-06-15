import React, { useState } from "react";
import { Table } from "rsuite";
import { useGetPatientListQuery } from "../../store/api/patientApi";

export default function PatientsTable() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const { Column, HeaderCell, Cell } = Table;

  const {
    data: patientData,
    isLoading,
    error,
  } = useGetPatientListQuery();

  const getData = () => {
    if (error) {
      console.error("Error fetching data:", error);
      return [];      
    }

    if (isLoading) {
      return [];
    }

    if (patientData && patientData?.payload) {
      const sortedData = patientData.payload.map((patient) => {
        const { admissions } = patient;
        const admission = admissions[0] || {};
        return {
          ...patient,
          bedId: admission.bedId || "N/A",
          diagnosis: admission.diagnosis || "N/A", 
        };
      });

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
        <HeaderCell>Admitted Date</HeaderCell>
        <Cell dataKey="createdAt" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>Bed No</HeaderCell>
        <Cell dataKey="bedId" />
      </Column>

      <Column flexGrow={200} sortable>
        <HeaderCell>Diagnosis</HeaderCell>
        <Cell dataKey="diagnosis" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>Status</HeaderCell>
        <Cell dataKey="status" />
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
