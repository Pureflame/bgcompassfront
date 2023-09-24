import { Injectable } from "@angular/core";

import { AdministradorService } from "./administrador.service";
import { UsuarioService } from "./usuario.service";

import { Administrador } from "../Models/administrador";
import { Usuario } from "../Models/usuario";


@Injectable()
export class CurrentUserService {
    private currentUser: string = ""
    private typeUser: string = ""
    private emailUser: string = ""

    private administradoresDB :Array<Administrador> = []
    private usuariosBD :Array<Usuario> = []

    constructor(    
        private administradorService: AdministradorService,
        private usuarioService: UsuarioService
        ){}

    testCurrentUser(){
        return "funciona current user service";
    }

    public getCurrentUser():Administrador | Usuario | undefined | void {

        // Actualizar con posibles nuevos valores en las bases de datos
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
         
        console.log("usuario logueado actualmente: " + sessionStorage.getItem("userActivoEmail")!)

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

    public getCurrentUserToken(){
        return sessionStorage.getItem("userActivoToken")
    }

    public getCurrentUserType(){
        return sessionStorage.getItem("userActivoTipo")
    }

    public getCurrentUserEmail(){
        return sessionStorage.getItem("userActivoEmail")
    }

    public setCurrentUser(token:string, typeUser:string, email:string):void {
        this.currentUser = token;
        this.typeUser = typeUser;
        this.emailUser = email;

        //this.userTypeCurrentUser(id)
        sessionStorage.removeItem("userActivoToken")
        sessionStorage.setItem("userActivoToken", token)

        sessionStorage.removeItem("userActivoTipo")
        sessionStorage.setItem("userActivoTipo", typeUser)

        sessionStorage.removeItem("userActivoEmail")
        sessionStorage.setItem("userActivoEmail", email)
    }

    public logoutCurrentUser():void {
        this.currentUser = "";
        this.typeUser = "";
        this.emailUser = "";

        sessionStorage.removeItem("userActivoToken")
        sessionStorage.removeItem("userActivoTipo")
        sessionStorage.removeItem("userActivoEmail")
    }

}
