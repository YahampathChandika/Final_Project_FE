import React, { useState } from "react";
import { AutoComplete, Col, Container, InputGroup, Row } from "rsuite";
import UsersTable from "../components/tables/UsersTable";
import AddUserModal from "../components/modals/AddUserModal";

const data = [
  "Eugenia",
  "Bryan",
  "Linda",
  "Nancy",
  "Lloyd",
  "Alice",
  "Julia",
  "Albert",
  "Louisa",
  "Lester",
  "Lola",
  "Lydia",
  "Hal",
  "Hannah",
  "Harriet",
  "Hattie",
  "Hazel",
  "Hilda",
];

export default function Users() {
  const [value, setValue] = useState("");
  const [userModalOpen, setUserModalOpen] = useState(false);
  const handleUserModalOpen = () => setUserModalOpen(true);
  const handleUserModalClose = () => setUserModalOpen(false);

  return (
    <Container className="w-full">
      <Row className="pb-10 flex justify-between">
        <Row className="flex items-center mb-5">
          <span className="material-symbols-outlined text-black">group</span>
          <p className="text-2xl font-bold ml-4">Users</p>
        </Row>
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

      <Row className="flex-col">
        <Row className="mr-8 w-full bg-white h-20 rounded-md pl-5 flex justify-between items-center">
          <p className="text-lg font-medium text-txtgray">20 Users Total</p>

          <Row className="flex mr-5 w-1/2">
            <InputGroup
              inside
              className="flex border-2 min-w-48 h-10 px-3 !rounded-full items-center justify-evenly"
            >
              <AutoComplete
                placeholder="Search by Name or ID"
                data={data}
                value={value}
                onChange={setValue}
              />
              <InputGroup.Addon>
                <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue cursor-pointer">
                  search
                </span>
              </InputGroup.Addon>
            </InputGroup>
            <Row
              className="min-w-48 flex ml-8 items-center cursor-pointer"
              onClick={handleUserModalOpen}
            >
              <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 ml-6">
                add_circle
              </span>
              <p className="text-lg font-medium text-txtdarkblue">
                Add New User
              </p>
            </Row>
          </Row>
        </Row>
        <Row className="mr-8 w-full flex mt-6 justify-between items-center">
          <Row className="bg-white w-3/12 h-28 rounded-md py-3 px-5 flex justify-between items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <Col>
              <p className="text-lg font-medium">Admins</p>
              <p className="text-xs text-txtgray">Current</p>
              <p className="text-2xl text-txtblue mt-3">02</p>
            </Col>
            <Col>
              <span className="material-symbols-outlined text-4xl font-light text-txtblue">
                admin_panel_settings
              </span>
            </Col>
          </Row>
          <Row className="bg-white w-3/12 h-28 rounded-md py-3 px-5 flex justify-between items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <Col>
              <p className="text-lg font-medium">Doctors</p>
              <p className="text-xs text-txtgray">Current</p>
              <p className="text-2xl text-txtblue mt-3">08</p>
            </Col>
            <Col>
              <span className="material-symbols-outlined text-4xl font-light text-txtblue">
                stethoscope
              </span>
            </Col>
          </Row>
          <Row className="bg-white w-3/12 h-28 rounded-md py-3 px-5 flex justify-between items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <Col>
              <p className="text-lg font-medium">Nurses</p>
              <p className="text-xs text-txtgray">Current</p>
              <p className="text-2xl text-txtblue mt-3">15</p>
            </Col>
            <Col>
              <span className="material-symbols-outlined text-4xl font-light text-txtblue">
                vaccines
              </span>
            </Col>
          </Row>
        </Row>
      </Row>

      <Row className="bg-white h-96 rounded-md mt-6 flex flex-col">
        <p className="text-lg p-5 font-medium">Users' Details</p>
        <div className="flex-grow">
          <UsersTable />
        </div>
      </Row>

      <AddUserModal open={userModalOpen} handleClose={handleUserModalClose} />
    </Container>
  );
}
