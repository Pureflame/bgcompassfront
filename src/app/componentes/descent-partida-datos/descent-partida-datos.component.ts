import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/Services/current-user.service';

@Component({
  selector: 'app-descent-partida-datos',
  templateUrl: './descent-partida-datos.component.html',
  styleUrls: ['./descent-partida-datos.component.css']
})
export class DescentPartidaDatosComponent {

  public datosGeneralesActiva: boolean;
  public datosHeroeActiva: boolean;

  public solicitudGeneral: any;
  public solicitudHeroes: any;
  public solicitudListaMisiones: any;
  public solicitudListaCartasOverlord: any;
  
  public cartaAdd: string

  constructor(private router: Router, private currentUserService: CurrentUserService){
    this.solicitudGeneral = {
      nombrePartida: 'ejemplo',
      oro: 0,
      misionActual: 'mision3',
      arrayCartasOverlord: ['carta1', 'carta2', 'carta3', 'carta4']
    }
    this.solicitudListaMisiones = ['mision1', 'mision2', 'mision3']
    this.solicitudListaCartasOverlord = ['carta1', 'carta2', 'carta3', 'carta4', 'carta5', 'carta6', 'carta7', 'carta8', 'carta9']

    // Esto es un array (no solo uno como ahora) y cada heroe tiene cada uno de esos elementos
    this.solicitudHeroes = {
      nombreHeroe: '',
      claseheroe: '',
      habilidadesHeroe: [],
      equipamientoHeroe: []
    }

    this.datosGeneralesActiva = false;
    this.datosHeroeActiva = false;

    this.cartaAdd = "";
  }

  ngOnInit(){
    this.datosHeroeActiva = true;
  }

  general(){
    this.datosGeneralesActiva = true;
    this.datosHeroeActiva = false;
  }

  heroes(){
    this.datosGeneralesActiva = false;
    this.datosHeroeActiva = true;
  }
  volver(){
    this.router.navigate(['descent/partidas'])
  }

  quitarCarta(cartaIndex:number){
    console.log(cartaIndex)
    delete this.solicitudGeneral.arrayCartasOverlord[cartaIndex];
    console.log(this.solicitudGeneral.arrayCartasOverlord)
  }

  addCarta(){
    if(this.solicitudGeneral.arrayCartasOverlord.indexOf(this.cartaAdd) === -1){
      this.solicitudGeneral.arrayCartasOverlord.push(this.cartaAdd)
    }
  }

  editarGeneral(){
    console.log(this.solicitudGeneral.misionActual)
    console.log(this.cartaAdd)
  }

  confirmarEdicion(){
    // http
  }

  verHeroes(){
    this.datosGeneralesActiva = false;
    this.datosHeroeActiva = true;
  }

  volverADatosGenerales(){
    this.datosGeneralesActiva = true;
    this.datosHeroeActiva = false;
  }
}
