import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GuardService } from './../guard/guard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private init = false;
  private showMenu = false;

  constructor(private router: Router, private guardService: GuardService) {

  }

  ngOnInit() {
    this.router.routerState.snapshot.url = '';
  }

  checkCadastro(funcionalidade): boolean {
    return this.guardService.checkCadastro(funcionalidade);
  }

  toggleSidebar() {
    this.showMenu = !this.showMenu;
    document.getElementById('sidebar').style.left = this.showMenu ? '0%' : '-18%';
  }

  goToPrincipal() {
    document.getElementById('principal').style.display = '';
    document.getElementById('cadastro').style.display = 'none';
  }

  goToCadastro() {
    document.getElementById('principal').style.display = 'none';
    document.getElementById('cadastro').style.display = '';
  }

  logout() {
    localStorage.clear();
    this.guardService.clear();
    this.router.navigate(['/login']);
  }
}
