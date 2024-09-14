import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SearchResult } from 'src/app/model/search-result.model';
import { CustomerModel } from 'src/app/model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CRUDService {
  private baseUrl: string = 'customer';

  customer: CustomerModel = new CustomerModel(0, '', '', '', '1900-01-01', '1900-01-01');
  customers: CustomerModel[] = [];

  constructor(private api: ApiService) { }

  getData() {
    let promise = new Promise((resolve, reject) => {
      this.api.get<SearchResult>(`${this.baseUrl}/`).subscribe((res: any) => {
        if (res) {
          this.customers = [];
          this.customers = res.map((element: any) => {
            return new CustomerModel(
              element.id,
              element.first_name,
              element.last_name,
              element.email,
              element.created,
              element.last_updated
            );
          });
          resolve(1);
        } else {
          this.customers = [];
          resolve(0);
        }
      });
    });
    return promise;
  }

  postData() {
    let promise = new Promise((resolve, reject) => {
      this.api
        .post(`${this.baseUrl}`, this.customer)
        .subscribe((res: any) => {
          if (res) {
            resolve(1);
          } else {
            resolve(0);
          }
        });
    });
    return promise;
  }

  putData() {
    let promise = new Promise((resolve, reject) => {
      this.api
        .put(`${this.baseUrl}`, this.customer)
        .subscribe((res: any) => {
          if (res && res.data) {
            resolve(1);
          } else {
            resolve(0);
          }
        });
    });
    return promise;
  }

  deleteData(id: number) {
    let promise = new Promise((resolve, reject) => {
      this.api
        .delete(`${this.baseUrl}?id=${id}`)
        .subscribe((res: any) => {
          if (res && res.data) {
            resolve(1);
          } else {
            resolve(0);
          }
        });
    });
    return promise;
  }
}
