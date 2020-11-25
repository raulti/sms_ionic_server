import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';
import { HomeService } from './home.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  numero;
  countLoop = 0;
  numeroFalhas = 0;
  time = 7000;

  constructor(
    private sms: SMS,
    private _homeService: HomeService,
    private backgroundMode: BackgroundMode,
    private cd: ChangeDetectorRef
  ) {
    this.numero = 62999238661;
  }

  ngOnInit() {
    console.log(["SEGUNDO PLANO => ", this.backgroundMode.isActive()]);
    this.loopDeEnvios()
  }

  envioTeste(numero) {
    console.log('Envio de Teste');
    let sms = { to: numero, msg: "Olá mundo :)" }
    this.enviarSms(sms);
    this.loopDeEnvios();
  }

  loopDeEnvios() {
    (async () => {
      var i = 1;
      while (await new Promise(resolve => setTimeout(() => resolve(i++), this.time)) >= this.countLoop) {
        this.countLoop++;
        this.cd.detectChanges();
        console.log("=> " + this.countLoop);
        this.sendSms();
      }
    })();
  }

  sendSms() {
    this._homeService.getSms().subscribe((result: any) => {
      console.log(result);
      if (result) {
        this.time = 7000
        this.enviarSms(result);
      } else {
        this.countLoop = 0;
        this.numeroFalhas = 0;
        this.time = 100000
      }
    });
  }

  enviarSms(sms) {
    this.sms.send(sms.to.toString(), sms.msg)
      .then(() => {
        console.log("Sms enviado");
      }).catch((error) => {
        this.numeroFalhas++;
        this.enviarEmailAlertaDeFalhas();
        this.salvarLogErro(sms);
        console.log("Erro no envio do sms", error);
      });
  }

  enviarEmailAlertaDeFalhas() {
    if (this.numeroFalhas == 10 || this.numeroFalhas == 50 || this.numeroFalhas == 100) {
      let email = { numeroFalhas: this.numeroFalhas };
      console.log('enviarEmailAlertaDeFalhas');
      this._homeService.sendEmail(email).subscribe((result: any) => {
      });
    }
  }

  salvarLogErro(sms) {
    console.log('salvarLogErro');
    this._homeService.salvarSms(sms).subscribe((result: any) => {
    });
  }
}