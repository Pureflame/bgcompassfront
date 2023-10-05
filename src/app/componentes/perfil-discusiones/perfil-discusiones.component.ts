import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-discusiones',
  templateUrl: './perfil-discusiones.component.html',
  styleUrls: ['./perfil-discusiones.component.css']
})
export class PerfilDiscusionesComponent {
  @Input() public discusion: any
  @Input() public rutaNombreJuego: any
  @Output() discusionChat = new EventEmitter();

  constructor(private router: Router){
  }

  ngOnInit(){
    this.rutaNombreJuego = "descent";
  }

  /*
  verDatos(){
    this.router.navigate(['foros/discusion'])
  }
  */
  discusionIrChat(discusion:string){
    this.discusionChat.emit(discusion)
  }


}