import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';


@Component({
  standalone: false,
  selector: 'app-visualizar-anexo-pdf',
  templateUrl: './visualizar-anexo-pdf.component.html',
  styleUrls: ['./visualizar-anexo-pdf.component.css']
})
export class VisualizarAnexoPdfComponent implements OnInit {
  progress:number = 1;
  realizandoDownload:boolean = true;
  iniciandoDownload:boolean = false;
  totalArquivo:number = 0;
  urlExibir:any;
  public idArquivo: string;
  constructor(private http: HttpClient,private titleService: Title,  public sanitizer: DomSanitizer, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.idArquivo = params['id']);
   
    const url =  'http://localhost:8023/api/arquivos-oportunidade/visualizararquivo?id='+this.idArquivo;
     this.http.request(new HttpRequest (
      'GET',
      url,
      {
          reportProgress: true,
          responseType: 'blob'
      }
  )).subscribe((event:any)  => {

      if (event.type === HttpEventType.DownloadProgress) {
        if(event.total != null && this.totalArquivo < 1) {
          this.totalArquivo =  event.total;
        }

          this.progress = Math.round(100 * event.loaded / this.totalArquivo);
      } else if (event.type === HttpEventType.Response) {
          if(event.body != null ) {
            console.log(event.body instanceof Blob);
              const url = window.URL.createObjectURL(event.body);
                this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);

              this.realizandoDownload = false;
          }
      }
  });
  }

  url:string
  urlSafe: SafeResourceUrl;
  titulo:string = "";
  public blobUrl: SafeResourceUrl;
  ngOnInit(): void {
    if(this.titulo == "" && localStorage.getItem('tituloArquivoVisualizar_'+this.idArquivo) != null) {
      //this.titulo = localStorage.getItem('tituloArquivoVisualizar_'+this.idArquivo)
     }
    this.titleService.setTitle(this.titulo );
  }


}
