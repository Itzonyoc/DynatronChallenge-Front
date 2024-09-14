import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { CRUDService } from 'src/service/crud.service';
import { CustomerModel } from '../model/customer.model';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CRUDComponent implements OnInit {
  public _modal: { name: string, modal: bootstrap.Modal }[] = [];

  constructor(
    public _crud: CRUDService
  ) {
  }

  ngOnInit() {
    this._crud.getData()
      .then(() => {
      });
  }

  save() {
    this.hide('exampleModal')
    if (this._crud.customer.id > 0) {
      this._crud.putData()
        .then((result) => {
          this._crud.getData()
            .then(() => {
            });
        });
    } else {
      this._crud.postData()
        .then((result) => {
          this._crud.getData()
            .then(() => {
            });
        });
    }
  }

  delete(item: CustomerModel) {
    this._crud.deleteData(item.id)
      .then((result) => {
        this._crud.getData()
          .then(() => {
          });
      });
  }

  open(modal: string, item?: CustomerModel) {
    if (item)
      this._crud.customer = item;
    else
      this._crud.customer = new CustomerModel(0, '', '', '', '1900-01-01', '1900-01-01');

    if (this._modal.some(t => t.name === modal)) {
      this._modal.find(t => t.name === modal)!.modal.show();
    } else {
      const _modal = new bootstrap.Modal(document.getElementById(modal)!);
      this.addModal({ name: modal, modal: _modal });
      _modal.show();
    }
  }

  private addModal(modal: { name: string, modal: bootstrap.Modal }) {
    if (!this._modal.some(t => t.name === modal.name)) {
      this._modal.push(modal);
    }
  }

  hide(modal: string) {
    if (this._modal.some(t => t.name === modal)) {
      this._modal.find(t => t.name === modal)!.modal.hide();
    }
  }

}
