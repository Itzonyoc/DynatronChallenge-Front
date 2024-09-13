import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root"
})
export class ApiService {
    private baseRoute: string;
    private headers: HttpHeaders;

    constructor(private httpClient: HttpClient) {
        this.baseRoute = 'https://localhost:7041/api/';
        this.headers = new HttpHeaders();
    }

    get route() {
      return this.baseRoute;
    }

	get<T>(route: string): Observable<T> {
        return this.httpClient.get<T>(`${this.baseRoute}${route}`, {
            headers: this.headers
        });
    }

    post<T>(route: string, payload: any = null): Observable<T> {
        return this.httpClient.post<T>(`${this.baseRoute}${route}`, payload, {
          headers: this.headers
        });
    }

    put<T>(route: string, payload: any = null): Observable<T> {
        return this.httpClient.put<T>(`${this.baseRoute}${route}`, payload, {
            headers: this.headers
        });
    }

    delete<T>(route: string): Observable<T> {
        return this.httpClient.delete<T>(`${this.baseRoute}${route}`, {
            headers: this.headers
        });
    }
}