import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export  class UrlApiDinamicoService {
    public apiBaseUrl: string;

    constructor(protected http: HttpClient) {
        const browserUrl = window.location.origin;
        if (browserUrl.includes("http://localhost:5555")){

          this.apiBaseUrl = browserUrl.replace('http://localhost:5555', 'http://localhost:8023');
        }else if(browserUrl.includes("http://172.22.224.1:5555")){

          this.apiBaseUrl = browserUrl.replace('http://172.22.224.1:5555', 'http://localhost:8023');
        }
        else if(browserUrl.includes("http://10.20.4.97:5555")){
          this.apiBaseUrl = browserUrl.replace('http://10.20.4.97:5555', 'http://localhost:8023');

        }else if(browserUrl.includes("http://10.20.4.54:5555")){
          this.apiBaseUrl = browserUrl.replace('http://10.20.4.54:5555', 'http://localhost:8023');
        }else if(browserUrl.includes("http://10.20.4.54:5555")){
          this.apiBaseUrl = browserUrl.replace('http://10.20.4.54:5555', 'http://10.20.4.54:8023');
        }else if(browserUrl.includes("http://10.20.4.55:5555")){
          this.apiBaseUrl = browserUrl.replace('http://10.20.4.55:5555', 'http://10.20.4.55:8023');
        }else if(browserUrl.includes("http://10.20.4.91:5555")){
          this.apiBaseUrl = browserUrl.replace('http://10.20.4.91:5555', 'http://10.20.4.91:8023');
        }
    }
}
/**  ➜  Local:   http://localhost:5555/
  ➜  Network: http://10.20.4.54:5555/
  ➜  Network: http://172.16.24.106:5555/
  ➜  Network: http://172.22.224.1:5555/ */