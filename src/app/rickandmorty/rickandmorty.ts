import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RickandmortyService } from './services/rickandmorty';

@Component({
  selector: 'app-rick-morty',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rickandmorty.html',
  styleUrls: ['./rickandmorty.css']
})

export class RickMortyComponent implements OnInit {  
  title = 'rickandmorty-web';
  rickandmortyForm: FormGroup;
  personajes: any[] = [];
  personajeData: any = null;
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private rickandmortyService: RickandmortyService) {
    this.rickandmortyForm = this.fb.group({
      id: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.obtenerPersonajes();
  }

  obtenerPersonajes() {
    this.loading = true;
    this.error = null;
    this.rickandmortyService.getCharacters().subscribe({
      next: (data) => {
        this.personajes = data.results.slice(0, 5);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar personajes';
        this.loading = false;
      }
    });
  }

  buscarPersonajeRickandMorty() {
    if (this.rickandmortyForm.invalid) {
      return;
    }
    const id = this.rickandmortyForm.value.id;
    this.loading = true;
    this.error = null;
    this.personajeData = null;
    this.rickandmortyService.getCharacterById(id).subscribe({
      next: (data) => {
        this.personajeData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se ha encontrado el personaje.';
        this.loading = false;
      }
    });
  }
}