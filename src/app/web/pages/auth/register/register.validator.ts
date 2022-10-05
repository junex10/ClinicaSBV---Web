import { FormGroup } from '@angular/forms';

export function VerifyPassword(controlName: string, matchingControlName: string){

    return (formGroup: FormGroup) => {

        const control = formGroup.controls[controlName];

        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.verifyPassword) {
            return;
        }

        if (control.value !== matchingControl.value) {

            matchingControl.setErrors({ verifyPassword: true });

        } else {

            matchingControl.setErrors(null);

        }

    }

}