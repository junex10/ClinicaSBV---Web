import { SweetAlertCustomClass, SweetAlertOptions } from 'sweetalert2';
import { Colors } from 'src/app/helpers';

class SwalAlerts {

    swalErrorLocation = (
        title: string = 'Error de ubicación',
        text: string = 'No se pudo obtener la ubicación actual, verifique su conexión o permita a la aplicación conocer su ubicación',
    ): SweetAlertOptions => ({
        html: `
        <div>
            <div class="iconSwal"><i class="fas fa-map-marker-alt iconBorder"></i></div><hr>
            <h4 class='text-center'>${title}</h4>
            <p style='font-size: 15px;' class='mt-4'>${text}</p>
        </div>`,
        showCancelButton: false,
        showConfirmButton: false
    })

    swalAuthAction = (
        title: string = '¿Desea confirmar esta acción?',
        confirmButtonText: string = 'Si',
        cancelButtonText: string = 'No'
    ): SweetAlertOptions => ({
        title,
        showConfirmButton: true,
        confirmButtonText: confirmButtonText,
        showCancelButton: true,
        cancelButtonText: cancelButtonText,
        icon: "question",
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        }
    });

    swalSuccess = (
        title: string = 'Acción completada',
        text: string = 'La acción se ha completado correctamente',
        buttonText: string = 'Entendido'
    ): SweetAlertOptions => ({
        title,
        text,
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: buttonText,
        customClass: {
            confirmButton: 'btn btn-success'
        },
        timer: 3000
    });

    swalError = (
        title: string = 'Error',
        text: string = 'Ha ocurrido un error desconocido',
        buttonText: string = 'Entendido'
    ): SweetAlertOptions => ({
        title,
        text,
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: buttonText,
        customClass: {
            confirmButton: 'btn btn-danger'
        },
        timer: 3000
    });

    swalInfo = (
        text: string,
        buttonText: string = 'Entendido'
    ): SweetAlertOptions => ({
        text,
        icon: "info",
        showConfirmButton: true,
        confirmButtonText: buttonText,
        customClass: {
            confirmButton: 'btn btn-info'
        },
        timer: 3000
    });

    swalRegisterUser = (
        title: string = 'Registro exitoso!',
        text: string = 'Se le ha enviado un correo electrónico',
    ): SweetAlertOptions => ({
        html: `
        <div>
            <div class="iconSwal"><i class="fa-solid fa-user iconBorder success"></i></div><hr>
            <h4 class='text-center'>${title}</h4>
            <p style='font-size: 15px;' class='mt-4'>${text}</p>
        </div>`,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        customClass: {
            confirmButton: 'btn btn-success'
        },
        timer: 3000
    });

    swalCustom = (
        html: string,
        custom?: SweetAlertOptions
    ): SweetAlertOptions => ({
        html,
        ...custom,
    });
}
export default new SwalAlerts();