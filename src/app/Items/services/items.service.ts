import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http"; 
import { environment } from 'src/environments/environment';
import { Item } from "../models/item.model";

@Injectable()
export class ItemsService {

    url: string = `${environment.baseUrl}/items`;

    constructor(private http: HttpClient) { }

    GetAllSteps(): Observable<number[]> {
        return this.http.get<number[]>(`${this.url}/Steps`);
    }
    GetItemByStep(stepNumber: number): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.url}/${stepNumber}`);
    }
    Create(obj: Item): Observable<Item> {
        return this.http.post<Item>(`${this.url}`, obj);
    };
    Update(obj: Item): Observable<boolean> {
        return this.http.put<boolean>(`${this.url}`, obj);
    };
    Delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.url}/${id}`);
    }
    DeleteStep(stepNumber: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.url}/Steps/${stepNumber}`);
    }
}