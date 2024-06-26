import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class DescentPartidaService {
    //public usuariosBD :Array<Usuario> = []
    public url = "http://127.0.0.1:8000/api/";
    
    public headersAddNoToken = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    public headersAddWithToken = new HttpHeaders();



// {headers: this.headersAdd}
    public misPartidas : boolean
    public partidasJuego : boolean
    public todasLasPartidas : boolean
    public partidaActualDescent: number

    constructor( private http: HttpClient ){
        this.misPartidas = false;
        this.partidasJuego = false;
        this.todasLasPartidas = false;
        this.partidaActualDescent = -1
    }

    public prepararHeader(token:string){
        return this.headersAddWithToken = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
    }

    testDescentPartidas(){
        return "funciona descent partida service";
    }

    public getPartidaActualDescent(){
        return this.partidaActualDescent
    }

    public setPartidaActualDescent(id:number){
        this.partidaActualDescent = id
    }

    public listarMisionesDescent():Observable<any> {
        return this.http.get(this.url + "descent/misiones/lista", {headers: this.headersAddNoToken});
    }

    public listarCartasDescent():Observable<any> {
        return this.http.get(this.url + "descent/cartas/lista", {headers: this.headersAddNoToken});
    }

    public listarHeroesDescent():Observable<any> {
        return this.http.get(this.url + "descent/heroes/lista", {headers: this.headersAddNoToken});
    }

    public listarEquipoDescent():Observable<any> {
        return this.http.get(this.url + "descent/equipo/lista", {headers: this.headersAddNoToken});
    }

    public listarHabilidadesDescent():Observable<any> {
        return this.http.get(this.url + "descent/habilidades/lista", {headers: this.headersAddNoToken});
    }

    // Usuario - Crear Partida de Descent
    public crearPartidaDescent(solicitud:any,token:string):Observable<any> {
        
        this.prepararHeader(token)
        return this.http.post(this.url + "descent/partida", solicitud, {headers: this.headersAddWithToken});
    }


    // Usuario - Listar Partidas de Descent
    public listarPartidasDescent(id:string, token:string):Observable<any> {
        this.prepararHeader(token)
        //console.log(this.headersAddWithToken)
        return this.http.get(this.url + "descent/partidas/" + id, {headers: this.headersAddWithToken});
    }


    // Usuario - Eliminar Partida de Descent (y todo lo que contiene)
    public eliminarPartidaDescent(id:number, token:string):Observable<any>{
        this.prepararHeader(token)
        return this.http.delete(this.url + "descent/partida/" + id, {headers: this.headersAddWithToken});     
    }


    // Usuario - Ver Datos de Partida de Descent (Mision actual, Mazo de Cartas de Overlord y Oro actual del grupo)
    public verGeneralPartidaDescent(idPartida:number, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.get(this.url + "descent/" + idPartida + "/general" , {headers: this.headersAddWithToken});
    }


    // Usuario - Añadir/Actualizar Dato a Partida de Descent (Mision actual, Mazo de Cartas de Overlord y Oro actual del grupo)
    public actualizarGeneralPartidaDescent(solicitud:any, idPartida:number, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.put(this.url + "descent/" + idPartida + "/general" , solicitud, {headers: this.headersAddWithToken});
    }


    // Usuario - Crear Heroe Partida de Descent
    public crearHeroePartidaDescent(idPartida:number, token:string):Observable<any> {
        this.prepararHeader(token)

        // le falta la solicitud al post?
        return this.http.post(this.url + "descent/" + idPartida + "/heroes", "", {headers: this.headersAddWithToken});
    }

    // Usuario - Actualizar Heroe Partida de Descent
    public actualizarTodosHeroePartidaDescent(solicitud:any,idPartida:number, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.put(this.url + "descent/" + idPartida + "/heroes" , solicitud, {headers: this.headersAddWithToken});
    }
/*
    // Usuario - Actualizar Heroe Partida de Descent
    public actualizarHeroePartidaDescent(idPartida:number, idHeroe:number, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.put(this.url + "descent/" + idPartida + "/heroes/" + idHeroe , {headers: this.headersAddWithToken});
    }
*/   

    //  - Heroes (todos se muestran juntos en una vista, maximo 4)
    public verHeroePartidaDescent(idPartida:number, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.get(this.url + "descent/" + idPartida + "/heroes" , {headers: this.headersAddWithToken});
    }


    // Usuario - Eliminar Dato de Héroes de Partida de Descent
    //      -- Héroe Seleccionado / Clase de Héroe / Equipamiento del Héroe
    public eliminarHeroePartidaDescent(idParty:number, token:string):Observable<any>{
        this.prepararHeader(token)
        return this.http.delete(this.url + "descent/" + idParty + "/heroes", {headers: this.headersAddWithToken});     
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

    public partidasAPedir(){
        if(this.todasLasPartidas == true){
            // URL AQUI
        } else if (this.partidasJuego == true){
            // URL AQUI
        } else if (this.misPartidas == true) {
            // URL AQUI
        }
    }
}
