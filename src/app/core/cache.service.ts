import { Injectable } from "@angular/core";
import { HttpRequest, HttpResponse } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class CacheService {

  get(req: HttpRequest<any>): HttpResponse<any> {
    // TODO: prefix the request
    const url = req.urlWithParams;
    const cachedResponse = JSON.parse(localStorage.getItem(url))
    if(!cachedResponse) {
      return null;
    }
    const expireDate = new Date(cachedResponse.expireDate)
    const isExpired = (Date.now() - expireDate.getTime()) > 0;
    if(isExpired) {
      return null;
    }
    const httpResponse = new HttpResponse(cachedResponse.response);
    return httpResponse;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    // TODO: prefix the request
    const url = /* cache-prefix */ req.urlWithParams;
    const entry = {url, response}
    localStorage.setItem(url, JSON.stringify(response));
  }
}