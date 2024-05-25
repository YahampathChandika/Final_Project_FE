import React from "react";
import { AutoComplete, Col, Container, InputGroup, Row } from "rsuite";
import { mockUsers } from "../assets/mocks/mockUsers";

export default function Admitted() {
  return (
    <Container className="w-full">
      <Row className="pb-10 flex justify-between">
        <Row className="flex items-center mb-5">
          <span className="material-symbols-outlined sidebar-icon text-black">
            group
          </span>
          <p className="text-2xl font-bold ml-4 text-black">Admitted</p>
        </Row>
        <Row className="flex items-center">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*"
            className="w-12 h-12 rounded-full mr-5"
          />
          <Col>
            <p className="text-xl font-semibold text-black">Dr. Alice Brown</p>
            <p className="text-txtgray">Heart Surgeon</p>
          </Col>
        </Row>
      </Row>

      <Row className="flex-col mb-5">
        <Row className="mr-8 w-full bg-white h-14 rounded-md pl-5 flex justify-between items-center shadow-md">
          <Row className="min-w-52 flex items-center cursor-pointer">
            <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 ">
              add_circle
            </span>
            <p className="text-lg font-medium text-txtdarkblue">
              Add New Patient
            </p>
          </Row>
          <InputGroup
            inside
            className="flex border-2 border-txtdarkblue !w-2/5 min-w-48 h-10 px-3 mx-5 !rounded-full items-center justify-evenly"
          >
            <AutoComplete placeholder="Search by Name or ID" />
            <InputGroup.Addon>
              <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue cursor-pointer">
                search
              </span>
            </InputGroup.Addon>
          </InputGroup>
        </Row>
      </Row>

      <Row className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-5">
        {mockUsers(10).map((patient) => (
          <div
            key={patient.id}
            className="bg-white shadow-lg rounded-lg p-5 hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold mb-2 text-txtdarkblue">
              {patient.name}
            </h3>
            <p className="text-txtgray">
              <strong>Age:</strong> {patient.age}
            </p>
            <p className="text-txtgray">
              <strong>Gender:</strong> {patient.gender}
            </p>
            <p className="text-txtgray">
              <strong>Sickness:</strong> {patient.sickness}
            </p>
            <p className="text-txtgray">
              <strong>Alerts:</strong> {patient.alerts}
            </p>
            <p className="text-txtgray">
              <strong>Status:</strong> {patient.status}
            </p>
          </div>
        ))}
      </Row>
    </Container>
  );
}
