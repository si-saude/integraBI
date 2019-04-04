import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { appRoutes } from './router';

import { ControllerModule } from './controller/controller.module';
import { ServiceModule } from './service/service.module';
import { GuardModule } from './guard/guard.module';
import { AppComponent } from './app.component';
import { ConfirmService } from './util/confirm/confirm.service';
import { DialogService } from './util/dialog/dialog.service';
import { SpinnerService } from './util/spinner/spinner.service';
import { WizardService } from './util/wizard-service/wizard-service.service';

import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './usuario/login/login.component';
import { NovaSenhaComponent } from './usuario/nova-senha/nova-senha.component';
import { MenuOptionComponent } from './include/generic/menu-option/menu-option.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsuarioComponent,
    LoginComponent,
    NovaSenhaComponent,
    MenuOptionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    GuardModule,
    ServiceModule,
    ControllerModule
  ],
  exports: [
    HttpModule,
    RouterModule
  ],
  providers: [
    FormBuilder,
    ConfirmService,
    DialogService,
    SpinnerService,
    WizardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
