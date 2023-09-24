import { Injectable } from "@angular/core";
import { Usuario } from "../Models/usuario";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class UsuarioService {
    //public usuariosBD :Array<Usuario> = []
    public url = "http://127.0.0.1:8000/api/";
    
    public headersAdd = new HttpHeaders({
        'Content-Type': 'application/json'
    });
// {headers: this.headersAdd}


    constructor( private http: HttpClient ){}

    testUsuario(){
        return "funciona usuario service";
    }

    public getUserList():Observable<any>{
        return this.http.get(this.url + "usuarios/list");
    }

    public getUsuario(id:number):Observable<any> {
        return this.http.get(this.url + "usuario-perfil/usuario/ver/" + id, {headers: this.headersAdd});
    }
    
    // nombre, contrasenha, correo, tipo
    public registrarUsuario(usuarioNuevo:Usuario):Observable<any> {
        return this.http.post(this.url + "usuario-registro/usuario", usuarioNuevo, {headers: this.headersAdd});
    }

    public deleteUsuario(id:number):Observable<any>{
        return this.http.delete(this.url + "usuario-borrar/usuario/" + id, {headers: this.headersAdd});     
    }
}
