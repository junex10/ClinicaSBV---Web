import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


const STATUS = {
  NOT_CHARGED: 0,
  CHARGING: 1,
  CHARGED: 2
};

interface Image {
  base64: string;
  blob: Blob;
  name: string;
  size: number;
  type: string;
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  form: FormGroup;
  statusFile: number = STATUS.NOT_CHARGED;
  srcResult: any;
  @ViewChild('fileInput') fileInput: any;
  @Output() file = new EventEmitter<any>();

  @Input('onText') onText: string = 'Subir archivo';
  @Input('onSuccessText') onSuccessText: string = 'Archivo subido';
  @Input('onWaitingText') onWaitingText: string = 'Subiendo archivo';

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      file: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onFileSelected = () => {
    this.statusFile = STATUS.CHARGING;
    const inputNode = this.fileInput.nativeElement.files[0];
    const mimeString = inputNode.type;
    this.processFile(inputNode, mimeString)
      .then(file => {
        this.statusFile = STATUS.CHARGED;
        this.file.emit(file);
      })
  }

  processFile = (inputNode: any, mimeString: string) => (
    new Promise((resolve, reject) => {
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        let imageFile: Image;

        reader.onload = (file: any) => {
          this.srcResult = file.target.result;
          imageFile = {
            name: inputNode.name,
            size: inputNode.size,
            blob: new Blob([new Uint8Array(this.srcResult)], { type: mimeString }),
            base64: `data:image/png;base64,${this.toBase64(this.srcResult)}`,
            type: mimeString
          };
          resolve(imageFile);
        };
        reader.readAsArrayBuffer(inputNode);
      }
    })
  )

  toBase64 = (arr: any[]) => {
    let Uint8 = new Uint8Array(arr);
    return btoa(
      Uint8.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
  }

  get form_file() { return this.form.get('file')?.value }
}
