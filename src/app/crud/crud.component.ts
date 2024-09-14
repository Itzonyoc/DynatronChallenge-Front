import { Component, OnInit } from '@angular/core';
import { CRUDService } from 'src/service/crud.service';
import { CustomerModel } from '../model/customer.model';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2'

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
        if (localStorage['selected']) {
          if (this._crud.customers.find(t => t.id === Number(localStorage['selected']))) {
            let item = this._crud.customers.find(t => t.id === Number(localStorage['selected']));
            item!.selected = true;
          }
        }
      });
  }

  save() {
    this.hide('exampleModal')
    if (this._crud.customer.id > 0) {
      this._crud.putData()
        .then((result) => {
          this._crud.getData()
            .then(() => {
              Swal.fire({
                title: 'Successful',
                icon: 'success',
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading()
                },
              })
            });
        });
    } else {
      this._crud.postData()
        .then((result) => {
          this._crud.getData()
            .then(() => {
              Swal.fire({
                title: 'Successful',
                icon: 'success',
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading()
                },
              })
            });
        });
    }
  }

  delete(item: CustomerModel) {
    Swal.fire({
      title: 'Delete Customer',
      text: 'Are you sure you want to delete this item?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this._crud.deleteData(item.id)
          .then((result) => {
            this._crud.getData()
              .then(() => {
                Swal.fire({
                  title: 'Successful',
                  icon: 'success',
                  timer: 1000,
                  timerProgressBar: true,
                  didOpen: () => {
                    Swal.showLoading()
                  },
                })
              });
          });
      }
    });
  }

  select(item: CustomerModel) {
    this._crud.customers.forEach(element => {
      element.selected = false;
    });
    localStorage['selected'] = item.id;
    item.selected = true;
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
