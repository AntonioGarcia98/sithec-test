import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less'],
})
export class LandingComponent implements OnInit {
  public errorTestError: string ="";
  public errorTestForbidden: string="";
  public errorTestSuccess: string="";
  public errorTestNotFound: string="";
  public errorTestSintax: string="";
  public errorTestUri: string="";

  constructor(private apiService: ApisService) {}

  ngOnInit(): void {
    console.log(this.errorTestError)
  }

  apiCallTestError() {
    this.apiService
      .apiTestError()
      .pipe()
      .subscribe(
        (info) => {},
        ({ message }: any) =>
          (this.errorTestError = JSON.parse(JSON.stringify(message)))
      );
  }

  apiCallForbidden() {
    this.apiService
      .apiTestForbidden()
      .pipe()
      .subscribe(
        (info) => {},
        ({ message }: any) =>
          (this.errorTestForbidden = JSON.parse(JSON.stringify(message)))
      );
  }

  apiCallSuccess() {
    this.apiService
      .apiTestSuccess()
      .pipe()
      .subscribe(
        (info) => { this.errorTestSuccess = JSON.parse(JSON.stringify(info))},
        ({ message }: any) =>
          (this.errorTestSuccess = JSON.parse(JSON.stringify(message)))
      );
  }

  apiTestNotFound() {
    this.apiService
      .apiTestNotFound()
      .pipe()
      .subscribe(
        (info) => {},
        ({ message }: any) =>
          (this.errorTestNotFound = JSON.parse(JSON.stringify(message)))
      );
  }

  localErrorSintaxError() {
    try {
      throw new SyntaxError('Sintax');
    } catch (error) {
     this.errorTestSintax =error;
    }
  }

  localErrorUriError() {
    try {
      throw new URIError('URI');
    } catch (error) {
      console.log(error)
      this.errorTestUri = error;
    }
  }

  restart(){
    this.errorTestError="";
    this.errorTestForbidden="";
    this.errorTestSuccess="";
    this.errorTestNotFound="";
    this.errorTestSintax="";
    this.errorTestUri="";
  }
}
