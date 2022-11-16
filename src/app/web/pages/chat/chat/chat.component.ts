import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService, PatientChatService, PatientSocketsService } from 'src/app/services';
import * as moment from 'moment';
import { ENVIRONMENT } from 'src/app/shared';
import SocketEvents from 'src/app/services/sockets/patient/sockets.events';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Globals } from 'src/app/helpers';


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

  @ViewChild('messageContent', { read: ElementRef }) messageContent: any;
  @ViewChild('fileInput') fileInput: any;

  actualTab: number = this.TABS.CHATS;

  form: FormGroup;
  formMessage: FormGroup;
  formAttachment: FormGroup;
  formMessageWithFile: FormGroup;

  moment = moment;
  env = ENVIRONMENT;

  chatSelected = {
    logs: <{ message: string, created_at: string, id: number, sender_id: number }[]>[],
    chat_name: '',
    open: false,
    session_id: 0
  };

  user = this.auth.getUser()?.user;

  chats: any;
  scrollDown: number = 0;

  selecteFileModal: NgbModalOptions = {
    size: 'xl'
  };
  openFileModal: boolean = false;
  getSelectedFile: string = '';

  constructor(
    private fb: FormBuilder,
    private chat: PatientChatService,
    private auth: AuthService,
    private socket: PatientSocketsService
  ) {
    this.form = this.fb.group({
      search: [null]
    });
    this.formMessage = this.fb.group({
      message: [null]
    });
    this.formAttachment = this.fb.group({
      file: [null]
    })
    this.formMessageWithFile = this.fb.group({
      file: [[]],
      message: [null]
    })
  }

  ngOnInit(): void {
    this.getChats(this.user.id);
    this.socket.on(SocketEvents.CHAT.NEW_MESSAGE, (data) => {
      const newLogs = data as { message: string, created_at: string, id: number, sender_id: number };
      this.chatSelected.logs = [...this.chatSelected.logs, newLogs];
    });
  }

  getChats = (user_id: number) => {
    this.chat.getChats({ user_id }).subscribe(
      (logs) => {
        this.chats = (logs as { chats: [] })?.chats;
      }
    );
  }

  tab = (tab: number) => this.actualTab = tab;

  select_chat = (chat_session_id: number) => {
    this.chat.getLogs({ chat_session_id }).subscribe(
      logs => {
        this.chatSelected = {
          logs: (logs as { chats: { logs: [] } }).chats.logs,
          chat_name: (logs as { chats: { chat_name: string } }).chats.chat_name,
          open: true,
          session_id: chat_session_id
        };
        setTimeout(() => this.scrollDown = this.messageContent.nativeElement.scrollHeight, 600);
      }
    )
  }

  newMessage = () => {
    const message = this.message_form;
    this.socket.newMessage(message, this.user.id, this.chatSelected.session_id);
    this.form.get('message')?.setValue('');
  }

  searchChats = () => {
    const search = this.search;
    if (search !== null) {
      const chats = this.chats.filter((x: any) => x.item.chat_session.name.match(eval(`/${search}.*/`)));
      this.chats = chats;
    } else {
      this.getChats(this.user.id);
    }
  }

  onFileSelected = () => {
    const inputNode = this.fileInput.nativeElement.files[0];
    const mimeString = inputNode.type;
    this.processFile(inputNode, mimeString)
    .then((file: any) => {
      this.openFileModal = true;
      const addFile = [...this.formMessageWithFile.get('file')?.value, file];
      this.formMessageWithFile.get('file')?.setValue(addFile);
      this.getSelectedFile = file?.base64;
    })
  }

  private processFile = (inputNode: any, mimeString: string) => (
    new Promise((resolve) => {
      let srcResult: any[] = [];

      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        let imageFile;

        reader.onload = (file: any) => {
          srcResult = file.target.result;
          imageFile = {
            name: inputNode.name,
            size: inputNode.size,
            blob: new Blob([new Uint8Array(srcResult)], { type: mimeString }),
            base64: `data:image/png;base64,${Globals.uint8ToBase64(srcResult)}`,
            type: mimeString
          };
          resolve(imageFile);
        };
        reader.readAsArrayBuffer(inputNode);
      }
    })
  )

  acceptFile = () => {
    console.log('hey')
  }

  get search() { return this.form.get('search')?.value }
  get message_form() { return this.formMessage.get('message')?.value }
  get selectedFile() { return this.formMessageWithFile.get('file')?.value }
}
