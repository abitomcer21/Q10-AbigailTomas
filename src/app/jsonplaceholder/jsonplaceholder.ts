import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from './services/post';

@Component({
  selector: 'app-json-placeholder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jsonplaceholder.html',
  styleUrls: []
})
export class JsonPlaceholderComponent implements OnInit {
  postData = {
    title: '',
    body: '',
    userId: 1
  };
  response: any = null;
  cargando = false;

  constructor(
    private postService: PostService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  enviarPost() {
    if (!this.postData.title || !this.postData.body) {
      alert('Completa todos los campos');
      return;
    }
    
    this.cargando = true;
    this.response = null;
    
    this.postService.createPost(this.postData).subscribe({
      next: (res: any) => {
        this.response = res;
        this.cargando = false;
        this.cdr.detectChanges();  
        console.log('Post creado:', res);
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.cargando = false;
        this.cdr.detectChanges(); 
        alert('Error al crear el post');
      }
    });
  }

  limpiarFormulario() {
    this.postData = {
      title: '',
      body: '',
      userId: 1
    };
    this.response = null;
    this.cargando = false;
    this.cdr.detectChanges();  
  }
}