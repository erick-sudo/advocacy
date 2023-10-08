import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const notifiers = {
  httpError: (message: { message: string }) => {
    Toast.fire({
      icon: "error",
      title: "Oops...",
      color: "red",
      text: message.message ? message.message : "An error occured!!",
    });
  },
  httpSuccess: (message: string) => {
    Toast.fire({
      icon: "success",
      title: "Success!",
      color: "green",
      text: message,
    });
  },
};
