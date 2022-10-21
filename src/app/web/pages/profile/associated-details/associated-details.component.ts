import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common'
import {
  Constants,
  SwalAlerts
} from 'src/app/shared';
import { AssociatesService } from 'src/app/services';
import { OperationService } from 'src/app/services';
import { ENVIRONMENT } from 'src/app/shared';
import * as moment from 'moment';

@Component({
  selector: 'app-associated-details',
  templateUrl: './associated-details.component.html',
  styleUrls: ['./associated-details.component.css']
})
export class AssociatedDetailsComponent implements OnInit {

  form: FormGroup;
  userImage: string = 'assets/img/user.png';

  constructor(
    private fb: FormBuilder,
    private associates: AssociatesService,
    private route: Router,
    private operation: OperationService,
    private location: Location
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
    const data = this.route.getCurrentNavigation()?.extras.state?.associated;
    if (data !== undefined) {
      this.operation.save({ module: 'associated-details', data: { id: data?.id } });
      this.getAssociated(data?.id);
    } else {
      const associated_id = this.operation.get();
      this.getAssociated(associated_id.data?.id);
    }
  }

  ngOnInit(): void {
    
  }

  getAssociated = (id: number) => {
    this.associates.getAssociated(id).subscribe(
      (data) => {
        const user = data.user;
        this.setValueForm('email', user.email);
        this.setValueForm('name', user.person.name);
        this.setValueForm('lastname', user.person.lastname);
        this.setValueForm('phone', user.person.phone);
        this.setValueForm('address', user.person.address);
        this.setValueForm('birthdate', moment(user.person.birthdate).format('YYYY-MM-DD'));
        this.setValueForm('photo', user.photo !== null ? `${ENVIRONMENT.storage}${user.photo}` : this.userImage);
      },
      () => this.location.back()
    )
  }

  onImage = (file: any) => {
    this.userImage = file.base64;
    this.form.get('photo')?.setValue(file.blob);
  }

 private setValueForm = (field: string, value?: string) => this.form.get(field)?.setValue(value);

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
