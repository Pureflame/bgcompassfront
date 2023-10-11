import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class GloomhavenForoService {
    //public usuariosBD :Array<Usuario> = []
    public url = "http://127.0.0.1:8000/api/";

    public headersAddNoToken = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    public headersAddWithToken = new HttpHeaders();


    public idDiscusionActual : any
    public misDiscusiones : boolean
    public discusionesJuego : boolean
    public todasLasDiscusiones : boolean

    constructor( private http: HttpClient ){
        this.misDiscusiones = false;
        this.discusionesJuego = false;
        this.todasLasDiscusiones = false;
    }

    public prepararHeader(token:string){
        return this.headersAddWithToken = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
    }





    ////////////// DISCUSIONES //////////////
    // Usuario - Crear Discusión en el foro
    public crearDiscusionForoGloomhaven(solicitud:any, token:string):Observable<any> {
        this.prepararHeader(token)

        // le falta la solicitud al post?
        return this.http.post(this.url + "gloomhaven/foro/discusion", solicitud, {headers: this.headersAddWithToken});
    }

    // Usuario - Ver sus discusiones del foro
    public listarDiscusionesUsuarioForoGloomhaven(token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.get(this.url + "gloomhaven/foro/discusion/usuario", {headers: this.headersAddWithToken});
    }

    // Listar Discusiones en el foro
    
    // SIN TOKEN?
    public listarDiscusionesForoGloomhaven():Observable<any> {
        return this.http.get(this.url + "gloomhaven/foro/discusion", {headers: this.headersAddNoToken});
    }

    // Admin - Eliminar Discusión del foro (junto a todos sus mensajes)
    public eliminarDiscusionForoGloomhaven(idDiscusion:number, token:string):Observable<any>{
        this.prepararHeader(token)
        return this.http.delete(this.url + "gloomhaven/foro/discusion/" + idDiscusion, {headers: this.headersAddWithToken});     
    }


    ////////////// MENSAJES //////////////
    // Usuario - Crear Mensaje de una discusión del foro
    public crearMensajeForoGloomhaven(solicitud:any, idConversacion:number, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.post(this.url + "gloomhaven/foro/mensaje/" + idConversacion, solicitud, {headers: this.headersAddWithToken});
    }

    // Listar Mensajes de un usuario del foro
    public listarMensajesUsuarioForoGloomhaven(token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.get(this.url + "gloomhaven/foro/mensaje/usuario", {headers: this.headersAddWithToken});
    }

    // Listar Mensajes de una discusión del foro
    // SIN TOKEN?
    public listarMensajesDiscusionForoGloomhaven(idConversacion:number):Observable<any> {
        return this.http.get(this.url + "gloomhaven/foro/" + idConversacion + "/mensaje", {headers: this.headersAddNoToken});
    }

    // Admin - Eliminar Mensaje de una discusión del foro
    public eliminarMensajeForoGloomhaven(idMensaje:number, token:string):Observable<any>{
        this.prepararHeader(token)
        return this.http.delete(this.url + "gloomhaven/foro/mensaje/" + idMensaje, {headers: this.headersAddWithToken});     
    }







    public setDiscusionActual(discusionId:any){
        this.idDiscusionActual = discusionId;
    }

    public getDiscusionActual(){
        return this.idDiscusionActual;
    }

    public pedirMisDiscusiones(){
        this.misDiscusiones = true;
        this.discusionesJuego = false;
        this.todasLasDiscusiones = false;
    }

    public pedirDiscusionesJuego(){
        this.misDiscusiones = false;
        this.discusionesJuego = true;
        this.todasLasDiscusiones = false;
    }

    public pedirTodasLasDiscusiones(){
        this.misDiscusiones = false;
        this.discusionesJuego = false;
        this.todasLasDiscusiones = true;
    }

    public getMisDiscusiones(){
        return this.misDiscusiones
    }
    public getDiscusionesJuego(){
        return this.discusionesJuego
    }
    public getTodasLasDiscusiones(){
        return this.todasLasDiscusiones
    }


}