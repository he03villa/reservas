import Swal from 'sweetalert2';

const Alert =  async (icon, title, text, confirmButtonText, showCancelButton = false, cancelButtonText = '', showCloseButton = true, backdrop = true) => {
  return await Swal.fire({
    icon,
    title,  
    html: text,
    confirmButtonText,
    cancelButtonText,
    showCancelButton,
    showCloseButton: showCloseButton,
    backdrop: backdrop,
    background: '.swal2-container.swal2-backdrop-show'
  }).then();
}

export {
  Alert
}