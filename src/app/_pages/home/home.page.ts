import { Component, ViewChild } from '@angular/core';

import { AuthenticationService, ApiService } from '_services/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '_environment';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('ngFormDirective') formDirective;
  form: FormGroup;
  submitAttempt: boolean;
  currentlySubmitting: boolean;
  public env: any;
  public multiple: any = [];
  public events: any = {};

  constructor(
    private formBuilder: FormBuilder,
    public apiService: ApiService,
    public authService: AuthenticationService,
  ) {
    this.form = this.formBuilder.group({
      start: [''],
      end: [''],
      queues: ['1'],
    });
    this.env = environment;
  }

  ngOnInit() {
    // this.getMultiple();
    this.getEvents();
    // this.sendMultiple();
  }

  async doLogin() {
    await this.authService.login();
  }

  sendMultiple() {
    this.apiService.sendMultiple({foo: 42});
  }

  getMultiple() {
    console.log('getMultiple called');
    this.apiService.getMultiple()
    .subscribe(res => {
      console.log('res:', res);
      this.multiple.push(`res: ${res.arg}`);
    });
  }

  getEvents() {
    this.apiService.getEvents()
    .subscribe(res => {
      console.log('res', res);
      if (res.hasOwnProperty('search')) {
        this.pushEvent(res);
      }
    });
  }

  pushEvent(event) {
    if (!this.events.hasOwnProperty(event.search)) {
      this.events[event.search] = {};
    }
    if (!this.events[event.search].hasOwnProperty(event.queue)) {
      this.events[event.search][event.queue] = {};
    }
    this.events[event.search][event.queue] = {
      status: event.status,
      id: event.id,
    };
  }

  toString(obj) {
    return JSON.stringify(obj);
  }

  submit() {
    console.log(this.form.value);
  }

}
