import React from "react";
import { AutoComplete, Col, Container, Divider, InputGroup, Row } from "rsuite";
import { mockUsers } from "../assets/mocks/mockUsers";

export default function Admitted() {
  return (
    <Container className="w-full">
      <Row className="pb-10 flex justify-between">
        <Row className="flex items-center mb-5">
          <span className="material-symbols-outlined sidebar-icon text-black">
            ward
          </span>
          <p className="text-2xl font-bold ml-4 text-black">
            Admitted Patients
          </p>
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

        <Row className="mr-8 w-full bg-white h-20 rounded-md pl-5 flex justify-between items-center">
          <InputGroup
            inside
            className="flex border-2 border-txtdarkblue !w-2/5 min-w-48 h-10 px-3 mr-5 !rounded-full items-center justify-evenly"
          >
            <AutoComplete placeholder="Search by Name or ID" />
            <InputGroup.Addon>
              <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue cursor-pointer">
                search
              </span>
            </InputGroup.Addon>
          </InputGroup>
          <Row className="min-w-52 flex items-center cursor-pointer">
            <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 ">
              add_circle
            </span>
            <p className="text-lg font-medium text-txtdarkblue">
              Add New Patient
            </p>
          </Row>
        </Row>

      <Row className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 pt-5 mb-8">
        {mockUsers(10).map((patient) => (
          <div
            key={patient.id}
            className="bg-white shadow-md rounded-lg p-5 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <span
                  className={`material-symbols-outlined mr-2 ${
                    patient.status === "Critical"
                      ? "text-red"
                      : patient.status === "Unstable"
                      ? "text-yellow"
                      : patient.status === "Stable"
                      ? "text-green"
                      : ""
                  }`}
                >
                  {patient.status === "Critical"
                    ? "error"
                    : patient.status === "Unstable"
                    ? "sync_problem"
                    : patient.status === "Stable"
                    ? "check_circle"
                    : ""}
                </span>
                <span
                  className={`text-lg font-medium ${
                    patient.status === "Critical"
                      ? "text-red"
                      : patient.status === "Unstable"
                      ? "text-yellow"
                      : patient.status === "Stable"
                      ? "text-green"
                      : ""
                  }`}
                >
                  {patient.status}
                </span>
              </div>

              <div className="flex items-center text-txtblue text-lg font-medium">
                <span className="material-symbols-outlined mr-2">
                  circle_notifications
                </span>
                Alerts | {patient.alerts === "N/A" ? "00" : patient.alerts}
              </div>
            </div>
            <div>
              <p className="font-semibold text-lg ">{patient.name}</p>
              <p className="font-medium text-txtgray ">{patient.id}</p>
            </div>
            <div className="flex mt-5 justify-between">
              <div className="flex-col">
                <p className="text-txtgray">Bed No</p>
                <p className="text-lg font-medium">{patient.regNo}</p>
              </div>
              <div className="flex-col text-right">
                <p className="text-txtgray">Diagnosis</p>
                <p className="text-lg font-medium">{patient.sickness}</p>
              </div>
            </div>
            <div className="flex mt-5 justify-between">
              <div className="flex-col">
                <p className="text-txtgray">Age</p>
                <p className="text-lg font-medium">{patient.regNo}</p>
              </div>
              <div className="flex-col text-right">
                <p className="text-txtgray">Admitted Date</p>
                <p className="text-lg font-medium">{patient.date}</p>
              </div>
            </div>
            <Divider className="text-txtgray" />
            <div className="flex items-center text-txtblue text-lg font-medium">
              Notes
              <span className="material-symbols-outlined ml-2">
                description
              </span>
            </div>
            <div className="text-txtgray mt-2">
              Has abnormal condition in heart. Check BP regularly.
            </div>
          </div>
        ))}
      </Row>
    </Container>
  );
}
