import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class GloomhavenPartidaService {
    //public usuariosBD :Array<Usuario> = []
    public url = "http://127.0.0.1:8000/api/";

    public headersAddNoToken = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    public headersAddWithToken = new HttpHeaders();


    public misPartidas : boolean
    public partidasJuego : boolean
    public todasLasPartidas : boolean
    public partidaActualGloomhaven: number

    constructor( private http: HttpClient ){
        this.misPartidas = false;
        this.partidasJuego = false;
        this.todasLasPartidas = false;
        this.partidaActualGloomhaven = -1
    }

    public prepararHeader(token:string){
        return this.headersAddWithToken = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
    }


    public listarMisionesGloomhaven():Observable<any> {
        return this.http.get(this.url + "gloomhaven/misiones/lista", {headers: this.headersAddNoToken});
    }

    public listarLogrosGlobalesGloomhaven():Observable<any> {
        return this.http.get(this.url + "gloomhaven/logros-globales/lista", {headers: this.headersAddNoToken});
    }

    public listarMisionesPersonalesGloomhaven():Observable<any> {
        return this.http.get(this.url + "gloomhaven/misiones-personales/lista", {headers: this.headersAddNoToken});
    }

    public listarLogrosGrupoGloomhaven():Observable<any> {
        return this.http.get(this.url + "gloomhaven/logros-grupo/lista", {headers: this.headersAddNoToken});
    }

    public listarPericiasGloomhaven():Observable<any> {
        return this.http.get(this.url + "gloomhaven/pericias/lista", {headers: this.headersAddNoToken});
    }

    public listarClasesGloomhaven():Observable<any> {
        return this.http.get(this.url + "gloomhaven/heroes/lista", {headers: this.headersAddNoToken});
    }

    public listarHabilidadesGloomhaven():Observable<any> {
        return this.http.get(this.url + "gloomhaven/habilidades/lista", {headers: this.headersAddNoToken});
    }

    public listarEquipoGloomhaven():Observable<any> {
        return this.http.get(this.url + "gloomhaven/equipo/lista", {headers: this.headersAddNoToken});
    }




    // Usuario - Crear Partida de Gloomhaven
    public crearPartidaGloomhaven(solicitud:any,token:string):Observable<any> {
        
        this.prepararHeader(token)
        return this.http.post(this.url + "gloomhaven/partida", solicitud, {headers: this.headersAddWithToken});
    }


    // Usuario - Listar Partidas de Gloomhaven
    public listarPartidasGloomhaven(id:string, token:string):Observable<any> {
        this.prepararHeader(token)
        //console.log(this.headersAddWithToken)
        return this.http.get(this.url + "gloomhaven/partidas/" + id, {headers: this.headersAddWithToken});
    }


    // Usuario - Eliminar Partida de Gloomhaven (y todo lo que contiene)
    public eliminarPartidaGloomhaven(id:number, token:string):Observable<any>{
        this.prepararHeader(token)
        return this.http.delete(this.url + "gloomhaven/partida/" + id, {headers: this.headersAddWithToken});     
    }


    // Usuario - Ver Datos de Partida de Gloomhaven (Mision actual, Mazo de Cartas de Overlord y Oro actual del grupo)
    public verGeneralPartidaGloomhaven(idPartida:number, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.get(this.url + "gloomhaven/" + idPartida + "/general" , {headers: this.headersAddWithToken});
    }


    // Usuario - Añadir/Actualizar Dato a Partida de Gloomhaven (Mision actual, Mazo de Cartas de Overlord y Oro actual del grupo)
    public actualizarGeneralPartidaGloomhaven(solicitud:any, idPartida:number, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.put(this.url + "gloomhaven/" + idPartida + "/general" , solicitud, {headers: this.headersAddWithToken});
    }


    // Usuario - Crear Heroe Partida de Gloomhaven
    public crearHeroePartidaGloomhaven(idPartida:number, token:string):Observable<any> {
        this.prepararHeader(token)

        // le falta la solicitud al post?
        return this.http.post(this.url + "gloomhaven/" + idPartida + "/heroes", "", {headers: this.headersAddWithToken});
    }

    // Usuario - Actualizar Heroe Partida de Gloomhaven
    public actualizarTodosHeroePartidaGloomhaven(solicitud:any,idPartida:number, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.put(this.url + "gloomhaven/" + idPartida + "/heroes" , solicitud, {headers: this.headersAddWithToken});
    }

    //  - Heroes (todos se muestran juntos en una vista, maximo 4)
    public verHeroePartidaGloomhaven(idPartida:number, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.get(this.url + "gloomhaven/" + idPartida + "/heroes" , {headers: this.headersAddWithToken});
    }


    // Usuario - Eliminar Dato de Héroes de Partida de Gloomhaven
    public eliminarHeroePartidaGloomhaven(idParty:number, token:string):Observable<any>{
        this.prepararHeader(token)
        return this.http.delete(this.url + "gloomhaven/" + idParty + "/heroes", {headers: this.headersAddWithToken});     
    }



    public getPartidaActualGloomhaven(){
        return this.partidaActualGloomhaven
    }

    public setPartidaActualGloomhaven(id:number){
        this.partidaActualGloomhaven = id
    }



    public getMisPartidas(){
        return this.misPartidas
    }
    public getPartidasJuego(){
        return this.partidasJuego
    }
    public getTodasLasPartidas(){
        return this.todasLasPartidas
    }

    
}