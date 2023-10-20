import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
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

  public soyAdmin: boolean;
  public soyUsuario: boolean;

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
    this.solicitudListaEquipamiento = []
    this.solicitudListaHabilidades = []
    this.solicitudListaHeroes = []
      
    this.datosGeneralesActiva = false;
    this.datosHeroeActiva = false;

    this.soyAdmin = false;
    this.soyUsuario = false;

    this.cartaAdd = "";
    this.itemAdd = "";
    this.habilidadAdd = "";
  }

  ngOnInit(){
    this.datosGeneralesActiva = true;

    if(this.currentUserService.getCurrentUserType() === "administrador"){
      this.soyUsuario = false;
      this.soyAdmin = true;
    } else {
      this.soyUsuario = true;
      this.soyAdmin = false;
    }


    //console.log(this.descentPartidaService.getPartidaActualDescent())


    // LISTA DE MISIONES
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

    // LISTA DE CARTAS
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

    // DATOS GENERALES DE LA PARTIDA
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


    // LISTA DE HEROES
    this.descentPartidaService.listarHeroesDescent().
    subscribe({
      next: (result)=>{

        let counter = 0
        while(result.data[counter] !== undefined){
          this.solicitudListaHeroes[counter] = result.data[counter]; 
          counter++;
        }
        console.log(this.solicitudListaHeroes)
        counter = 0;
      },
      error: (error)=>{console.log(error)}
    })

    // LISTA DE EQUIPO
    this.descentPartidaService.listarEquipoDescent().
    subscribe({
      next: (result)=>{

        let counter = 0
        while(result.data[counter] !== undefined){
          this.solicitudListaEquipamiento[counter] = result.data[counter]; 
          counter++;
        }
        //console.log(this.solicitudListaEquipamiento)
        counter = 0;
      },
      error: (error)=>{console.log(error)}
    })

    // LISTA DE HABILIDADES
    this.descentPartidaService.listarHabilidadesDescent().
    subscribe({
      next: (result)=>{

        let counter = 0
        while(result.data[counter] !== undefined){
          this.solicitudListaHabilidades[counter] = result.data[counter]; 
          counter++;
        }
        //console.log(this.solicitudListaHabilidades)
        counter = 0;
      },
      error: (error)=>{console.log(error)}
    })
    
    // LISTA DE HEROES DE LA PARTIDA
    this.actualizarListaHeroes()
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
    console.log(this.solicitudGeneral[3])
  }

  editarGeneral(){
    console.log(this.solicitudGeneral[2])
    console.log(this.cartaAdd)
  }

  confirmarEdicion(){
    
    this.solicitudAux = {
      nombre_partida: this.solicitudGeneral[0],
      oro: this.solicitudGeneral[1].toString(),
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
    if(this.solicitudHeroes[i][3].indexOf(this.itemAdd) === -1){
      if(this.solicitudHeroes[i][3][0] == ""){
        this.solicitudHeroes[i][3][0] = this.itemAdd
      } else {
        this.solicitudHeroes[i][3].push(this.itemAdd)
      }
      
    }
  }

  quitarItem(itemIndex:number, i:number){
    console.log(itemIndex)
    //delete this.solicitudHeroes[i].equipamientoHeroe[itemIndex];
    this.solicitudHeroes[i][3].splice(itemIndex,1)
    console.log(this.solicitudHeroes[i][3])
  }

  addHabilidad(i:number){
    if(this.solicitudHeroes[i][2].indexOf(this.habilidadAdd) === -1){
      if(this.solicitudHeroes[i][2][0] == ""){
        this.solicitudHeroes[i][2][0] = this.habilidadAdd
      } else {
        this.solicitudHeroes[i][2].push(this.habilidadAdd)
      }
    }
  }

  quitarHabilidad(habilidadIndex:number, i:number){
    console.log(habilidadIndex)
    //delete this.solicitudHeroes[i].habilidadesHeroe[habilidadIndex];
    this.solicitudHeroes[i][2].splice(habilidadIndex,1)
    console.log(this.solicitudHeroes[i][2])
  }

  crearHeroe(){
    if(this.solicitudHeroes.length < 4){
      let heroeDefault = []
        heroeDefault[0] = this.solicitudListaHeroes[0]
        heroeDefault[1] = "Caballero"
        heroeDefault[2] = [this.solicitudListaHabilidades[0]]
        heroeDefault[3] = [this.solicitudListaEquipamiento[0]]
      //console.log(heroeDefault)
      this.solicitudHeroes.push(heroeDefault)
    }

    this.descentPartidaService.crearHeroePartidaDescent(
      this.descentPartidaService.getPartidaActualDescent(),
      this.currentUserService.getCurrentUserToken()!
    ).
    subscribe({
      next: (result)=>{

        console.log("heroe creado")

         // LISTA DE HEROES DE LA PARTIDA
        this.descentPartidaService.verHeroePartidaDescent(
          this.descentPartidaService.getPartidaActualDescent(),
          this.currentUserService.getCurrentUserToken()!
        ).subscribe({
          next: (result)=>{
    
            let counter = 0
            while(result.data[counter] !== undefined){
              this.solicitudHeroes[counter] = result.data[counter]; 
              counter++;
            }
            console.log(this.solicitudHeroes)
            counter = 0;
            //console.log(this.solicitudHeroes[2])
          },
          error: (error)=>{console.log(error)}
        })
        
      },
      error: (error)=>{console.log(error)}
    })
      
      
  }
  

  borrarHeroe(posicionHeroe:number, idHeroe:number){
    console.log("el heroe a eliminar esta en:" + posicionHeroe)
    console.log("el heroe a eliminar es:" + idHeroe)
    

    this.descentPartidaService.eliminarHeroePartidaDescent(
      idHeroe,
      this.currentUserService.getCurrentUserToken()!
    ).
    subscribe({
      next: (result)=>{
        this.solicitudHeroes.splice(posicionHeroe,1)
        console.log("heroe eliminado")

         // LISTA DE HEROES DE LA PARTIDA
         this.actualizarListaHeroes()
        
      },
      error: (error)=>{console.log(error)}
    })





    

  }

  confirmarEditHeroes(){
    let solicitudAuxEdit : any = {}
    let solicitudAuxEdit2 : any = {}
    let solicitudAuxEdit3 : any = {}
    let counter : number = 0

    let heroe = {
      "id_heroe_dc":String,
      "id":String,
      "habilidades_clase":[],
      "equipo_heroe":[]
    }

    //let heroes = heroe[]

    solicitudAuxEdit2 = []





    //console.log(this.solicitudHeroes)

    //console.log(this.solicitudHeroes.length)
    do{
      heroe = {
        "id_heroe_dc":String,
        "id":String,
        "habilidades_clase":[],
        "equipo_heroe":[]
      }
      heroe["id_heroe_dc"] = this.solicitudHeroes[counter][4]
      heroe["id"] = this.solicitudHeroes[counter][5]
      heroe.habilidades_clase = this.solicitudHeroes[counter][2]
      heroe.equipo_heroe = this.solicitudHeroes[counter][3]

      //console.log(heroe)

      solicitudAuxEdit2[counter] = heroe
      

      counter++
    }while (counter < this.solicitudHeroes.length)

    console.log(solicitudAuxEdit2)



    
    /*
    for (let index = 0; index < solicitudAuxEdit2["heroes"].length; index++) {
      console.log(solicitudAuxEdit2["heroes"][index])
      console.log(solicitudAuxEdit2["heroes"][index]["id_heroe"])
      
    }
    */

    this.descentPartidaService.actualizarTodosHeroePartidaDescent(
      solicitudAuxEdit2,
      this.descentPartidaService.getPartidaActualDescent(),
      this.currentUserService.getCurrentUserToken()!
    ).subscribe({
      next: (result)=>{
        console.log("Heroes actualizados exitosamente")
      },
      error: (error)=>{console.log(error)}
})

  }


  actualizarListaHeroes(){
    this.descentPartidaService.verHeroePartidaDescent(
      this.descentPartidaService.getPartidaActualDescent(),
      this.currentUserService.getCurrentUserToken()!
    ).subscribe({
      next: (result)=>{

        let counter = 0
        while(result.data[counter] !== undefined){
          this.solicitudHeroes[counter] = result.data[counter]; 
          counter++;
        }
        console.log(this.solicitudHeroes)
        counter = 0;
        //console.log(this.solicitudHeroes[2])
      },
      error: (error)=>{console.log(error)}
    })
  }

  onChange(seleccionado:NgModel, heroeActual:any){
    let sel = seleccionado.viewModel.toString()
    //console.log("eyt")
    //console.log(sel)
    //console.log(this.solicitudListaHeroes[0])
    //console.log(this.solicitudListaHeroes[0][1])

    let busca = this.solicitudListaHeroes.filter( (element:any) => element[1] == sel )

    heroeActual[0] = busca[0][1]
    heroeActual[4] = busca[0][0]
  }
  
  
}
