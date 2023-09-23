import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ROOT_EFFECTS } from './states/contact/effects/root.honorario-moroso.effects';
import { ROOT_REDUCERS } from './states/app.state';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PagesModule } from './pages/pages.module';
import { ErrorInterceptorCustom } from './handle-errors/ErrorInterceptorCustom';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeModule } from './prime.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(ROOT_REDUCERS, {}),
    EffectsModule.forRoot([...ROOT_EFFECTS]),
    StoreDevtoolsModule.instrument({ name:'App store' }),
    BrowserAnimationsModule,
    HttpClientModule,
    PagesModule,
    PrimeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorCustom,
      multi: true,
    },
    ConfirmationService, MessageService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule { }
