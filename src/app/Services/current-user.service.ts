import { Injectable } from "@angular/core";

import { AdministradorService } from "./administrador.service";
import { UsuarioService } from "./usuario.service";

import { Administrador } from "../Models/administrador";
import { Usuario } from "../Models/usuario";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class CurrentUserService {
    public url = "http://127.0.0.1:8000/api/";
    public headersAddWithToken = new HttpHeaders();
    
    private currentUser: string = "";
    private typeUser: string = "";
    private emailUser: string = "";
    private userId: string = "";
    private juegoActual: string;

    private administradoresDB :Array<Administrador> =[]
    private usuariosBD :Array<Usuario> =[]

    constructor(    
        private http: HttpClient,
        private administradorService: AdministradorService,
        private usuarioService: UsuarioService
        ){
            //this.administradoresDB = []
            //this.usuariosBD = []
            //this.typeUser = ""
            this.juegoActual = "";
        }

    public prepararHeader(token:string){
        return this.headersAddWithToken = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
    }

    testCurrentUser(){
        return "funciona current user service";
    }

    public getCurrentUser():Administrador | Usuario | undefined | void {

        // Actualizar con posibles nuevos valores en las bases de datos
        //this.refrescarUsuarios();
         
        console.log("usuario logueado actualmente: " + sessionStorage.getItem("userActivoTipo")!)

        // Comprobar si es administrador
        if (sessionStorage.getItem("userActivoTipo") === "administrador") {
            return this.administradoresDB.find((element:any) => element.correo_admin == sessionStorage.getItem("userActivoEmail")!) as Administrador;
        }   

        // Comprobar si es usuario
        else if(sessionStorage.getItem("userActivoTipo") === "usuario"){
            return this.usuariosBD.find((element:any) => element.correo_usuario == sessionStorage.getItem("userActivoEmail")!) as Usuario;
        } 
        
        else {
            console.log("No hay usuario logueado actualmente")
        }
    }
/*
    public refrescarUsuarios(){
        this.administradorService.getAdminList().subscribe({
            next: (result)=>{
              this.administradoresDB = result["data"];
      
              
              console.log("ADMINISTRADORES:");
              console.log(this.administradoresDB);
            },
            error: (error)=>{console.log(error)}
        })

        this.usuarioService.getUserList().subscribe({
        next: (result)=>{
            this.usuariosBD = result["data"];
    
            
            console.log("USUARIOS:");
            console.log(this.usuariosBD);
        },
        error: (error)=>{console.log(error)}
        })
    }
*/
    public getCurrentUserToken(){
        return sessionStorage.getItem("userActivoToken")
    }

    public getCurrentUserType(){
        return sessionStorage.getItem("userActivoTipo")
    }

    public getCurrentUserEmail(){
        return sessionStorage.getItem("userActivoEmail")
    }

    public getCurrentUserId(){
        return sessionStorage.getItem("id")
    }

    public setCurrentUser(token:string, typeUser:string, email:string, id:string):void {
        this.currentUser = token;
        this.typeUser = typeUser;
        this.emailUser = email;
        this.userId = id;

        //this.userTypeCurrentUser(id)
        sessionStorage.removeItem("userActivoToken")
        sessionStorage.setItem("userActivoToken", token)

        sessionStorage.removeItem("userActivoTipo")
        sessionStorage.setItem("userActivoTipo", typeUser)

        sessionStorage.removeItem("userActivoEmail")
        sessionStorage.setItem("userActivoEmail", email)

        sessionStorage.removeItem("id")
        sessionStorage.setItem("id", id)
    }

    public logoutCurrentUser():void {
        this.currentUser = "";
        this.typeUser = "";
        this.emailUser = "";
        this.userId = "";

        sessionStorage.removeItem("userActivoToken")
        sessionStorage.removeItem("userActivoTipo")
        sessionStorage.removeItem("userActivoEmail")
        sessionStorage.removeItem("id")
    }

    public getActualUserData(correo:string, token:string):Observable<any>{
        this.prepararHeader(token)
        let parametroGet = new HttpParams().set("correo", correo)
        return this.http.get(this.url + "usuario-actual/ver", {headers: this.headersAddWithToken, params: parametroGet});
    }

    public setJuegoActual(juego:string){
        this.juegoActual = juego;
    }

    public getJuegoActual(){
        return this.juegoActual;
    }

    public actualizarDatosUsuario(nombre:any,id:string,token:string):Observable<any>{
        this.prepararHeader(token)
        return this.http.put(this.url + "usuario-perfil/usuario/actualizar/"+id, nombre ,{headers: this.headersAddWithToken});
    }

    public actualizarDatosAdmin(nombre:any,id:string,token:string):Observable<any>{
        this.prepararHeader(token)
        return this.http.put(this.url + "usuario-perfil/administrador/actualizar/"+id, nombre ,{headers: this.headersAddWithToken});
    }

}
