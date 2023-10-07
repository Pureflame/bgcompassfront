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
  public solicitudListaMisiones: any;
  public solicitudListaCartasOverlord: any;

  public solicitudHeroes: any;
  public solicitudListaHabilidades: any;
  public solicitudListaEquipamiento: any;
  public solicitudListaHeroes: any;

  public cartaAdd: string
  public itemAdd: string
  public habilidadAdd: string

  constructor(private router: Router, private currentUserService: CurrentUserService){
    this.solicitudGeneral = {
      nombrePartida: 'ejemplo',
      oro: 0,
      misionActual: 'mision3',
      arrayCartasOverlord: ['carta1', 'carta2', 'carta3', 'carta4']
    }
    this.solicitudListaMisiones = ['mision1', 'mision2', 'mision3']
    this.solicitudListaCartasOverlord = ['carta1', 'carta2', 'carta3', 'carta4', 'carta5', 'carta6', 'carta7', 'carta8', 'carta9']

    this.solicitudHeroes = [
      {
        nombreHeroe: "heroe1",
        equipamientoHeroe: ['espada1','casco1'],
        habilidadesHeroe: ['habilidad1', 'habilidad2', 'habilidad3']
      },
      {
        nombreHeroe: "heroe2",
        equipamientoHeroe: ['espada2','casco2'],
        habilidadesHeroe: ['habilidad4', 'habilidad5', 'habilidad6']
      },
    ]

    this.solicitudListaEquipamiento = ['espada1','casco1', 'espada2','casco2']
    this.solicitudListaHabilidades = ['habilidad1', 'habilidad2', 'habilidad3', 'habilidad4', 'habilidad5', 'habilidad6']
    this.solicitudListaHeroes = ['heroe1','heroe2', 'heroe3','heroe4']
      
    this.datosGeneralesActiva = false;
    this.datosHeroeActiva = false;

    this.cartaAdd = "";
    this.itemAdd = "";
    this.habilidadAdd = "";
  }

  ngOnInit(){
    this.datosGeneralesActiva = true;
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
    //delete this.solicitudGeneral.arrayCartasOverlord[cartaIndex];
    this.solicitudGeneral.arrayCartasOverlord.splice(cartaIndex,1)
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

  addItem(i:number){
    if(this.solicitudHeroes[i].equipamientoHeroe.indexOf(this.itemAdd) === -1){
      this.solicitudHeroes[i].equipamientoHeroe.push(this.itemAdd)
    }
  }

  quitarItem(itemIndex:number, i:number){
    console.log(itemIndex)
    //delete this.solicitudHeroes[i].equipamientoHeroe[itemIndex];
    this.solicitudHeroes[i].equipamientoHeroe.splice(itemIndex,1)
    console.log(this.solicitudHeroes[i].equipamientoHeroe)
  }

  addHabilidad(i:number){
    if(this.solicitudHeroes[i].habilidadesHeroe.indexOf(this.habilidadAdd) === -1){
      this.solicitudHeroes[i].habilidadesHeroe.push(this.habilidadAdd)
    }
  }

  quitarHabilidad(habilidadIndex:number, i:number){
    console.log(habilidadIndex)
    //delete this.solicitudHeroes[i].habilidadesHeroe[habilidadIndex];
    this.solicitudHeroes[i].habilidadesHeroe.splice(habilidadIndex,1)
    console.log(this.solicitudHeroes[i].habilidadesHeroe)
  }

  crearHeroe(){
    if(this.solicitudHeroes.length < 4){
      let heroeDefault = {
        nombreHeroe: "heroe1",
        equipamientoHeroe: ['espada1'],
        habilidadesHeroe: ['habilidad1']
      }
      this.solicitudHeroes.push(heroeDefault)
      console.log(this.solicitudHeroes)
    }
  }

  borrarHeroe(i:number){
    //delete this.solicitudHeroes[i];
    this.solicitudHeroes.splice(i,1)
    console.log(this.solicitudHeroes)
  }

  confirmarEditHeroes(){
    //http
  }
}
