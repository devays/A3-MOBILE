import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

@Component({
  selector: 'app-detalhes',
  templateUrl: 'detalhes.page.html',
  styleUrls: ['detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  categoria?: Category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const categoriaId = this.route.snapshot.paramMap.get('categoriaId') ?? '';
    this.getCategoria(categoriaId);
  }

  getCategoria(categoriaId: string) {
    const url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    this.http.get<{ categories: Category[] }>(url).subscribe(
      // método subscribe é chamado para se inscrever na resposta da requisição HTTP
      (data) => {
        if (data && data.categories && data.categories.length > 0) {
          this.categoria = data.categories.find((cat) => cat.idCategory === categoriaId);
          if (!this.categoria) {
            // Categoria não encontrada, redireciona para a página principal.
            this.router.navigate(['/home']);
          }
        } else {
          // Categoria não encontrada, redireciona para a página principal.
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.log('Erro ao obter a categoria:', error);
        this.router.navigate(['/home']);
      }
    );
  }
}

