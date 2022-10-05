import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services';
import Swal from 'sweetalert2';
import {
  SwalAlerts
} from 'src/app/shared';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const token = `verify/${params.get('token')}`;
      this.auth.verify(token ?? '').subscribe(
        (data) => 
        data?.message !== undefined && (
          Swal.fire(SwalAlerts.swalSuccess('Cuenta validada', data?.message)).then(() => this.router.navigate(['/login']))
        )
      )
    });
  }

}
