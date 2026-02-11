import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // URL de la API
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  // Método para hacer la petición POST
  createPost(postData: any): Observable<any> {
    return this.http.post(this.apiUrl, postData);
  }
}
