import { Control} from 'ol/control';

export class MapControl extends Control {
  button;
    constructor() {
        super({});

        this.button = document.createElement('button');
        this.button.innerHTML = 'Lisa Marker';
        this.button.className = 'btn btn-secondary';

        const element = document.createElement('div');
        element.className = 'mt-3 pt-5 pl-2';
        element.appendChild(this.button);

        Control.call(this, {
            element: element
        });

        this.button.addEventListener('click', this.setMode.bind(this), false);
    }

    setMode(): void{
        if (super.getMap().get('customMode') === 'add'){
          this.button.innerHTML = 'Eemalda Marker';
          super.getMap().set('customMode', 'remove');
        }
        else{
          this.button.innerHTML = 'Lisa Marker';
          super.getMap().set('customMode', 'add');
        }
    }
}
