import {Location as URL} from '@angular/common';
import { Control} from 'ol/control';


export class BackControl extends Control {
  button;
    constructor(private location: URL) {
        super({});

        this.button = document.createElement('button');
        this.button.innerHTML = 'Salvesta ja mine tagasi';
        this.button.className = 'btn btn-info';

        const element = document.createElement('div');
        element.className = 'fixed-bottom mb-2 ml-2';
        element.appendChild(this.button);

        Control.call(this, {
            element: element
        });

        this.button.addEventListener('click', this.backClicked.bind(this), false);
    }
    backClicked(): void{
      this.location.back();
    }
}
