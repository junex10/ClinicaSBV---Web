import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  chatSelected = {};
  isEmojiPickerVisible: boolean = false;

  constructor(
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      search: [null]
    });
    this.message = this.fb.group({
      message: [null]
    })
  }

  ngOnInit(): void {
  }

  tab = (tab: number) => this.actualTab = tab;

  addEmoji = ($event: any) => {
    console.log($event)
  }

  get search() { return this.form.get('search')?.value }
  get message_form() { return this.message.get('message')?.value }
}
