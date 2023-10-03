import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-foros',
  templateUrl: './menu-foros.component.html',
  styleUrls: ['./menu-foros.component.css']
})
export class MenuForosComponent {
  @Input() public juego: any
  @Output() descentForos = new EventEmitter();

  irADescentForos(){
    this.descentForos.emit();
  }
}
