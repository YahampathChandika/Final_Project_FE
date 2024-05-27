import React, { useState } from "react";
import { Modal } from "rsuite";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
export default function AddUserModal({ open, handleClose }) {
  const [birthday, setBirthday] = useState();
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Modal open={open} onClose={handleClose} className="!w-1/2 ">
      <Modal.Body className="px-10">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-2xl">User Registration</p>
          <div className="border-double border-4 text-txtblue	 border-slate-100 bg-slate-200 rounded-full h-12 w-12 items-center flex justify-center">
            <span className="material-symbols-outlined">person_add</span>
          </div>
        </div>
        <div className="flex justify-between w-full mt-5">
          <div className="flex-col w-5/12">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              className="!mb-5 w-full"
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className="!mb-4 w-full"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField", "DateField"]}>
                <DateField
                  label="Birthday"
                  value={birthday}
                  onChange={(newValue) => setBirthday(newValue)}
                  className="!mb-5 w-full"
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              className="!mb-5 w-full"
            />
          </div>
          <div className="flex-col w-5/12 text-right">
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              className="!mb-5 w-full"
            />
            <TextField
              id="outlined-basic"
              label="Contact"
              variant="outlined"
              className="!mb-5 w-full"
            />
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                onChange={handleRoleChange}
                className="!mb-5 w-full"
              >
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={2}>Doctor</MenuItem>
                <MenuItem value={3}>Nurse</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="!mb-5 w-full">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
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
              />
            </FormControl>
          </div>
        </div>
        <div className="w-full flex justify-around mt-5">
          <button
            onClick={handleClose}
            className="w-2/5 h-10  rounded-md border-solid border border-slate-300 hover:bg-slate-200 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleClose}
            className="w-2/5 h-10  rounded-md bg-blue-700 text-white hover:bg-blue-800 transition-all duration-300"
          >
            Create
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
