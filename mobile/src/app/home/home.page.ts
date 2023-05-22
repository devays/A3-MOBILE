import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { HttpClient } from '@angular/common/http';

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  categorias: { id: string, nome: string, imagem: string, descricao: string }[] = [];

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    const categoriasOffline = this.localStorageService.getItem('categorias');

    if (categoriasOffline) {
      this.categorias = categoriasOffline;
    } else {
      this.http.get<{ categories: { idCategory: string, strCategory: string, strCategoryThumb: string, strCategoryDescription: string }[] }>('https://www.themealdb.com/api/json/v1/1/categories.php').subscribe(
        (data) => {
          this.categorias = data.categories.map(category => ({ id: category.idCategory, nome: category.strCategory, imagem: category.strCategoryThumb, descricao: category.strCategoryDescription }));
      
          console.log('Categorias obtidas:', this.categorias);

          this.localStorageService.setItem('categorias', this.categorias);
        },
        (error) => {
          console.log('Erro ao obter as categorias:', error);
        }
      );
    }
  }

  abrirDetalhes(categoriaId: string) {
    this.router.navigate(['/detalhes', categoriaId]);
  }

  irParaPesquisa() {
    this.router.navigate(['/pesquisa']);
  }
}