import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/Services/current-user.service';
import { DescentPartidaService } from 'src/app/Services/descentPartida.service';

@Component({
  selector: 'app-descent-partida-datos',
  templateUrl: './descent-partida-datos.component.html',
  styleUrls: ['./descent-partida-datos.component.css']
})
export class DescentPartidaDatosComponent {

  public datosGeneralesActiva: boolean;
  public datosHeroeActiva: boolean;

  public solicitudAux: any
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

  constructor(
    private router: Router, 
    private currentUserService: CurrentUserService,
    private descentPartidaService: DescentPartidaService){

    this.solicitudAux = {}
    this.solicitudGeneral = []
    this.solicitudListaMisiones = []
    this.solicitudListaCartasOverlord = []
    this.solicitudHeroes = []
/*
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
*/
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
    //console.log(this.descentPartidaService.getPartidaActualDescent())



    this.descentPartidaService.listarMisionesDescent().
    subscribe({
      next: (result)=>{

        let counter = 0
        while(result.data[counter] !== undefined){
          this.solicitudListaMisiones[counter] = result.data[counter]; 
          counter++;
        }
        //console.log(this.solicitudListaMisiones)
        counter = 0;
      },
      error: (error)=>{console.log(error)}
    })
  
    this.descentPartidaService.listarCartasDescent().
    subscribe({
      next: (result)=>{

        let counter = 0
        while(result.data[counter] !== undefined){
          this.solicitudListaCartasOverlord[counter] = result.data[counter]; 
          counter++;
        }
        //console.log(this.solicitudListaCartasOverlord)
        counter = 0;
      },
      error: (error)=>{console.log(error)}
    })

    this.descentPartidaService.verGeneralPartidaDescent(
      this.descentPartidaService.getPartidaActualDescent(),
      this.currentUserService.getCurrentUserToken()!
    ).subscribe({
      next: (result)=>{

        let counter = 0
        while(result.data[counter] !== undefined){
          this.solicitudGeneral[counter] = result.data[counter]; 
          counter++;
        }
        //console.log(this.solicitudGeneral)
        counter = 0;
        //console.log(this.solicitudGeneral[2])
      },
      error: (error)=>{console.log(error)}
    })

    this.descentPartidaService.verHeroePartidaDescent(
      this.descentPartidaService.getPartidaActualDescent(),
      this.currentUserService.getCurrentUserToken()!
    ).subscribe({
      next: (result)=>{
        console.log(result.data[0])
        console.log(result.data[1])
        let counter = 0
        while(result.data[counter] !== undefined){
          this.solicitudHeroes[counter] = result.data[counter]; 
          counter++;
        }
        //console.log(this.solicitudHeroes)
        counter = 0;
        //console.log(this.solicitudHeroes[2])
      },
      error: (error)=>{console.log(error)}
    })
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
    
    //console.log(cartaIndex)
    //delete this.solicitudGeneral.arrayCartasOverlord[cartaIndex];
    this.solicitudGeneral[3].splice(cartaIndex,1)
    console.log(this.solicitudGeneral[3])
  }

  addCarta(){
    if(this.solicitudGeneral[3].indexOf(this.cartaAdd) === -1){
      this.solicitudGeneral[3].push(this.cartaAdd)
    }
  }

  editarGeneral(){
    console.log(this.solicitudGeneral[2])
    console.log(this.cartaAdd)
  }

  confirmarEdicion(){
    
    this.solicitudAux = {
      nombre_partida: this.solicitudGeneral[0],
      oro: this.solicitudGeneral[1],
      nombre_mision_dc: this.solicitudGeneral[2],
      cartasOverlord: this.solicitudGeneral[3],
    }

    this.descentPartidaService.actualizarGeneralPartidaDescent(this.solicitudAux,
      this.descentPartidaService.partidaActualDescent,
      this.currentUserService.getCurrentUserToken()!
    )
    .subscribe({
      next: (result)=>{
        console.log("Actualizado correctamente")
      },
      error: (error)=>{console.log(error)}
    })
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
