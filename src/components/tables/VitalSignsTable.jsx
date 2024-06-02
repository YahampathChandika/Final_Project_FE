import React, { useState } from "react";
import { Table } from "rsuite";
import { useGetPatientListQuery } from "../../store/api/patientApi";

export default function VitalSignsTable() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const { Column, HeaderCell, Cell } = Table;

  const { data: patientData, isLoading, error } = useGetPatientListQuery();

  console.log(patientData);

  const getData = () => {
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    if (isLoading) {
      return [];
    }

    if (patientData && patientData.payload) {
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
      <Column flexGrow={120} align="center" fixed sortable>
        <HeaderCell>Date</HeaderCell>
        <Cell dataKey="createdAt" />
      </Column>

      <Column flexGrow={100} fixed sortable>
        <HeaderCell>Heart Rate</HeaderCell>
        <Cell dataKey="bedId" />
      
      </Column>
      <Column flexGrow={100} fixed sortable>
        <HeaderCell>Repository Rate</HeaderCell>
        <Cell dataKey="bedId" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>Supplemental O2</HeaderCell>
        <Cell dataKey="bedId" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>Saturation O2</HeaderCell>
        <Cell dataKey="bedId" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>Blood Pressure</HeaderCell>
        <Cell dataKey="bedId" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>Temperature</HeaderCell>
        <Cell dataKey="bedId" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>LOC</HeaderCell>
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
