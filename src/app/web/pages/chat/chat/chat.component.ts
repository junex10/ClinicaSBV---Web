import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService, PatientChatService } from 'src/app/services';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  TABS = {
    CHATS: 1,
    GROUPS: 2
  };

  actualTab: number = this.TABS.CHATS;
  form: FormGroup;
  message: FormGroup;

  chatSelected = null;
  isEmojiPickerVisible: boolean = false;

  user = this.auth.getUser()?.user;

  chats: [] = [];

  constructor(
    private fb: FormBuilder,
    private chat: PatientChatService,
    private auth: AuthService
  ) { 
    this.form = this.fb.group({
      search: [null]
    });
    this.message = this.fb.group({
      message: [null]
    })
  }

  ngOnInit(): void {
    this.getChats(this.user.id);
  }

  getChats = (user_id: number) => {
    this.chat.getChats({ user_id }).subscribe(
      (logs) => {
        this.chats = (logs as { chats: [] })?.chats;
      }
    )
  }

  tab = (tab: number) => this.actualTab = tab;

  get search() { return this.form.get('search')?.value }
  get message_form() { return this.message.get('message')?.value }
}
