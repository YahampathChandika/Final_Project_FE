import React, { useState, useEffect } from "react";
import { Table } from "rsuite";
import {
  useGetPatientVitalsIdQuery,
  useDeleteVitalSignsMutation,
  useGetPatientByIdQuery,
} from "../../store/api/patientApi";
import { useParams } from "react-router-dom";
import moment from "moment";
import DeleteVitalsModal from "../modals/DeleteVitalsModal";

export default function VitalSignsTable({ startDate, endDate }) {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteVital, setDeleteVital] = useState(null);
  const [loading, setLoading] = useState(false);
  const { Column, HeaderCell, Cell } = Table;
  const { id } = useParams();
  const {
    data: vitalData,
    isLoading,
    error,
    refetch,
  } = useGetPatientVitalsIdQuery(id);
  const [deleteVitalSign] = useDeleteVitalSignsMutation();
  const { refetch: alertRefetch } = useGetPatientByIdQuery(id);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const getData = () => {
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    if (isLoading || !vitalData) {
      return [];
    }

    const filteredData = vitalData.payload.filter((item) => {
      const itemDate = moment(item.date, "YYYY-MM-DD");
      const isAfterStartDate = startDate
        ? itemDate.isSameOrAfter(moment(startDate))
        : true;
      const isBeforeEndDate = endDate
        ? itemDate.isSameOrBefore(moment(endDate))
        : true;
      return isAfterStartDate && isBeforeEndDate;
    });

    if (sortColumn && sortType) {
      filteredData.sort((a, b) => {
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

    return filteredData;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const handleDeleteOpen = (id) => {
    setDeleteVital(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteVital(null);
  };

  return (
    <>
      <Table
        // height={420}
        height={1000}
        data={getData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
        headerHeight={70}
      >
        <Column flexGrow={100} align="center" fixed sortable>
          <HeaderCell align="center">Date</HeaderCell>
          <Cell align="center" dataKey="date" />
        </Column>

        <Column flexGrow={100} align="center" fixed sortable>
          <HeaderCell align="center">Time</HeaderCell>
          <Cell align="center" dataKey="time" />
        </Column>

        <Column flexGrow={100} fixed>
          <HeaderCell align="center">HR</HeaderCell>
          <Cell align="center" dataKey="heartRate" />
        </Column>
        <Column flexGrow={100} fixed>
          <HeaderCell align="center">RR</HeaderCell>
          <Cell align="center" dataKey="respiratoryRate" />
        </Column>

        <Column flexGrow={100}>
          <HeaderCell align="center">Sup. O2</HeaderCell>
          <Cell align="center" dataKey="supplementedO2" />
        </Column>

        <Column flexGrow={100}>
          <HeaderCell align="center">Sat. O2</HeaderCell>
          <Cell align="center" dataKey="O2saturation" />
        </Column>

        <Column flexGrow={100}>
          <HeaderCell align="center">Sys. BP</HeaderCell>
          <Cell align="center" dataKey="systolicBP" />
        </Column>

        <Column flexGrow={100}>
          <HeaderCell align="center">Dia. BP</HeaderCell>
          <Cell align="center" dataKey="diastolicBP" />
        </Column>

        <Column flexGrow={100}>
          <HeaderCell align="center">Temp.</HeaderCell>
          <Cell align="center" dataKey="temperature" />
        </Column>

        <Column flexGrow={100}>
          <HeaderCell align="center">LOC</HeaderCell>
          <Cell align="center" dataKey="avpuScore" />
        </Column>

        <Column flexGrow={80}>
          <HeaderCell align="center">Actions</HeaderCell>
          <Cell align="right">
            {(rowData) => (
              <>
                <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 cursor-pointer">
                  edit
                </span>
                <span
                  onClick={() => handleDeleteOpen(rowData.id)}
                  className="material-symbols-outlined sidebar-icon text-lg font-medium text-red mr-3 cursor-pointer"
                >
                  delete
                </span>
              </>
            )}
          </Cell>
        </Column>
      </Table>
      <DeleteVitalsModal
        open={deleteOpen}
        handleClose={handleDeleteClose}
        headtxt="Delete Vital Signs"
        bodytxt="Are you sure you want to delete vitals? This action cannot be undone!"
        btntxt="Delete"
        id={deleteVital}
        otherId={id}
        deleteApi={deleteVitalSign}
        refetchTable={refetch}
        otherRefetch={alertRefetch}
      />
    </>
  );
}
