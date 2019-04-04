import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

// if(window.navigator.vendor.toLocaleLowerCase().includes('google')) {
  // alert('Acesse o sistema Integra Saúde por meio do navegador Firefox.')
// } else {
  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic().bootstrapModule(AppModule);
// }