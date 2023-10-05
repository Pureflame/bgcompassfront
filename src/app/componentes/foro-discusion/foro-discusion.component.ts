import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foro-discusion',
  templateUrl: './foro-discusion.component.html',
  styleUrls: ['./foro-discusion.component.css']
})
export class ForoDiscusionComponent {
  //@Input() public nombre: any
  @Input() public mensajes: any

  constructor(private router: Router){
  }


  crearMensaje(){
    this.router.navigate(['foros/mensaje/crear'])
  }
}
