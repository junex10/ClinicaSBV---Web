import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AssociatesService, AuthService, PetitionService, ProfileService } from 'src/app/services';
import Swal from 'sweetalert2';
import {
  Constants,
  SwalAlerts
} from 'src/app/shared';
import * as moment from 'moment';
import { ENVIRONMENT } from 'src/app/shared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data: any[] = [];
  total: number = 0;
  header = ['#', 'Proceso', 'Fecha', 'Opciones'];
  user: any;
  petitions: [] = [];
  page: number = 1;
  moment: any = moment;

  form: FormGroup;

  openEditModal: boolean = false;
  openDetails: boolean = false;

  petitionSelected: any = {};

  userImage: string = 'assets/img/user.png';

  editUserStyle: NgbModalOptions = {
    size: 'xl'
  };

  patient: boolean = false;

  associate = {
    data: <any>[],
    page: 1,
    total: 0,
    header: ['#', 'Nombre', 'Apellido', 'Edad', 'Opciones']
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private petition: PetitionService,
    private profile: ProfileService,
    private router: Router,
    private associates: AssociatesService
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
      id: [null]
    });
  }

  ngOnInit(): void {
    this.load(this.page);
  }

  load = (page: any = 1) => {
    this.user = this.auth.getUser()?.user;
    this.user.photo = this.user.photo !== null ? `${ENVIRONMENT.storage}${this.user.photo}` : 'assets/img/user.png';
    this.patient = this.user.level.id === Constants.LEVELS.PATIENT && true;

    this.form.get('email')?.setValue(this.user.email);
    this.form.get('name')?.setValue(this.user.person.name);
    this.form.get('lastname')?.setValue(this.user.person.lastname);
    this.form.get('phone')?.setValue(this.user.person.phone);
    this.form.get('address')?.setValue(this.user.person.address);
    this.form.get('birthdate')?.setValue(moment(this.user.person.birthdate).toDate());
    this.form.get('id')?.setValue(this.user.id);
    

    this.petition.getPetitions(page).subscribe(
      (item) => {
        if (item.data !== null) {
          const addTools = item.data.petitions.map((value: any) => (
            { ...value, tools: [
              {
                icon: 'visibility',
                action: 'showDetails()'
              }
            ] }
          ));
          this.data = addTools;
          this.total = item.data.count;
        }
      }
    )
    this.associates.getAll(this.user.id, this.associate.page).then(
      (item) => {
        const data = item.rows.map(value => (
          {
            id: value.id,
            name: value.person?.name,
            lastname: value.person?.lastname,
            age: value.person?.age,
            tools: [
              {
                icon: 'visibility',
                action: 'showAssociated()'
              }
            ]
          }
        ))
        this.associate = {
          ...this.associate,
          data,
          total: item.count
        }
      }
    )
  }
  next = (page: number) => this.load(page);
  nextAssociated = (page: number) => {
    this.associates.getAll(this.user.id, page).then(
      (item) => {
        const data = item.rows.map(value => (
          {
            id: value.id,
            name: value.person?.name,
            lastname: value.person?.lastname,
            age: value.person?.age,
            tools: [
              {
                icon: 'visibility',
                action: 'showAssociated()'
              }
            ]
          }
        ))
        this.associate = {
          ...this.associate,
          data,
          total: item.count
        }
      }
    )
  }

  openEdit = () => this.openEditModal = true;

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
      
      this.profile.updateUser({
        ...this.form.value,
        formData: true
      })
      .then(async value => {
        Swal.fire(SwalAlerts.swalSuccess('Perfil', 'Perfil actualizado!'));
        this.auth.removeUser();
        await this.auth.setUser(value);
        this.user = this.auth.getUser()?.user;
      });
    }
  }

  showDetails = () => this.openDetails = true;

  receivedTools = ($function: any) => {
    this.petitionSelected = $function;
    eval(`this.${$function.action}`);
  }

  onImage = (file: any) => {
    this.userImage = file.base64;
    this.form.get('photo')?.setValue(file.blob);
  }

  addAssociated = () => this.router.navigate(['/profile/add-associated']);
  showAssociated = () => this.router.navigate(['/profile/associated-details']);

  get email() { return this.form.get('email')?.value }
  get name() { return this.form.get('name')?.value }
  get lastname() { return this.form.get('lastname')?.value }
  get phone() { return this.form.get('phone')?.value }
  get address() { return this.form.get('address')?.value }
  get birthdate() { return this.form.get('birthdate')?.value }
  get photo() { return this.form.get('photo')?.value }
}
