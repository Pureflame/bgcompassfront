import { Injectable } from "@angular/core";
import { Usuario } from "../Models/usuario";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class UsuarioService {
    //public usuariosBD :Array<Usuario> = []
    public url = "http://127.0.0.1:8000/api/";
    
    public headersAddNoToken = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    public headersAddWithToken = new HttpHeaders();

// {headers: this.headersAdd}


    constructor( private http: HttpClient ){}

    public prepararHeader(token:string){
        return this.headersAddWithToken = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
    }

    testUsuario(){
        return "funciona usuario service";
    }

    // nombre, contrasenha, correo, tipo
    public registrarUsuario(usuarioNuevo:Usuario, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.post(this.url + "usuario-registro/usuario", usuarioNuevo, {headers: this.headersAddWithToken});
    }



    public getUsuarioDatos(id:number, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.get(this.url + "usuario-perfil/usuario/ver/" + id, {headers: this.headersAddWithToken});
    }
    
    public getUsuarioPartidas(id:number, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.get(this.url + "usuario-perfil/usuario/partidas/" + id, {headers: this.headersAddWithToken});
    }

    public getUsuarioDiscusiones(id:number, token:string):Observable<any> {
        this.prepararHeader(token)
        return this.http.get(this.url + "usuario-perfil/usuario/discusiones/" + id, {headers: this.headersAddWithToken});
    }

    public deleteUsuario(id:number, token:string):Observable<any>{
        this.prepararHeader(token)
        return this.http.delete(this.url + "usuario-borrar/usuario/" + id, {headers: this.headersAddWithToken});     
    }
}
