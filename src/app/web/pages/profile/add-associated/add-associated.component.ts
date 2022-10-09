import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  Constants,
  SwalAlerts
} from 'src/app/shared';
import { AssociatesService, AuthService } from 'src/app/services';

@Component({
  selector: 'app-add-associated',
  templateUrl: './add-associated.component.html',
  styleUrls: ['./add-associated.component.css']
})
export class AddAssociatedComponent implements OnInit {

  form: FormGroup;
  userImage: string = 'assets/img/user.png';
  user: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private associates: AssociatesService,
    private route: Router
  ) { 
    this.form = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.email
      ]],
      name: [null, Validators.required],
      lastname: [null],
      phone: [null],
      address: [null],
      birthdate: [null, Validators.required],
      photo: [null],
      associated_id: [null]
    });
  }

  ngOnInit(): void {
    this.user = this.auth.getUser()?.user;
    this.form.get('associated_id')?.setValue(this.user.id);
  }

  onImage = (file: any) => {
    this.userImage = file.base64;
    this.form.get('photo')?.setValue(file.blob);
  }

  submit = () => {
    if (this.form.invalid) {
      Swal.fire(SwalAlerts.swalCustom(
        `<div>
          <h4 class='text-center'>Formulario inválido</h4>
          <p style='font-size: 15px;' class='mt-4'>Hay errores en el formulario, verifique antes de enviar</p>
        </div>`,
        {
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
          icon: 'error'
        }
      ));
      return;
    } else {
      this.associates.addAssociated({
        ...this.form.value,
        formData: true
      })
      .then(() => {
        Swal.fire(SwalAlerts.swalSuccess('Agregado', 'Asociado agregado!'));
        this.route.navigate(['/profile'])
      });
    }
  }

  get email() { return this.form.get('email')?.value }
  get name() { return this.form.get('name')?.value }
  get lastname() { return this.form.get('lastname')?.value }
  get phone() { return this.form.get('phone')?.value }
  get address() { return this.form.get('address')?.value }
  get birthdate() { return this.form.get('birthdate')?.value }
  get photo() { return this.form.get('photo')?.value }

}
