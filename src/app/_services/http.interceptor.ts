import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Observable, throwError } from "rxjs";
import { catchError, map, retry } from "rxjs/operators";
import { LocalstorageService } from './local-storage.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        private localstorageService: LocalstorageService,
        private router: Router,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.localstorageService.getToken();

        if (token && !request.headers.has('Bearer')) {
            request = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + token),
            });
        }

        if (
            request.url.toLocaleLowerCase().endsWith('updatereport') ||
            request.url.toLocaleLowerCase().endsWith('updatereportimportlogo') 
        ) {
            // TODO: Tricky stuff, uploading files
        } else {
            if (!request.headers.has('Content-Type')) {
                request = request.clone({
                    headers: request.headers.set('Content-Type', 'application/json'),
                });
            }
        }

        if (!request.headers.has('Accept')) {
            request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        }
        
        if (!request.headers.has('Access-Control-Allow-Origin')) {
            request = request.clone({
                headers: request.headers.set('Access-Control-Allow-Origin', '*'),
            });
        }

        return next.handle(request).pipe(
            retry(2),
            catchError((error: HttpErrorResponse) => {
                this.ErrorHandler(error);

                return throwError(error);
            })
        );
    }

    ErrorHandler(event: any) {
        if (!navigator.onLine) {
            this.toastInfos();
            return throwError(event);
            // return false; //errors.pipe(switchMap(err => throwError(err)));
        } else {
            if (event instanceof HttpErrorResponse) {
                if (event.status !== 401) {
                    // 401 handled in auth.interceptor.
                    console.log('rrr', event);
                    switch (event['status']) {
                        case 0:
                            this.toastDanger('Back-end server is not accessible, retry later!');
                            break;
                        case -1:
                            this.toastDanger('Server request is timed out, retry later!');
                            break;
                        case 404:
                            this.toastDanger('Requested resource is unvailable!');
                            break;
                        default:
                            switch (event['type']) {
                                case 0:
                                    this.toastDanger(
                                        'Back-end server is not accessible, retry later! mmm'
                                    );
                                    break;
                                case -1:
                                    this.toastDanger('Server request is timed out, retry later!');
                                    break;
                                default:
                                    this.toastDanger(event.statusText);
                            }
                    }
                }
            }
        }
    }

    public toastInfos() {
        // this.toastrService.show('Please, check your internet connection!', `You're offline`, {
        //     status: 'danger',
        //     destroyByClick: true,
        //     duration: 10000,
        //     hasIcon: true,
        //     icon: 'flash-off-outline',
        //     iconPack: 'eva',
        //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
        //     preventDuplicates: true,
        //     limit: 3,
        // });
    }
    public toastDanger(message: string) {
        // this.toastrService.show(message, `Something went wrong.`, {
        //     status: 'danger',
        //     destroyByClick: true,
        //     duration: 10000,
        //     hasIcon: true,
        //     icon: 'flash-off-outline',
        //     iconPack: 'eva',
        //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
        //     preventDuplicates: true,
        //     limit: 3,
        // });
    }
}
