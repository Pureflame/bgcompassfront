import { Injectable } from "@angular/core";
import { Administrador } from "../Models/administrador";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AdministradorService {
    public url = "http://127.0.0.1:8000/api/";
    
    public headersAdd = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor( private http: HttpClient ){}

    testAdministrador(){
        return "funciona administrador service";
    }

    public getAdminList():Observable<any>{
        return this.http.get(this.url + "administrador/list");
    }

    public getAdministrador(id:number):Observable<any>{
        return this.http.get(this.url + "usuario-perfil/administrador/ver/" + id, {headers: this.headersAdd});
    }

    // dni, nombre, apellidos, contrasenha, correo, telefono, tipo
    public registrarAdministrador(adminNuevo:Administrador):Observable<any> {
        return this.http.post(this.url + "usuario-registro/administrador", adminNuevo, {headers: this.headersAdd});
    }

    public deleteAdministrador(id:number):Observable<any> {
        return this.http.delete(this.url + "usuario-borrar/administrador/" + id, {headers: this.headersAdd});       
    }
}
