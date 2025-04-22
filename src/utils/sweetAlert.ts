import Swal from "sweetalert2";

interface SweetAlertProps {
  icon: "success" | "error" | "warning" | "info" | "question";
  title?: string; 
  showConfirm?: boolean; 
  timer?: number; 
}

export const SwlNotify = ({
  icon,
  title = "", // default giá trị là ""
  showConfirm = false, // default là false
  timer = 1500, // default là 0
}: SweetAlertProps) => {
  Swal.fire({
    icon,
    title,
    showConfirmButton: showConfirm,
    timer,
  });
};
