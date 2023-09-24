export class Mensaje{
    constructor(
        public texto_mensaje: string,
        public id_conversacion: number,
        public correo_usuario: string
    ){}
}