import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotexistspageComponent } from './web/notexistspage/notexistspage.component';
import { AppComponent } from './app.component';

// Modules
import { PagesModule } from 'src/app/web/pages/pages.module';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    loadChildren: () => import('src/app/web/pages/pages.module').then(mod => mod.PagesModule)
  },
  {
    path: '**',
    component: NotexistspageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
