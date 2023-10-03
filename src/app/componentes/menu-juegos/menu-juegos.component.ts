import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-juegos',
  templateUrl: './menu-juegos.component.html',
  styleUrls: ['./menu-juegos.component.css']
})
export class MenuJuegosComponent {
  @Input() public juego: any
  @Output() descentPartidas = new EventEmitter();

  irADescentPartidas(){
    this.descentPartidas.emit();
  }
}
