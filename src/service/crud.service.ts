import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SearchResult } from 'src/app/model/search-result.model';
import { CustomerModel } from 'src/app/model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CRUDService {
  private baseUrl: string = 'crud';

  customer: CustomerModel = new CustomerModel(0, '', '', '', '', '');
  customers: CustomerModel[] = [];

  constructor(private api: ApiService) {}

  getData() {
    let promise = new Promise((resolve, reject) => {
      this.api.get<SearchResult>(`${this.baseUrl}/`).subscribe((res: any) => {
        if (res && res.data) {
          this.customers = [];
          this.customers = res.data.map((element: any) => {
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
        .post(`${this.baseUrl}/postCustomer`, this.customer)
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

  putData() {
    let promise = new Promise((resolve, reject) => {
      this.api
        .put(`${this.baseUrl}/putCustomer`, this.customer)
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

  deleteData() {
    let promise = new Promise((resolve, reject) => {
      this.api
        .put(`${this.baseUrl}/deletetCustomer`, this.customer)
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
