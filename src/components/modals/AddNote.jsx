import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Divider } from "rsuite";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useAddNotesMutation,
  useGetPatientByIdQuery,
} from "../../store/api/patientApi";
import { useGetSignedUserQuery } from "../../store/api/userApi";

function AddNote({ open, handleClose }) {
  const { id } = useParams();
  const [addNotes] = useAddNotesMutation();
  const { data: signedUser } = useGetSignedUserQuery();
  const { refetch: patientRefetch } = useGetPatientByIdQuery(id);
  const name = signedUser?.payload?.firstName;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const submissionData = {
        patientId: id,
        name: name || "Unknown",
        note: formData.note,
      };
      const response = await addNotes(submissionData);
      if (response?.data && !response?.data?.error) {
        patientRefetch();
        reset();
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
          title: "Record Added!",
        });
      } else {
        console.log("Record Adding failed!", response);
        Swal.fire({
          title: "Oops...",
          text:
            response?.error?.data?.payload ||
            response?.data?.payload ||
            "Failed to add record!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Failed to add record!", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add record!",
      });
    }
  };

  return (
    <Modal open={open} onClose={handleClose} className="!w-1/4 !mt-36">
      <Modal.Body className="!h-auto">
        <div className="flex justify-between items-center !h-16 mt-4 rounded-t-md px-10">
          <p className="font-semibold text-2xl">Add Record</p>
          <div className="border-double border-4 text-red-600 border-slate-100 bg-slate-200 rounded-full h-12 w-12 items-center flex justify-center">
            <span className="material-symbols-outlined text-txtblue">
              note_add
            </span>
          </div>
        </div>
        <Divider className="text-txtgray !mt-2 w-11/12 !mx-auto" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap items-center w-full px-5">
            <Controller
              name="note"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  {...field}
                  className="px-5 w-full h-32 focus:outline-none"
                  placeholder="Enter note here..."
                />
              )}
            />
          </div>
          <div className="flex flex-wrap items-center w-full mt-6"></div>
          <div className="w-full flex justify-between mt-6 mb-4 px-10">
            <button
              type="button"
              onClick={handleClose}
              className="w-1/2 h-10 rounded-md mr-4 border-solid border border-slate-300 transition-transform duration-300 hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 h-10 rounded-md bg-txtblue text-white transition-transform duration-300 hover:scale-105"
            >
              Add Record
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddNote;
