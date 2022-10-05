import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services';
import Swal from 'sweetalert2';
import { SwalAlerts } from 'src/app/shared';
import { VerifyPassword } from '../register/register.validator';
import { ResetParamsDTO } from 'src/app/dtos/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-account',
  templateUrl: './forgot-account.component.html',
  styleUrls: ['./forgot-account.component.css']
})
export class ForgotAccountComponent implements OnInit {

  logo: string = 'assets/img/logo.png';
  step: number = 1;

  form: FormGroup;

  visibility: string = 'password';
  visibility_confirm: string = 'password';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: Router
  ) {
    this.form = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.email
      ]],
      code: [null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]\d*$/)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(6)
      ]],
      password_confirmation: [null, [
        Validators.required,
        Validators.minLength(6)
      ]]
    }, {
      validator: VerifyPassword('password', 'password_confirmation')
    });
  }

  ngOnInit(): void {
  }

  authEmail = () => {
    this.auth.recover(this.email).subscribe(
      (data) => {
        if (data.user) Swal.fire(SwalAlerts.swalSuccess('Correo', 'Se te ha enviado un código al electrónico')).then(() => this.step = 2);
        else Swal.fire(SwalAlerts.swalError('Correo', 'El correo electrónico no existe'));
      }
    )
  }

  otpChange = (code: string) => this.form.get('code')?.setValue(code);

  switchVisibility = (type: string = 'password') => {
    if (type === 'password') this.visibility = this.visibility === 'password' ? 'text' : 'password';
    else this.visibility_confirm = this.visibility_confirm === 'password' ? 'text' : 'password';
  }

  sendOtp = () => {
    this.auth.sendOtp(this.code).subscribe(
      (data) => {
        if (data?.result) this.step = 3;
        else Swal.fire(SwalAlerts.swalError('Error', 'El código otp es incorrecto'));
      }
    )
  }

  submit = () => {
    const reset: ResetParamsDTO = {
      code: this.code,
      password: this.password,
      password_confirmation: this.password_confirmation
    };
    this.auth.reset(reset).subscribe(
      (data) => {
        if (data?.result) Swal.fire(SwalAlerts.swalSuccess('Contraseña', 'Contraseña actualizada!')).then(() => this.route.navigate(['/login']))
      }
    );
  }

  get email() { return this.form.get('email')?.value; }
  get code() { return this.form.get('code')?.value; }
  get password() { return this.form.get('password')?.value }
  get password_confirmation() { return this.form.get('password_confirmation')?.value }
}
