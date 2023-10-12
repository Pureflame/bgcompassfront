import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { empty } from 'rxjs';
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
    this.gloomhavenPartidaService.verHeroePartidaGloomhaven(
      this.gloomhavenPartidaService.getPartidaActualGloomhaven(),
      this.currentUserService.getCurrentUserToken()!
    ).subscribe({
      next: (result)=>{
        //console.log(this.solicitudGruposHeroes)

        let solicitudGruposHeroesAux = {
          "id_grupo":Number,
          "reputacion_grupo":Number,
          "logros_grupo":[]
        }
        

        let counter = 0
        let grupo = 1
        while(result.data[counter] !== undefined){
          this.solicitudHeroes[counter] = result.data[counter]; 
          

          // Id de grupos, reputacion y logros de cada uno
          // Recorremos a todos los heroes por cada grupo
          // Si el heroe actual pertenece al grupo, el grupo obtiene los valores
            let counter2 = 0
          while(result.data[counter2] !== undefined){
            console.log(grupo)
            //console.log(result.data[counter][1])

            //if(grupo == result.data[counter2][1]){
              
                solicitudGruposHeroesAux["id_grupo"] = result.data[counter2][1]
                solicitudGruposHeroesAux["reputacion_grupo"] = result.data[counter2][6]
                solicitudGruposHeroesAux["logros_grupo"] = result.data[counter2][13]
                //console.log(solicitudGruposHeroesAux)


                this.solicitudGruposHeroes[grupo-1] = solicitudGruposHeroesAux
                console.log("grupo hecho")

                
                //console.log(this.solicitudGruposHeroes)
                grupo++
              
            //}
              counter2++;
          }
  
          counter++;
        }

        console.log(this.solicitudHeroes)

        //var aux = this.solicitudHeroes.map(function (el:any) { return el[1] });
        //let solicitudGruposHeroes = this.solicitudGruposHeroes.filter((e:any) => Object.keys(e).length);
        //console.log(aux)
        console.log(this.solicitudGruposHeroes)

        
        //console.log(solicitudGruposHeroes[0]["id_grupo"])
      },
      error: (error)=>{console.log(error)}
    })
/*
    // LISTA DE GRUPO DE LA PARTIDA
    this.gloomhavenPartidaService.verHeroePartidaGloomhaven(
      this.gloomhavenPartidaService.getPartidaActualGloomhaven(),
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


*/





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
    console.log("gi")
    this.solicitudAux = {
      nombre_partida: this.solicitudGeneral[0],
      prosperidad_ciudad_partida_gh: this.solicitudGeneral[1],
      nombre_mision_gh: this.solicitudGeneral[2],
      logros_globales: this.solicitudGeneral[3],
    }

    
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
    if(this.solicitudHeroes[i][3].indexOf(this.itemAdd) === -1){
      if(this.solicitudHeroes[i][3][0] == ""){
        this.solicitudHeroes[i][3][0] = this.itemAdd
      } else {
        this.solicitudHeroes[i][3].push(this.itemAdd)
      }
      
    }
  }

  quitarPericia(itemIndex:number, i:number){
    console.log(itemIndex)
    //delete this.solicitudHeroes[i].equipamientoHeroe[itemIndex];
    this.solicitudHeroes[i][3].splice(itemIndex,1)
    console.log(this.solicitudHeroes[i][3])
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
        heroeDefault[0] = this.solicitudListaClases[0]
        heroeDefault[1] = "Caballero"
        heroeDefault[2] = [this.solicitudListaHabilidades[0]]
        heroeDefault[3] = [this.solicitudListaEquipamiento[0]]
      //console.log(heroeDefault)
      this.solicitudHeroes.push(heroeDefault)
    }

    // LISTA DE HEROES DE LA PARTIDA
    this.gloomhavenPartidaService.verHeroePartidaGloomhaven(
      this.gloomhavenPartidaService.getPartidaActualGloomhaven(),
      this.currentUserService.getCurrentUserToken()!
    ).subscribe({
      next: (result)=>{
        //console.log(this.solicitudGruposHeroes)

        let solicitudGruposHeroesAux = {
          "id_grupo":Number,
          "reputacion_grupo":Number,
          "logros_grupo":[]
        }
        

        let counter = 0
        let grupo = 1
        while(result.data[counter] !== undefined){
          this.solicitudHeroes[counter] = result.data[counter]; 
          

          // Id de grupos, reputacion y logros de cada uno
          // Recorremos a todos los heroes por cada grupo
          // Si el heroe actual pertenece al grupo, el grupo obtiene los valores
          
            let counter2 = 0
          while(result.data[counter2] !== undefined){
            //console.log(grupo)
            //console.log(result.data[counter][1])

            if(grupo == result.data[counter2][1]){
              
                solicitudGruposHeroesAux["id_grupo"] = result.data[counter2][1]
                solicitudGruposHeroesAux["reputacion_grupo"] = result.data[counter2][6]
                solicitudGruposHeroesAux["logros_grupo"] = result.data[counter2][13]
                //console.log(solicitudGruposHeroesAux)
                this.solicitudGruposHeroes[grupo-1] = solicitudGruposHeroesAux
                //console.log(grupo)
                //console.log(this.solicitudGruposHeroes)
                grupo++
                //}
              //}
              
            }
              counter2++;
          }
          counter++;
        }

        console.log(this.solicitudHeroes)

        //var aux = this.solicitudHeroes.map(function (el:any) { return el[1] });
        //let solicitudGruposHeroes = this.solicitudGruposHeroes.filter((e:any) => Object.keys(e).length);
        //console.log(aux)
        console.log(this.solicitudGruposHeroes)

        
        //console.log(solicitudGruposHeroes[0]["id_grupo"])
      },
      error: (error)=>{console.log(error)}
    })     
      
  }
  

  borrarHeroe(i:number){
    //delete this.solicitudHeroes[i];
    console.log(i)
    console.log(this.gloomhavenPartidaService.getPartidaActualGloomhaven())
    /*
    this.gloomhavenPartidaService.eliminarHeroePartidaGloomhaven(
      i,
      this.currentUserService.getCurrentUserToken()!
    ).
    subscribe({
      next: (result)=>{
        this.solicitudHeroes.splice(i,1)
        console.log("heroe eliminado")

         // LISTA DE HEROES DE LA PARTIDA
        this.gloomhavenPartidaService.verHeroePartidaGloomhaven(
          i,
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
*/
    

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





    console.log(this.solicitudHeroes)

    console.log(this.solicitudHeroes.length)
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

      console.log(heroe)

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

    this.gloomhavenPartidaService.actualizarTodosHeroePartidaGloomhaven(
      solicitudAuxEdit2,
      this.gloomhavenPartidaService.getPartidaActualGloomhaven(),
      this.currentUserService.getCurrentUserToken()!
    ).subscribe({
      next: (result)=>{
        console.log("Heroes actualizados exitosamente")
      },
      error: (error)=>{console.log(error)}
})

  }
  





}
