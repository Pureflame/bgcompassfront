import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { GrupoHeroes } from 'src/app/Models/Gloomhaven/grupoHeroes';
import { GruposHeroes } from 'src/app/Models/Gloomhaven/gruposHeroes';
import { CurrentUserService } from 'src/app/Services/current-user.service';
import { GloomhavenPartidaService } from 'src/app/Services/gloomhavenPartida.service';

@Component({
  selector: 'app-gloomhaven-partida-datos',
  templateUrl: './gloomhaven-partida-datos.component.html',
  styleUrls: ['./gloomhaven-partida-datos.component.css']
})
export class GloomhavenPartidaDatosComponent {

  public datosGeneralesActiva: boolean;
  public datosHeroeActiva: boolean;

  public solicitudAux: any
  public solicitudGeneral: any;
  public solicitudListaMisiones: any;
  public solicitudListaLogrosGlobales: any;

  public solicitudHeroes: any;
  
  public solicitudGruposHeroes: any;
  public solicitudGruposHeroesAux: Array<any>;
  public solicitudListaMisionesPersonales: any;
  public solicitudListaLogrosGrupo: any;
  public solicitudListaPericias: any;
  public solicitudListaClases: any;
  public solicitudListaHabilidades: any;
  public solicitudListaEquipamiento: any;

/*
  public cartaAdd: string
  public itemAdd: string
  public habilidadAdd: string
*/

  public logrosGlobalAdd :string;
  public logrosGrupoAdd :string;
  public periciaAdd :string;
  public habilidadAdd :string;
  public itemAdd :string;

  public soyAdmin: boolean;
  public soyUsuario: boolean;

  
  constructor(
    private router: Router, 
    private currentUserService: CurrentUserService,
    private gloomhavenPartidaService: GloomhavenPartidaService){

    this.solicitudAux = {}
    this.solicitudGeneral = []
    this.solicitudListaMisiones = []
    this.solicitudListaLogrosGlobales = []

    this.solicitudHeroes = []
    this.solicitudGruposHeroes = []
    this.solicitudGruposHeroesAux = [
      {
      "id_grupo":String,
      "reputacion_grupo":String,
      "logros_grupo":[]
    }
  ]
    this.solicitudListaMisionesPersonales = []
    this.solicitudListaLogrosGrupo = []
    this.solicitudListaPericias = []
    this.solicitudListaClases = []
    this.solicitudListaHabilidades = []
    this.solicitudListaEquipamiento = []

    this.datosGeneralesActiva = false;
    this.datosHeroeActiva = false;

    this.soyAdmin = false;
    this.soyUsuario = false;

    this.logrosGlobalAdd = "";
    this.logrosGrupoAdd = "";
    this.periciaAdd = "";
    this.habilidadAdd = "";
    this.itemAdd = "";
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


    // LISTA DE MISIONES
    this.gloomhavenPartidaService.listarMisionesGloomhaven().
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


    // LISTA DE LOGROS GLOBALES
    this.gloomhavenPartidaService.listarLogrosGlobalesGloomhaven().
    subscribe({
      next: (result)=>{

        let counter = 0
        while(result.data[counter] !== undefined){
          this.solicitudListaLogrosGlobales[counter] = result.data[counter]; 
          counter++;
        }
        //console.log(this.solicitudListaMisiones)
        counter = 0;
      },
      error: (error)=>{console.log(error)}
    })


    // DATOS GENERALES DE LA PARTIDA
    //console.log(this.gloomhavenPartidaService.getPartidaActualGloomhaven())


    
    this.gloomhavenPartidaService.verGeneralPartidaGloomhaven(
      this.gloomhavenPartidaService.getPartidaActualGloomhaven(),
      this.currentUserService.getCurrentUserToken()!
    ).subscribe({
      next: (result)=>{

        let counter = 0
        while(result.data[counter] !== undefined){
          this.solicitudGeneral[counter] = result.data[counter]; 
          counter++;
        }
        console.log(this.solicitudGeneral)
        counter = 0;
        //console.log(this.solicitudGeneral[2])
      },
      error: (error)=>{console.log(error)}
    })


    // LISTA DE MISIONES PERSONALES
    this.gloomhavenPartidaService.listarMisionesPersonalesGloomhaven().
    subscribe({
      next: (result)=>{

        let counter = 0
        while(result.data[counter] !== undefined){
          this.solicitudListaMisionesPersonales[counter] = result.data[counter]; 
          counter++;
        }
        //console.log(this.solicitudListaMisiones)
        counter = 0;
      },
      error: (error)=>{console.log(error)}
    })

    // LISTA DE LOGROS DE GRUPO
    this.gloomhavenPartidaService.listarLogrosGrupoGloomhaven().
    subscribe({
      next: (result)=>{

        let counter = 0
        while(result.data[counter] !== undefined){
          this.solicitudListaLogrosGrupo[counter] = result.data[counter]; 
          counter++;
        }
        //console.log(this.solicitudListaMisiones)
        counter = 0;
      },
      error: (error)=>{console.log(error)}
    })

    // LISTA DE PERICIAS
    this.gloomhavenPartidaService.listarPericiasGloomhaven().
    subscribe({
      next: (result)=>{

        let counter = 0
        while(result.data[counter] !== undefined){
          this.solicitudListaPericias[counter] = result.data[counter]; 
          counter++;
        }
        //console.log(this.solicitudListaMisiones)
        counter = 0;
      },
      error: (error)=>{console.log(error)}
    })

    // LISTA DE CLASES
    this.gloomhavenPartidaService.listarClasesGloomhaven().
    subscribe({
      next: (result)=>{

        let counter = 0
        while(result.data[counter] !== undefined){
          this.solicitudListaClases[counter] = result.data[counter]; 
          counter++;
        }
        //console.log(this.solicitudListaMisiones)
        counter = 0;
      },
      error: (error)=>{console.log(error)}
    })

    // LISTA DE HABILIDADES
    this.gloomhavenPartidaService.listarHabilidadesGloomhaven().
    subscribe({
      next: (result)=>{

        let counter = 0
        while(result.data[counter] !== undefined){
          this.solicitudListaHabilidades[counter] = result.data[counter]; 
          counter++;
        }
        //console.log(this.solicitudListaMisiones)
        counter = 0;
      },
      error: (error)=>{console.log(error)}
    })

    // LISTA DE EQUIPAMIENTO
    this.gloomhavenPartidaService.listarEquipoGloomhaven().
    subscribe({
      next: (result)=>{

        let counter = 0
        while(result.data[counter] !== undefined){
          this.solicitudListaEquipamiento[counter] = result.data[counter]; 
          counter++;
        }
        //console.log(this.solicitudListaMisiones)
        counter = 0;
      },
      error: (error)=>{console.log(error)}
    })

    // LISTA DE HEROES DE LA PARTIDA
    this.listaHeroesPartida()

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
    this.router.navigate(['gloomhaven/partidas'])
  }

  quitarLogroGlobal(logroGlobalIndex:number){
    
    this.solicitudGeneral[3].splice(logroGlobalIndex,1)
    console.log(this.solicitudGeneral[3])
  }

  addLogroGlobal(){
    if(this.solicitudGeneral[3].indexOf(this.logrosGlobalAdd) === -1){
      this.solicitudGeneral[3].push(this.logrosGlobalAdd)
    }
    console.log(this.solicitudGeneral[3])
  }

  confirmarEdicion(){
    
    this.solicitudAux = {
      nombre_partida: this.solicitudGeneral[0],
      prosperidad_ciudad_partida_gh: this.solicitudGeneral[1].toString(),
      nombre_mision_gh: this.solicitudGeneral[2],
      logros_globales: this.solicitudGeneral[3],
    }
    console.log( this.solicitudAux)
    
    this.gloomhavenPartidaService.actualizarGeneralPartidaGloomhaven(this.solicitudAux,
      this.gloomhavenPartidaService.partidaActualGloomhaven,
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
    console.log("vamos a heroes")
    console.log(this.solicitudHeroes)
  }



















  volverADatosGenerales(){
    this.datosGeneralesActiva = true;
    this.datosHeroeActiva = false;
  }

  addlogroGrupo(i:number){
    if(this.solicitudGruposHeroes[i]['logros_grupo'].indexOf(this.itemAdd) === -1){
      if(this.solicitudGruposHeroes[i]['logros_grupo'][0] == ""){
        this.solicitudGruposHeroes[i]['logros_grupo'][0] = this.itemAdd
      } else {
        this.solicitudGruposHeroes[i]['logros_grupo'].push(this.itemAdd)
      }
      
    }
  }

  quitarlogroGrupo(itemIndex:number, i:number){
    console.log(itemIndex)
    //delete this.solicitudHeroes[i].equipamientoHeroe[itemIndex];
    this.solicitudGruposHeroes[i]['logros_grupo'].splice(itemIndex,1)
    console.log(this.solicitudGruposHeroes[i]['logros_grupo'])
  }

  addPericia(i:number){
    if(this.solicitudHeroes[i][12].indexOf(this.itemAdd) === -1){
      if(this.solicitudHeroes[i][12][0] == ""){
        this.solicitudHeroes[i][12][0] = this.itemAdd
      } else {
        this.solicitudHeroes[i][12].push(this.itemAdd)
      }
      
    }
  }

  quitarPericia(itemIndex:number, i:number){
    console.log(itemIndex)
    //delete this.solicitudHeroes[i].equipamientoHeroe[itemIndex];
    this.solicitudHeroes[i][12].splice(itemIndex,1)
    console.log(this.solicitudHeroes[i][12])
  }

  addItem(i:number){
    if(this.solicitudHeroes[i][11].indexOf(this.itemAdd) === -1){
      if(this.solicitudHeroes[i][11][0] == ""){
        this.solicitudHeroes[i][11][0] = this.itemAdd
      } else {
        this.solicitudHeroes[i][11].push(this.itemAdd)
      }
      
    }
  }

  quitarItem(itemIndex:number, i:number){
    console.log(itemIndex)
    //delete this.solicitudHeroes[i].equipamientoHeroe[itemIndex];
    this.solicitudHeroes[i][11].splice(itemIndex,1)
    console.log(this.solicitudHeroes[i][11])
  }

  addHabilidad(i:number){
    if(this.solicitudHeroes[i][10].indexOf(this.habilidadAdd) === -1){
      if(this.solicitudHeroes[i][10][0] == ""){
        this.solicitudHeroes[i][10][0] = this.habilidadAdd
      } else {
        this.solicitudHeroes[i][10].push(this.habilidadAdd)
      }
    }
  }

  quitarHabilidad(habilidadIndex:number, i:number){
    console.log(habilidadIndex)
    //delete this.solicitudHeroes[i].habilidadesHeroe[habilidadIndex];
    this.solicitudHeroes[i][10].splice(habilidadIndex,1)
    console.log(this.solicitudHeroes[i][10])
  }

  crearHeroe(){
    
    let heroeDefault = []
      //heroeDefault[0] = this.solicitudListaClases[0]
      heroeDefault[1] = "Caballero"
      heroeDefault[2] = [this.solicitudListaHabilidades[0]]
      heroeDefault[3] = [this.solicitudListaEquipamiento[0]]
      heroeDefault[4] = [this.solicitudListaEquipamiento[0]]
      heroeDefault[5] = [this.solicitudListaEquipamiento[0]]
      heroeDefault[6] = [this.solicitudListaEquipamiento[0]]
      heroeDefault[7] = [this.solicitudListaEquipamiento[0]]
      heroeDefault[8] = [this.solicitudListaEquipamiento[0]]
      heroeDefault[9] = [this.solicitudListaEquipamiento[0]]
      heroeDefault[10] = []
      heroeDefault[11] = []
      heroeDefault[12] = [this.solicitudListaEquipamiento[0]]
    //console.log(heroeDefault)
    //this.solicitudHeroes.push(heroeDefault)
    console.log(this.gloomhavenPartidaService.getPartidaActualGloomhaven())

    this.gloomhavenPartidaService.crearHeroePartidaGloomhaven(
      this.gloomhavenPartidaService.getPartidaActualGloomhaven(),
      this.currentUserService.getCurrentUserToken()!
    ).
    subscribe({
      next: (result)=>{

        console.log("heroe creado")

         // LISTA DE HEROES DE LA PARTIDA
         this.listaHeroesPartida()
        
      },
      error: (error)=>{console.log(error)}
    })









    // LISTA DE HEROES DE LA PARTIDA
    this.listaHeroesPartida()
      
  }
  

  borrarHeroe(posicionHeroe:number, idHeroe:number){
    console.log("el heroe a eliminar esta en:" + posicionHeroe)
    console.log("el heroe a eliminar es:" + idHeroe)
    //delete this.solicitudHeroes[i];
    
    this.gloomhavenPartidaService.eliminarHeroePartidaGloomhaven(
      idHeroe,
      this.currentUserService.getCurrentUserToken()!
    ).
    subscribe({
      next: (result)=>{
        this.solicitudHeroes.splice(posicionHeroe,1)
        console.log("heroe eliminado")

        // LISTA DE HEROES DE LA PARTIDA
        this.listaHeroesPartida()
        
      },
      error: (error)=>{console.log(error)}
    })

    

  }

  confirmarEditHeroes(){
    let solicitudAuxEdit : any = {}
    let solicitudAuxEdit2 : any = {}
    let solicitudAuxEdit3 : any = {}
    


    //let heroes = heroe[]

    solicitudAuxEdit2 = []

    let solicitud = {
      "grupos":[],
      "heroes":[],
    }



    console.log(this.solicitudHeroes)
    console.log(this.solicitudHeroes.length)
    let counter = 0
    do{

      let heroe = {
        "id":String,
        "grupo_party_gh":String,
        "id_heroe_gh":String,
        "nombre_party_gh":String,
        "experiencia_party_gh":String,
        "oro_party_gh":String,
        "marcas_party_gh":String,
        "mision_personal_gh":String,
        "habilidades_nuevas":[],
        "equipo_nuevo":[],
        "pericias_nuevas":[]
      }

      heroe.id = this.solicitudHeroes[counter][0],
      heroe.grupo_party_gh = this.solicitudHeroes[counter][1],
      heroe.id_heroe_gh = this.solicitudHeroes[counter][2],
      heroe.nombre_party_gh = this.solicitudHeroes[counter][3],
      heroe.experiencia_party_gh = this.solicitudHeroes[counter][5],
      heroe.oro_party_gh = this.solicitudHeroes[counter][7],
      heroe.marcas_party_gh = this.solicitudHeroes[counter][8],
      heroe.mision_personal_gh = this.solicitudHeroes[counter][9],
      heroe.habilidades_nuevas = this.solicitudHeroes[counter][10],
      heroe.equipo_nuevo = this.solicitudHeroes[counter][11],
      heroe.pericias_nuevas = this.solicitudHeroes[counter][12]

      //console.log(heroe)
      solicitudAuxEdit2[counter] = heroe
      
      counter++

      if(counter >= this.solicitudHeroes.length){
        solicitud.grupos = this.solicitudGruposHeroes
        solicitud.heroes = solicitudAuxEdit2

        console.log(solicitudAuxEdit2)
        console.log(this.solicitudGruposHeroes)
        console.log(solicitud)
      }
      
    }while (counter < this.solicitudHeroes.length)



    
    /*
    for (let index = 0; index < solicitudAuxEdit2["heroes"].length; index++) {
      console.log(solicitudAuxEdit2["heroes"][index])
      console.log(solicitudAuxEdit2["heroes"][index]["id_heroe"])
      
    }
    */

    this.gloomhavenPartidaService.actualizarTodosHeroePartidaGloomhaven(
      solicitud,
      this.gloomhavenPartidaService.getPartidaActualGloomhaven(),
      this.currentUserService.getCurrentUserToken()!
    ).subscribe({
      next: (result)=>{
        console.log("Heroes actualizados exitosamente")
      },
      error: (error)=>{console.log(error)}
})

  }
  


  listaHeroesPartida(){
  this.gloomhavenPartidaService.verHeroePartidaGloomhaven(
    this.gloomhavenPartidaService.getPartidaActualGloomhaven(),
    this.currentUserService.getCurrentUserToken()!
  ).subscribe({
    next: (result)=>{

      let counter = 0
      while(result.data[counter] !== undefined){
        this.solicitudHeroes[counter] = result.data[counter]; 

        this.solicitudGruposHeroesAux[counter] =
          {
            "id_grupo":result.data[counter][1],
            "reputacion_grupo":result.data[counter][6],
            "logros_grupo":result.data[counter][13]
          }

        counter++;

        if(result.data[counter] === undefined){
          let counter2 = 0
          let grupo = 0
          while(this.solicitudGruposHeroesAux[counter2]!== undefined){

            this.solicitudGruposHeroes[grupo] = this.solicitudGruposHeroesAux[counter2]
            grupo++
            counter2++
            if(this.solicitudGruposHeroesAux[counter2] === undefined){

              // Filtramos grupos repetidos
              this.solicitudGruposHeroes = this.solicitudGruposHeroes.filter((value:any, index:any, self:any) =>
              index === self.findIndex((t:any) => (
                t.id_grupo === value.id_grupo
              ))
              )
              console.log(this.solicitudHeroes)
              console.log(this.solicitudGruposHeroes)
            }
          }
        }
      }
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

  let busca = this.solicitudListaClases.filter( (element:any) => element[1] == sel )

  heroeActual[2] = busca[0][0]
  heroeActual[4] = busca[0][1]
}


}
