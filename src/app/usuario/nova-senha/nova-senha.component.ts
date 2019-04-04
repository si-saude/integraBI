import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericComponent } from '../../generic/generic-component';
import { Usuario } from '../../model/usuario.model';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.css']
})
export class NovaSenhaComponent extends GenericComponent<Usuario> implements OnInit {

  private _tokenEnviado:boolean = false;
  
  constructor(private servico:UsuarioService, private router : Router, route: ActivatedRoute) {
    super(servico, router, route, '');
   }

  ngOnInit() {
    localStorage.clear();
  }

  gerarToken(email: NgModel){
    if(email && email.control && email.control.valid){
      this.servico.showSpinner();
      this.servico.gerarToken(this.t).then(res => {
        this.servico.hideSpinner();
        this._tokenEnviado = res.json();
      }).catch(error => {
        this.servico.hideSpinner();
        this.servico.showMessage(error._body);
      });
    }
  }

  enviar(email: NgModel){
    if(email && email.control && email.control.valid){
      this.servico.showSpinner();
      this.servico.alterarSenha(this.t).then(res => {
        this.servico.hideSpinner();
        this.servico.showMessage("Senha alterada com sucesso.");
        this.router.navigate(['/login']);
      }).catch(error => {
        this.servico.hideSpinner();
        this.servico.showMessage(error._body);
      });
    }
  }

  checkEmail(email: NgModel){
    if(this.t.$email){
      this.servico.showSpinner();
      this.servico.checkEmail(this.t.$email).then(res => {
        this.servico.hideSpinner();
        if(res.json() == false)
          email.control.setErrors({genericError: "Email não cadastrado."});
      } ).catch(error => {
        this.servico.hideSpinner();
        email.control.setErrors({genericError: "Erro ao obter o e-mail."});
        this.servico.showMessage(error);
      });
    }
  }
}
