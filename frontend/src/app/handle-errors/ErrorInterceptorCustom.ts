import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationServiceService } from '../services/navigation-service.service';

@Injectable()
export class ErrorInterceptorCustom implements HttpInterceptor {
  constructor(private navigationService: NavigationServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error en la conexión con el servidor.';

        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error del cliente: ${error.error.message}`;
          return throwError(() => new Error(error.message));
        }

        // Error del lado del servidor
        if (error.status === 0) {
          // Error de conexión (ERR_CONNECTION_REFUSED u otros)
          errorMessage = 'No se pudo conectar con el servidor.';
          console.log(errorMessage);
          this.navigationService.goToError()
          return throwError(() => new Error(error.message));
        }
        // Error del lado del servidor
        if (error.status === 0) {
          // Error de conexión (ERR_CONNECTION_REFUSED u otros)
          errorMessage = 'No se pudo conectar con el servidor.';
          return throwError(() => new Error(error.message));
        }
        if (error.status === 404) {
          // Error 404 (Not Found)
          errorMessage = 'No se encontró el contacto.';
          this.navigationService.goToList(); // Redirige al usuario a la página deseada (por ejemplo, la lista)
          return throwError(() => new Error(error.message));
        }
        errorMessage = `Error del servidor (${error.status}): ${error.message}`;
        return throwError(() => new Error(error.message));
      })
    );
  }
}
