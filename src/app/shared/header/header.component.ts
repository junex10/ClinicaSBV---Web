import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GetUserDTO } from 'src/app/dtos';
import { AuthService } from 'src/app/services';
import { ENVIRONMENT } from 'src/app/shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showMenu: boolean = false;
  user: GetUserDTO | any = '';

  menu = [
    {
      name: 'Perfil',
      icon: "fa-solid fa-user",
      selected: false,
      multiple: true,
      subMenu: [
        {
          name: 'Perfil',
          icon: "fa-solid fa-user",
          route: '/profile'
        }
      ],
    },
    {
      name: 'Salir',
      icon: 'fa-solid fa-arrow-right-from-bracket',
      selected: false,
      multiple: false,
      action: 'logout()'
    }
  ];

  constructor(
    private route: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUser()?.user;
    this.user.photo = this.user.photo !== null ? `${ENVIRONMENT.storage}${this.user.photo}` : 'assets/img/user.png';
  }

  openMenu = () => this.showMenu = this.showMenu ? false : true;

  redirect = (route: string) => this.route.navigate([route]);

  action = (action: any) => eval(`this.${action}`);

  logout = () => this.auth.logout();
}
