import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Divider, Modal } from "rsuite";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  birthday: yup.date().required("Birthday is required"),
  username: yup.string().required("Username is required"),
  lastName: yup.string().required("Last Name is required"),
  contact: yup.string().required("Contact is required"),
  role: yup.string().required("Role is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function AddPatientModal({ open, handleClose }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    console.log(data);
    // handleClose();
    reset();
  };

  return (
    <Modal open={open} onClose={handleClose} className="!w-2/5 !mt-36">
      <Modal.Body className="!h-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center !h-16 mt-4 rounded-t-md px-10">
            <p className="font-semibold text-2xl ">Patient Registration</p>
            <div className="border-double border-4 text-txtblue border-slate-100 bg-white rounded-full h-12 w-12 items-center flex justify-center">
              <span className="material-symbols-outlined">person_add</span>
            </div>
          </div>
          <Divider className="text-txtgray !mt-2 w-11/12 !mx-auto" />
          <div className="flex justify-between w-full mt-8 px-10 space-x-10">
            <div className="flex-col w-1/2">
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    // size="small"
                    {...field}
                    id="outlined-basic name"
                    label="First Name"
                    variant="outlined"
                    className="!mb-5 w-full"
                    error={!!errors.firstName}
                    helperText={
                      errors.firstName ? errors.firstName.message : ""
                    }
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    // size="small"
                    {...field}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    className="!mb-4 w-full"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                  />
                )}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateField", "DateField"]}>
                  <Controller
                    name="birthday"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <DateField
                        // size="small"
                        {...field}
                        label="Birthday"
                        className="!mb-5 w-full"
                        format="DD-MM-YYYY"
                        error={!!errors.birthday}
                        helperText={
                          errors.birthday ? errors.birthday.message : ""
                        }
                      />
                    )}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    // size="small"
                    {...field}
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    className="!mb-5 w-full"
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.message : ""}
                  />
                )}
              />
            </div>
            <div className="flex-col w-1/2 text-right">
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    // size="small"
                    {...field}
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    className="!mb-5 w-full"
                    error={!!errors.lastName}
                    helperText={errors.lastName ? errors.lastName.message : ""}
                  />
                )}
              />
              <Controller
                name="contact"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    // size="small"
                    {...field}
                    id="outlined-basic"
                    label="Contact"
                    variant="outlined"
                    className="!mb-5 w-full"
                    error={!!errors.contact}
                    helperText={errors.contact ? errors.contact.message : ""}
                  />
                )}
              />
              <Controller
                name="role"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl className="w-full !mb-5" error={!!errors.role}>
                    <InputLabel id="demo-simple-select-label" className="">
                      Role
                    </InputLabel>
                    <Select
                      // size="small"
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Role"
                    >
                      <MenuItem value={1}>Admin</MenuItem>
                      <MenuItem value={2}>Doctor</MenuItem>
                      <MenuItem value={3}>Nurse</MenuItem>
                    </Select>

                    {errors.role && (
                      <FormHelperText>{errors.role.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl
                    variant="outlined"
                    className="!mb-5 w-full"
                    error={!!errors.role}
                  >
                    <InputLabel
                      htmlFor="outlined-adornment-password"
                      className=""
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      {...field}
                      // size="small"
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <span className="material-symbols-outlined">
                                visibility_off
                              </span>
                            ) : (
                              <span className="material-symbols-outlined">
                                visibility
                              </span>
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      error={!!errors.password}
                    />
                    {errors.password && (
                      <FormHelperText>{errors.password.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </div>
          </div>
          <div className="w-full flex flex-row justify-end mt-5 mb-4 px-10">
            <button
              type="button"
              onClick={() => {
                handleClose();
                reset();
              }}
              className="w-1/2 h-10 rounded-md mr-4 border-solid border border-slate-300 hover:bg-slate-200 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 h-10 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition-all duration-300"
            >
              Create
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
