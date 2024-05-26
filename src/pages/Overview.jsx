import React, { useState } from "react";
import { Col, Container, Row } from "rsuite";
import OverviewLineChart from "../components/charts/OverviewLineChart";
import OverviewPieChart from "../components/charts/OverviewPieChart";
import OverviewTable from "../components/tables/OverviewTable";

export default function Overview() {
  return (
    <Container className="w-full">
      <Row className="pb-10 flex justify-between">
        <Col>
          <p className="text-2xl font-bold">Welcome, Dr. Alice Brown!</p>
          <p className="text-txtgray">
            Check the latest updates on your account
          </p>
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
          <Row className="bg-white h-28 rounded-md pt-3 pl-5 transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <p className="text-lg font-medium">Patients</p>
            <p className="text-xs text-txtgray">Current</p>
            <p className="text-2xl text-txtblue mt-3">10</p>
          </Row>
          <Row className="bg-white h-28 rounded-md pt-3 pl-5 mt-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <p className="text-lg font-medium">Patients In</p>
            <p className="text-xs text-txtgray">Today</p>
            <p className="text-2xl text-txtblue mt-3">03</p>
          </Row>
        </Col>
        <Col className="mr-8 w-2/12">
          <Row className="bg-white h-28 rounded-md pt-3 pl-5 transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <p className="text-lg font-medium">Alerts</p>
            <p className="text-xs text-txtgray">Current</p>
            <p className="text-2xl text-txtblue mt-3">02</p>
          </Row>
          <Row className="bg-white h-28 rounded-md pt-3 pl-5 mt-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <p className="text-lg font-medium">Patients Out</p>
            <p className="text-xs text-txtgray">Today</p>
            <p className="text-2xl text-txtblue mt-3">01</p>
          </Row>
        </Col>

        <Col className="bg-white w-1/3 rounded-md mr-8 flex-col items-center justify-center">
          <p className="mt-3 ml-5 pb-1 text-lg font-medium">Patient Flow</p>
          <OverviewLineChart />
        </Col>
        <Col className="bg-white w-1/3 rounded-md">
          <p className="mt-3 ml-5 pb-1 text-lg font-medium">Patient Status</p>
          <OverviewPieChart />
        </Col>
      </Row>

      <Row className="bg-white h-96 rounded-md mt-8 flex flex-col">
        <p className="text-lg p-5 font-medium">Patients’ Details</p>
        <div className="flex-grow">
          <OverviewTable />
        </div>
      </Row>
    </Container>
  );
}