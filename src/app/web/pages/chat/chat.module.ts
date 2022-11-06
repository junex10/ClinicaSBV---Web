import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatComponent } from './chat/chat.component';
import { ChatGuard } from 'src/app/guards';

const routes: Routes = [
  {
    path: 'chats',
    component: ChatComponent,
    canActivate: [ChatGuard]
  }
];

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class ChatModule { }
