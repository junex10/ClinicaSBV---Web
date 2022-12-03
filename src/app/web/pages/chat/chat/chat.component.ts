import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, PatientChatService, PatientSocketsService } from 'src/app/services';
import * as moment from 'moment';
import { ENVIRONMENT } from 'src/app/shared';
import SocketEvents from 'src/app/services/sockets/patient/sockets.events';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Globals } from 'src/app/helpers';
import Swal from 'sweetalert2';
import swalCommon from 'src/app/shared/commons/swal.common';

interface UsersList {
  id: number,
  photo: string,
  level: { name: string },
  person: { id: number, name: string, lastname: string }
}

interface ChatLogs {
  message: string, 
  created_at: string, 
  id: number, 
  sender_id: number,
  attachments_chats: {
    attachment: string;
  }[];
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('messageContent', { read: ElementRef }) messageContent: any;
  @ViewChild('addFileInput') addFileInput: any;
  @ViewChild('message') inputMessage: ElementRef | undefined;

  form: FormGroup;
  formMessage: FormGroup;
  formMessageWithFile: FormGroup;

  moment = moment;
  env = ENVIRONMENT;

  chatSelected = {
    logs: <ChatLogs[]>[],
    chat_name: '',
    photo: <string | null>null,
    open: false,
    session_id: 0
  };

  user = this.auth.getUser()?.user;

  chats: any;
  scrollDown: number = 0;
  openSearchChat: boolean = false;
  usersModalContext: NgbModal | null = null;

  selecteFileModal: NgbModalOptions = {
    size: 'xl'
  };
  openFileModal: boolean = false;
  getSelectedFile: string = '';
  selectedFiles: { base64: string, index: number, selected: boolean }[] = [];

  usersList: UsersList[] = [];

  openImgList: boolean = false;
  showListFiles: { attachment: string }[] = [];

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
    this.formMessageWithFile = this.fb.group({
      file: [[], Validators.required],
      message: [null, Validators.required],
      tmp_file: [[]]
    })
  }

  ngOnInit(): void {
    this.getChats(this.user.id);
    this.socket.on(SocketEvents.CHAT.NEW_MESSAGE, (data) => {
      const newLogs = data as ChatLogs;
      console.log(data, ' SENDED ')
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

  select_chat = (chat_session_id: number, name: string, photo: string) => {
    this.chat.getLogs({ chat_session_id }).subscribe(
      logs => {
        console.log(logs, ' AQUI ')
        this.chatSelected = {
          logs: (logs as { chats: { logs: [] } }).chats.logs,
          chat_name: name,
          open: true,
          photo,
          session_id: chat_session_id
        };
        setTimeout(() => this.scrollDown = this.messageContent.nativeElement.scrollHeight, 600);
      }
    )
  }

  newMessage = () => {
    const message = this.message_form;
    this.socket.newMessage(message, this.user.id, this.chatSelected.session_id);
    this.form.reset();
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
    const inputNode = this.addFileInput.nativeElement.files[0];
    const mimeString = inputNode.type;
    this.processFile(inputNode, mimeString, this.selectedFile.length)
      .then((file: any) => {
        const addFiles = this.selectedFile;
        addFiles.push(file);
        this.formMessageWithFile.get('file')?.setValue(addFiles);
        this.getSelectedFile = file?.base64;
        this.selectedFiles = addFiles;
      })
  }

  private processFile = (inputNode: any, mimeString: string, index: number) => (
    new Promise((resolve) => {
      let srcResult: any[] = [];
      const reader = new FileReader();
      let imageFile;
      reader.onload = (file: any) => {
        srcResult = file.target.result;
        imageFile = {
          name: inputNode.name,
          size: inputNode.size,
          blob: new Blob([new Uint8Array(srcResult)], { type: mimeString }),
          base64: `data:image/png;base64,${Globals.uint8ToBase64(srcResult)}`,
          type: mimeString,
          index,
          selected: false
        };
        resolve(imageFile);
      };
      reader.readAsArrayBuffer(inputNode);
    })
  )

  acceptFile = () => {
    if (this.formMessageWithFile.invalid) {
      Swal.fire(swalCommon.swalError('', 'Debe adjuntar por lo menos 1 imagen y un mensaje a enviar'));
      return;
    }

    const message = this.formMessageWithFile.get('message')?.value;
    const attachments = this.formMessageWithFile.get('file')?.value.map((item: unknown) => ((item as { blob: Blob })?.blob));
    this.chat.newMessage({ sender_id: this.user.id, message, session_id: this.chatSelected.session_id, attachments, formData: true }).subscribe(
      (data) => {
        const newLogs = (data as { message: ChatLogs }).message;
        this.chatSelected.logs = [...this.chatSelected.logs, { ...newLogs, sender_id: Number(newLogs.sender_id) }];

        this.formMessageWithFile.get('message')?.reset();
        this.formMessageWithFile.get('file')?.reset();
        this.selectedFiles = [];
        this.getSelectedFile = '';

        this.openFileModal = false;
      }
    )
  }

  imageToView = (item: unknown) => {
    const data = (item as { index: number, base64: string });
    const newSelected = this.selectedFiles.map(item => (item.index === data.index ? { ...item, selected: true } : { ...item, selected: false }));
    this.selectedFiles = newSelected;
    this.getSelectedFile = data.base64;
  }

  addChat = () => {
    this.chat.getUsers().subscribe(
      (data) => {
        this.usersList = (data as { users: [] }).users;
        this.openSearchChat = true;
      }
    )
  }

  getModalUsers = ($event: NgbModal) =>  this.usersModalContext = $event;

  newChat = (item: UsersList) => {
    this.chat.newChat({ sender_id: this.user.id, name: `${item.person.name} ${item.person?.lastname}`, receiver_id: item.id }).subscribe(
      () => {
        this.getChats(this.user.id);
        this.usersModalContext?.dismissAll();
      }
    )
  }

  openImgModal = (chat: unknown) => {
    this.openImgList = true;
    const data = (chat as { attachments_chats: { attachment: string }[] });
    this.showListFiles = data?.attachments_chats;
    this.getSelectedFile = this.env.storage + data?.attachments_chats[0].attachment;
  }
  selectImgModal = (item: unknown) => {
    const data = (item as { attachment: string });
    this.getSelectedFile = this.env.storage + data.attachment;
  }

  get search() { return this.form.get('search')?.value }
  get message_form() { return this.formMessage.get('message')?.value }
  get selectedFile() { return this.formMessageWithFile.get('file')?.value }
  get principal_form_message() { return this.form.get('message')?.value }
}
