import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Divider, Modal } from "rsuite";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";
import UserDetails from "../components/common/UserDetails";
import { useGetAvailableBedsQuery } from "../store/api/dropDownApi";
import {
  useCreatePatientMutation,
  useGetAdmittedPatientsQuery,
  useGetPatientListQuery,
} from "../store/api/patientApi";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  lastName: yup.string().required("Last Name is required"),
  dateOfBirth: yup.date().required("Birthday is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.string().required("Address is required"),
  contactNo: yup.string().required("Contact No is required"),
  guardianName: yup.string().required("Guardian's Name is required"),
  bedId: yup.string().required("Bed No is required"),
  bloodGroup: yup.string().required("Blood Group is required"),
  diagnosis: yup.string().required("Diagnosis is required"),
});

export default function Register() {
  const { data: bedsData } = useGetAvailableBedsQuery();
  const [addPatient] = useCreatePatientMutation();
  const { refetch: refetchAll } = useGetPatientListQuery();
  const { refetch: refetchAdmitted } = useGetAdmittedPatientsQuery();

  const beds = bedsData?.payload || [];

  console.log("Patient", bedsData);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      hospitalId: "1",
      nic: "981234567V",
    };

    try {
      const response = await addPatient(formattedData);

      if (response.data && !response.data.error) {
        reset();
        refetchAdmitted();
        refetchAll();
        handleClose();
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Patient Registered Successfully",
        });
      } else {
        console.log("User adding failed", response);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            response?.error?.data?.payload ||
            response?.data?.payload ||
            "user registration failed",
        });
      }
    } catch (error) {
      console.error("Patient Registration Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="pb-10 flex justify-between">
        <div className="flex items-center mb-5">
          <span className="material-symbols-outlined text-black font-semibold">
            person_add
          </span>
          <p className="text-2xl font-bold ml-4">Patient Registration</p>
        </div>
        <UserDetails />
      </div>
      <div className="flex-col w-full bg-white rounded-md justify-between items-center py-6 mb-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full mt-8 px-10">
            <p className="text-semibold text-lg w-28">Patient</p>
            <div className="flex-col w-full ml-10">
              <div className="flex space-x-10">
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic name"
                      label="Name"
                      variant="outlined"
                      className="!mb-2 w-full"
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ""}
                    />
                  )}
                />
                <Controller
                  name="bht"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="BHT"
                      variant="outlined"
                      className="!mb-5 w-full"
                      error={!!errors.bht}
                      helperText={errors.bht ? errors.bht.message : ""}
                    />
                  )}
                />
              </div>
              <div className="flex justify-between space-x-10">
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateField", "DateField"]}>
                      <Controller
                        name="dateOfBirth"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                          <DateField
                            {...field}
                            label="Birthday"
                            className="!w-full !mb-5"
                            format="YYYY-MM-DD"
                            error={!!errors.dateOfBirth}
                            helperText={
                              errors.dateOfBirth
                                ? errors.dateOfBirth.message
                                : " "
                            }
                          />
                        )}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl
                      className="w-full !mb-5"
                      error={!!errors.gender}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Gender
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Gender"
                      >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                      </Select>
                      {errors.gender && (
                        <FormHelperText>{errors.gender.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </div>
              <div className="flex space-x-10">
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Address"
                      variant="outlined"
                      className="!mb-4 w-full"
                      error={!!errors.address}
                      helperText={errors.address ? errors.address.message : ""}
                    />
                  )}
                />
                <Controller
                  name="contactNo"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Contact No"
                      variant="outlined"
                      className="!mb-5 w-full"
                      error={!!errors.contactNo}
                      helperText={
                        errors.contactNo ? errors.contactNo.message : ""
                      }
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <Divider className="text-txtgray !mt-2 !mx-10 " />
          <div className="flex w-full mt-8 px-10">
            <p className="text-semibold text-lg w-28">Guardian</p>
            <div className="flex-col w-full ml-10">
              <div className="flex space-x-10">
                <Controller
                  name="guardianName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic name"
                      label="Full Name"
                      variant="outlined"
                      className="!mb-5 w-full"
                      error={!!errors.guardianName}
                      helperText={
                        errors.guardianName ? errors.guardianName.message : ""
                      }
                    />
                  )}
                />
                <Controller
                  name="guardianRelation"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Relation"
                      variant="outlined"
                      className="!mb-4 w-full"
                      error={!!errors.guardianRelation}
                      helperText={
                        errors.guardianRelation
                          ? errors.guardianRelation.message
                          : ""
                      }
                    />
                  )}
                />
              </div>
              <div className="flex space-x-10">
                <Controller
                  name="guardianAddress"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Address"
                      variant="outlined"
                      className="!mb-4 w-full"
                      error={!!errors.address}
                      helperText={errors.address ? errors.address.message : ""}
                    />
                  )}
                />
                <Controller
                  name="guardianContactNo"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Contact No"
                      variant="outlined"
                      className="!mb-5 w-full"
                      error={!!errors.contact}
                      helperText={errors.contact ? errors.contact.message : ""}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <Divider className="text-txtgray !mt-2 !mx-10 " />
          <div className="flex w-full mt-8 px-10">
            <p className="text-semibold text-lg w-28">Medical</p>
            <div className="flex-col w-full ml-10">
              <div className="flex space-x-10">
                <Controller
                  name="admissionDiagnosis"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic name"
                      label="Admission Diagnosis"
                      variant="outlined"
                      className="!mb-5 w-full"
                      error={!!errors.admissionDiagnosis}
                      helperText={
                        errors.admissionDiagnosis
                          ? errors.admissionDiagnosis.message
                          : ""
                      }
                    />
                  )}
                />
                <Controller
                  name="otherDiagnoses"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic name"
                      label="Other Diagnoses"
                      variant="outlined"
                      className="!mb-5 w-full"
                      error={!!errors.otherDiagnoses}
                      helperText={
                        errors.otherDiagnoses
                          ? errors.otherDiagnoses.message
                          : ""
                      }
                    />
                  )}
                />
              </div>
              <div className="flex space-x-10">
                <Controller
                  name="guardianAddress"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Brief history of current illness"
                      variant="outlined"
                      className="!mb-4 w-full"
                    />
                  )}
                />
              </div>
              <div className="flex space-x-10">
                <Controller
                  name="coMorbidities"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic name"
                      label="Co-Morbidities"
                      variant="outlined"
                      className="!mb-5 w-full"
                    />
                  )}
                />
                <Controller
                  name="prevAdmissions"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl className="w-full !mb-5">
                      <InputLabel id="demo-simple-select-label">
                        Previous ICU Admissions
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Previous ICU Admissions"
                      >
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                        <MenuItem value={"Don't Know"}>Don't Know</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </div>
              <div className="flex space-x-10">
                <Controller
                  name="bloodGroup"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl
                      className="w-full !mb-5"
                      error={!!errors.gender}
                    >
                      <InputLabel id="demo-simple-select-label" className="">
                        Blood Group
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Blood Group"
                      >
                        <MenuItem value={"A+"}>A+</MenuItem>
                        <MenuItem value={"A-"}>A-</MenuItem>
                        <MenuItem value={"B+"}>B+</MenuItem>
                        <MenuItem value={"B-"}>B-</MenuItem>
                        <MenuItem value={"O+"}>O+</MenuItem>
                        <MenuItem value={"O-"}>O-</MenuItem>
                        <MenuItem value={"AB+"}>AB+</MenuItem>
                        <MenuItem value={"AB-"}>AB-</MenuItem>
                      </Select>

                      {errors.gender && (
                        <FormHelperText>
                          {errors.bloodGroup.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name="married"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl className="w-full !mb-5">
                      <InputLabel id="demo-simple-select-label">
                        Married
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Married"
                      >
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </div>
              <div className="flex space-x-10">
                <Controller
                  name="alcohol"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl className="w-full !mb-5">
                      <InputLabel id="demo-simple-select-label">
                        Alcohol
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Alcohol"
                      >
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                <Controller
                  name="smoker"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl className="w-full !mb-5">
                      <InputLabel id="demo-simple-select-label">
                        Smoker
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Smoker"
                      >
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </div>
              <div className="flex space-x-10">
                <Controller
                  name="uop"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic name"
                      label="UOP (Last 24hrs)"
                      variant="outlined"
                      className="!mb-5 w-full"
                    />
                  )}
                />
                <Controller
                  name="fluidIntake"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic name"
                      label="Fluid Intake (Last 24hrs)"
                      variant="outlined"
                      className="!mb-5 w-full"
                    />
                  )}
                />
              </div>
              <div className="flex space-x-10">
                <Controller
                  name="currentMeds"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic name"
                      label="Current Meds"
                      variant="outlined"
                      className="!mb-5 w-full"
                    />
                  )}
                />
                <Controller
                  name="allergies"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic name"
                      label="Allergies"
                      variant="outlined"
                      className="!mb-5 w-full"
                    />
                  )}
                />
              </div>
              <div className="flex space-x-10">
                <Controller
                  name="currentMeds"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic name"
                      label="Other disciplines reffered"
                      variant="outlined"
                      className="!mb-5 w-full"
                    />
                  )}
                />
                <Controller
                  name="allergies"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic name"
                      label="Procedures"
                      variant="outlined"
                      className="!mb-5 w-full"
                    />
                  )}
                />
              </div>
              <div className="flex space-x-10">
                <Controller
                  name="currentMeds"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic name"
                      label="Problem List"
                      variant="outlined"
                      className="!mb-5 w-full"
                    />
                  )}
                />
                <Controller
                  name="allergies"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic name"
                      label="Plan by medical team"
                      variant="outlined"
                      className="!mb-5 w-full"
                    />
                  )}
                />
              </div>
              <div className="flex space-x-10">
                <Controller
                  name="guardianAddress"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Summary of key investigations"
                      variant="outlined"
                      className="!mb-4 w-full"
                    />
                  )}
                />
              </div>
              <div className="flex space-x-10">
                <Controller
                  name="guardianAddress"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Summary of management"
                      variant="outlined"
                      className="!mb-4 w-full"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <Divider className="text-txtgray !mt-2 !mx-10 " />
          <div className="flex w-full mt-8 px-10">
            <p className="text-semibold text-lg w-28">Admission</p>
            <div className="flex-col w-full ml-10">
              <div className="flex space-x-10">
                <Controller
                  name="bedId"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl
                      className="w-full !mb-5"
                      error={!!errors.bedId}
                    >
                      <InputLabel id="demo-simple-select-label" className="">
                        Bed No
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Bed No"
                      >
                        {beds.map((bed) => (
                          <MenuItem key={bed.id} value={bed.id}>
                            {bed.bedNo}
                          </MenuItem>
                        ))}
                      </Select>

                      {errors.bedId && (
                        <FormHelperText>{errors.bedId.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name="guardianAddress"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Special Notes"
                      variant="outlined"
                      className="!mb-4 w-full"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <Divider className="text-txtgray !mt-2 !mx-10 " />
          <div className="w-full flex flex-row justify-evenly mt-8 mb-4 px-10">
            <button
              type="button"
              onClick={() => {
                handleClose();
                reset();
              }}
              className="w-4/12 h-11 rounded-md mr-4 border-solid border border-slate-300 hover:bg-slate-200 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-4/12 h-11 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition-all duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
