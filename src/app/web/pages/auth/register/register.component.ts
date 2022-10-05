import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  SwalAlerts
} from 'src/app/shared';
import { LoginService, AuthService } from 'src/app/services';
import { Router } from '@angular/router';
import { VerifyPassword } from './register.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  logo: string = 'assets/img/logo.png';

  visibility: string = 'password';
  visibility_confirm: string = 'password';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private login: LoginService,
    private route: Router,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.email
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
    })
  }

  ngOnInit(): void {
  }

  switchVisibility = (type: string = 'password') => {
    if (type === 'password') this.visibility = this.visibility === 'password' ? 'text' : 'password';
    else this.visibility_confirm = this.visibility_confirm === 'password' ? 'text' : 'password';
  }

  submit = () => {
    this.login.register(this.form.value).subscribe(
      () => Swal.fire(SwalAlerts.swalRegisterUser())
    )
  }

  get email() { return this.form.get('email')?.value }
  get password() { return this.form.get('password')?.value }
  get password_confirmation() { return this.form.get('password_confirmation')?.value }

}
