import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptorCustom implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error en la conexión con el servidor.';

        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error del cliente: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          if (error.status === 0) {
            // Error de conexión (ERR_CONNECTION_REFUSED u otros)
            errorMessage = 'No se pudo conectar con el servidor.';
          } else {
            errorMessage = `Error del servidor (${error.status}): ${error.message}`;
          }
        }

        console.error(errorMessage);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
