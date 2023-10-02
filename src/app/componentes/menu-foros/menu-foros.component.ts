import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-foros',
  templateUrl: './menu-foros.component.html',
  styleUrls: ['./menu-foros.component.css']
})
export class MenuForosComponent {
  @Input() public juego: any
}
