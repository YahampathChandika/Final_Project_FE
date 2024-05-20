import React, { useState } from "react";
import { Col, Container, Row } from "rsuite";
import { Table } from "rsuite";
import { mockUsers } from "../assets/mocks/mockUsers";

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(10); // Adjust the number as needed

export default function Overview() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
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

  const statusStyles = {
    'Stable': 'bg-green-100 text-green-700 px-2 py-1 rounded-full',
    'Unstable': 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full',
    'Critical': 'bg-red-100 text-red-700 px-2 py-1 rounded-full'
  };

  return (
    <Container className="w-full">
      <Row className="pb-10 flex justify-between">
        <Col>
          <p className="text-2xl font-bold">Welcome, Dr. Alice Brown!</p>
          <p className="text-txtgray">Check the latest updates on your account</p>
        </Col>
        <Row className="flex">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*"
            className="w-12 h-12 rounded-full mr-5"
          />
          <Col>
            <p className="text-xl font-semibold">Dr. Alice Brown</p>
            <p className="text-txtgray">Heart Surgeon</p>
          </Col>
        </Row>
      </Row>

      <Row className="flex">
        <Col className="mr-8 w-2/12">
          <Row className="bg-white h-28 rounded-md pt-3 pl-5">
            <p className="text-lg font-medium">Patients</p>
            <p className="text-xs text-txtgray">Current</p>
            <p className="text-2xl text-txtblue mt-3">10</p>
          </Row>
          <Row className="bg-white h-28 rounded-md pt-3 pl-5 mt-8">
            <p className="text-lg font-medium">Patients In</p>
            <p className="text-xs text-txtgray">Today</p>
            <p className="text-2xl text-txtblue mt-3">03</p>
          </Row>
        </Col>
        <Col className="mr-8 w-2/12">
          <Row className="bg-white h-28 rounded-md pt-3 pl-5">
            <p className="text-lg font-medium">Alerts</p>
            <p className="text-xs text-txtgray">Current</p>
            <p className="text-2xl text-txtblue mt-3">02</p>
          </Row>
          <Row className="bg-white h-28 rounded-md pt-3 pl-5 mt-8">
            <p className="text-lg font-medium">Patients Out</p>
            <p className="text-xs text-txtgray">Today</p>
            <p className="text-2xl text-txtblue mt-3">01</p>
          </Row>
        </Col>

        <Col className="bg-white w-1/3 rounded-md mr-8"></Col>
        <Col className="bg-white w-1/3 rounded-md"></Col>
      </Row>

      <Row className="bg-white h-96 rounded-md mt-8 flex flex-col">
        <p className="text-lg p-5 font-medium">Patients’ Details</p>
        <div className="flex-grow">
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
              <Cell dataKey="id" />
            </Column>

            <Column flexGrow={130} fixed sortable>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column flexGrow={100} sortable>
              <HeaderCell>Age</HeaderCell>
              <Cell dataKey="age" />
            </Column>

            <Column flexGrow={100} sortable>
              <HeaderCell>Gender</HeaderCell>
              <Cell dataKey="gender" />
            </Column>

            <Column flexGrow={200} sortable>
              <HeaderCell>Sickness</HeaderCell>
              <Cell dataKey="sickness" />
            </Column>

            <Column flexGrow={100} sortable>
              <HeaderCell>Alerts</HeaderCell>
              <Cell dataKey="alerts" />
            </Column>

            <Column flexGrow={120} sortable>
              <HeaderCell>Status</HeaderCell>
              <Cell dataKey="status" />

            </Column>
          </Table>
        </div>
      </Row>
    </Container>
  );
}
