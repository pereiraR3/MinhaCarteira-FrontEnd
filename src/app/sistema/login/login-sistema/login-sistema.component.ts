import { Component, OnInit } from '@angular/core';
import { Autenticacao } from './autenticacao.model';
import { Md5 } from 'ts-md5';
import { AutorizacaoService } from './autorizacao.service';
import { AutenticacaoService } from './autenticacaoService.service';
import { AccessToken } from './access-token.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';

@Component({
  standalone:false,
  selector: 'app-login-sistema',
  templateUrl: './login-sistema.component.html',
  styleUrl: './login-sistema.component.scss'
})
export class LoginSistemaComponent  implements OnInit {

  loginForm!: UntypedFormGroup;
  submitted = false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private autenticacaoService: AutenticacaoService,
    private autorizacaoService: AutorizacaoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService ){
        document.body.classList.add('bg-white');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bg-white');    
  }
  public showPassword: boolean = false;
  toggleClass = 'ri-eye-off-line';

  public togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.toggleClass === 'ri-eye-line') {
      this.toggleClass = 'ri-eye-off-line';
    } else {
      this.toggleClass = 'ri-eye-line';
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
          return;
    } else {
          const autenticacao: Autenticacao = new Autenticacao();
          autenticacao.tipo = "portal"
          autenticacao.username = 'password';
          autenticacao.username = this.f.email.value;
          autenticacao.password = Md5.hashStr(this.f.password.value).toString();
          this.autenticacaoService.autenticar(autenticacao ).then( (accessToken: any) => {
            accessToken = new AccessToken().deserialize(accessToken);
            this.autorizacaoService.iniciarSessao(accessToken);

          this.router.navigate(['/ks-portal/oportunidades']);
          }).catch((param: any) =>{
            console.log(param);
              this.toastrService.error(param,'Autenticação', {
                    timeOut: 3000,
                    positionClass: 'toast-top-right',
              });
          }); 
    }
  }
}

