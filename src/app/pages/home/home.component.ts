import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService, Usuario } from '../../services/usuario.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Usuários</h1>

    <ul *ngIf="usuarios.length > 0; else carregando">
      <li *ngFor="let u of usuarios">
        <strong>{{ u.nome }}</strong> — Conta: {{ u.numeroConta }}
      </li>
    </ul>

    <ng-template #carregando>
      <p>Carregando usuários...</p>
    </ng-template>
  `,
})
export class HomeComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('HomeComponent iniciou');

    this.usuarioService.listar().subscribe({
      next: (dados) => {
        console.log('Usuários recebidos:', dados);
        this.usuarios = dados;

        // 🔥 ESSENCIAL no Angular 21 (zoneless)
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao carregar usuários');
      }
    });
  }
}

