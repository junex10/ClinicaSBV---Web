import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ModalComponent implements OnChanges {

  @Input('title') title: string = 'Modal';
  @Input('acceptButton') acceptButton: string | null = 'Aceptar';
  @Input('closeButton') closeButton: string | null = null;
  @Input('showModal') showModal: boolean = false;
  @Input('styles') styles: NgbModalOptions = {};

  @Output() close = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() accept = new EventEmitter<any>();

  @ViewChild('content') modal: any;

  closeResult = '';
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnChanges(): void {
    if (this.showModal) {
      this.modalService.open(this.modal, { ariaLabelledBy: 'modal-basic-title', ...this.styles }).result.then(() => {
        this.close.emit();
      }, () => this.close.emit());
    }
  }

  onClose = () => {
    this.modalService.dismissAll();
    this.close.emit();
  }

  onCancel = () => {
    this.modalService.dismissAll();
    this.cancel.emit();
  }

  onAccept = () => {
    this.modalService.dismissAll();
    this.accept.emit();
  }

}
