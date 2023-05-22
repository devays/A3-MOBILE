import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisa',
  templateUrl: 'pesquisa.page.html',
  styleUrls: ['pesquisa.page.scss'],
})
export class PesquisaPage {
  resultados: any[] = []; 

  constructor(private router: Router) {}

  buscar(event: any) {
    const termo = event.target.value.trim();

    if (termo !== '') {
      this.resultados = [
        { id: 1, nome: 'Beef' },
        { id: 2, nome: 'Chicken' },
        { id: 3, nome: 'Dessert' },
        { id: 4, nome: 'Lamb' },
        { id: 5, nome: 'Miscellaneous' },
        { id: 6, nome: 'Pasta' },
        { id: 7, nome: 'Pork' },
        { id: 8, nome: 'Seafood' },
        { id: 9, nome: 'Side' },
        { id: 10, nome: 'Starter' },
        { id: 11, nome: 'Vegan' },
        { id: 12, nome: 'Vegetarian' },
        { id: 13, nome: 'Breakfast' },
        { id: 14, nome: 'Goat' }
      ].filter(resultado => resultado.nome.toLowerCase().startsWith(termo.toLowerCase()));
    } else {
      this.resultados = []; 
    }
  }

  abrirDetalhes(resultadoId: number) {
    this.router.navigate(['/detalhes', resultadoId]);
  }
}