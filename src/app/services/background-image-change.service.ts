import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundImageChangeService {

  constructor() { }
  getClassNameForImg(): string {
    return document.getElementById('mainContainer').getAttribute('setImg');
  }

}
