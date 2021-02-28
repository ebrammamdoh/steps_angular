import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http"; 
import { environment } from 'src/environments/environment';
import { Step } from "../models/steps.model";

@Injectable()
export class StepsService {

    url: string = `${environment.baseUrl}/steps`;

    constructor(private http: HttpClient) { }

    GetAll(): Observable<Step[]> {
        return this.http.get<Step[]>(`${this.url}`);
    }
    Create(): Observable<Step> {
        return this.http.post<Step>(`${this.url}`, {});
    };
    Delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.url}/${id}`);
    }
}