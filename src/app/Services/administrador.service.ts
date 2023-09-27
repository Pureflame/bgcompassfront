import { Injectable } from "@angular/core";
import { Administrador } from "../Models/administrador";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AdministradorService {
    public url = "http://127.0.0.1:8000/api/";
    
    public headersAddNoToken = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    public headersAddWithToken = new HttpHeaders();


    constructor( private http: HttpClient ){}

    public prepararHeader(token:string){
        return this.headersAddWithToken = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
    }

    testAdministrador(){
        return "funciona administrador service";
    }

    // dni, nombre, apellidos, contrasenha, correo, telefono, tipo
    public registrarAdministrador(adminNuevo:Administrador, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.post(this.url + "usuario-registro/administrador", adminNuevo, {headers: this.headersAddWithToken});
    }

    public getAdminList(correo:string):Observable<any>{
        let parametroGet = new HttpParams().set("correo", correo)
        return this.http.get(this.url + "administrador/list", {headers: this.headersAddWithToken, params: parametroGet});
    }

    public getAdministradorDatos(id:number, token:string):Observable<any>{
        this.prepararHeader(token)
        return this.http.get(this.url + "usuario-perfil/administrador/ver/" + id, {headers: this.headersAddWithToken});
    }

    public getUsuarioTodasLasPartidas(id:number, token:string):Observable<any>{
        this.prepararHeader(token)
        return this.http.get(this.url + "admin/partidas-usuario/" + id, {headers: this.headersAddWithToken});
    }

    public deleteAdministrador(id:number, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.delete(this.url + "usuario-borrar/administrador/" + id, {headers: this.headersAddWithToken});       
    }
}
