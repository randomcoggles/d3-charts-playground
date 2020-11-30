import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
// import { CacheService } from "./cache.service";
import { of, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { CacheService } from "./cache.service";

@Injectable()
export class CacheInteceptor implements HttpInterceptor {
  constructor(private cacheService: CacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // : Observable<HttpEvent<any>> | Observable<any>
    const isCacheable = req.headers.get("cacheable");
    if (isCacheable) {
      const cachedResponse = this.cacheService.get(req);
      return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next);
    }
    return next.handle(req);
  }

  sendRequest(req: HttpRequest<any>, next: HttpHandler) {
    req.headers["normalizedNames"].delete("cacheable");
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheService.put(req, event);
        }
      })
    );
  }
}
