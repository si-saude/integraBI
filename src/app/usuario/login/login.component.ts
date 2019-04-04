import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../model/usuario.model';
import { GenericComponent } from '../../generic/generic-component';
import { NgModel } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends GenericComponent<Usuario> implements OnInit {
  constructor(private servico: UsuarioService, private router: Router, route: ActivatedRoute) {
    super(servico, router, route, '');
  }

  ngOnInit() {
    localStorage.clear();
  }

  check(chave: NgModel) {
    if (this.t.$chave) {
      chave.control.setErrors({required: true});
      this.servico.check(this.t.$chave).then(res => {
        this.servico.hideSpinner();
        const ret = res.json();
        if (ret === false) {
          chave.control.setErrors({required: true});
        } else if (ret === true) {
          chave.control.setErrors(null);
        }
      } ).catch(error => {
        this.catch(error);
      });
    }
  }

  autenticar() {
    this.servico.showSpinner();
    this.servico.autenticar(this.t).then(res => {
      this.servico.hideSpinner();
      const usuario = res.json();
      localStorage.setItem('userId', usuario.id);
      localStorage.setItem('token', usuario.token);
      localStorage.setItem('user', JSON.stringify(usuario));
      this.router.navigate(['/home']);
    } ).catch(error => {
      this.catch(error);
    });
  }
}
