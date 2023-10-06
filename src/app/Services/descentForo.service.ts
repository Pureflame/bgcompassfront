import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class DescentForoService {
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

    testDescentForos(){
        return "funciona descent foro service";
    }

    ////////////// DISCUSIONES //////////////
    // Usuario - Crear Discusión en el foro
    public crearDiscusionForoDescent(token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.post(this.url + "descent/foro/discusion", {headers: this.headersAddWithToken});
    }

    // Usuario - Ver sus discusiones del foro
    public listarDiscusionesUsuarioForoDescent(token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.get(this.url + "descent/foro/discusion/usuario", {headers: this.headersAddWithToken});
    }

    // Listar Discusiones en el foro
    
    // SIN TOKEN?
    public listarDiscusionesForoDescent():Observable<any> {
        return this.http.get(this.url + "descent/foro/discusion", {headers: this.headersAddNoToken});
    }

    // Admin - Eliminar Discusión del foro (junto a todos sus mensajes)
    public eliminarDiscusionForoDescent(idDiscusion:number, token:string):Observable<any>{
        this.prepararHeader(token)
        return this.http.delete(this.url + "descent/foro/discusion/" + idDiscusion, {headers: this.headersAddWithToken});     
    }


    ////////////// MENSAJES //////////////
    // Usuario - Crear Mensaje de una discusión del foro
    public crearMensajeForoDescent(idConversacion:number, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.post(this.url + "descent/foro/mensaje/" + idConversacion, {headers: this.headersAddWithToken});
    }

    // Listar Mensajes de un usuario del foro
    public listarMensajesUsuarioForoDescent(token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.get(this.url + "descent/foro/mensaje/usuario", {headers: this.headersAddWithToken});
    }

    // Listar Mensajes de una discusión del foro

    // SIN TOKEN?
    public listarMensajesDiscusionForoDescent(idConversacion:number):Observable<any> {
        return this.http.get(this.url + "descent/foro/" + idConversacion + "/mensaje", {headers: this.headersAddNoToken});
    }

    // Admin - Eliminar Mensaje de una discusión del foro
    public eliminarMensajeForoDescent(idMensaje:number, token:string):Observable<any>{
        this.prepararHeader(token)
        return this.http.delete(this.url + "descent/foro/mensaje/" + idMensaje, {headers: this.headersAddWithToken});     
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

    public discusionesAPedir(){
        if(this.todasLasDiscusiones == true){
            // URL AQUI
        } else if (this.discusionesJuego == true){
            // URL AQUI
        } else if (this.misDiscusiones == true) {
            // URL AQUI
        }
    }

}