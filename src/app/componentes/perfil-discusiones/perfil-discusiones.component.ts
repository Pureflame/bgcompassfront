import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-perfil-discusiones',
  templateUrl: './perfil-discusiones.component.html',
  styleUrls: ['./perfil-discusiones.component.css']
})
export class PerfilDiscusionesComponent {
  @Input() public nombre: any


  constructor(){
  }
}
