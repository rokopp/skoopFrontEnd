import { Control} from 'ol/control';

export class GPSControl extends Control {
  button;
    constructor() {
        super({});

        this.button = document.createElement('button');
        this.button.innerHTML = 'Center: On';
        this.button.className = 'btn btn-info toggle"';

        const element = document.createElement('div');
        element.className = 'fixed-bottom mt-3 pt-5 pl-2';
        element.appendChild(this.button);

        Control.call(this, {
            element: element
        });

        this.button.addEventListener('click', this.setMode.bind(this), false);
    }

    setMode(): void{
        if (super.getMap().get('GPSMode') === 'on'){
          this.button.innerHTML = 'Center: Off';
          super.getMap().set('GPSMode', 'off');
        }
        else{
          this.button.innerHTML = 'Center: On';
          super.getMap().set('GPSMode', 'on');
        }
    }
}
