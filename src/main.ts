import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { SharedModule } from './app/shared/shared.module';

/*
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
*/

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
        provideHttpClient(),
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(SharedModule)
  ]
}).catch(err => console.error(err));


