import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { Usuario } from '../../app/models/usuario'
import { ToastController } from 'ionic-angular';

@Injectable()
export class UsuariosProvider {

  constructor(public toastCtrl : ToastController, private dbProvider : DatabaseProvider) { }

  public insert(usuario: Usuario) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'INSERT INTO usuarios (nome, email, senha, imagem) values (?, ?, ?, ?)';
        let data = [usuario.nome, usuario.email, usuario.senha, usuario.imagem];

        return db.executeSql(sql, data)
          .catch((e) => {
            const toast = this.toastCtrl.create({
              message: e,
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          });
      })
      .catch((e) => {
        const toast = this.toastCtrl.create({
          message: e,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
  }

  public auth(email : string, senha: string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from usuarios where email = ? and senha = ?';
        let data = [email , senha];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.item(0) == null) {
              console.log('usuario nao autenticado');
              return false
            }
            else{
              console.log('usuario autenticado');
              return true;
            }
          })
          .catch((e) => {
            const toast = this.toastCtrl.create({
              message: e,
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          });
      })
      .catch((e) => {
        const toast = this.toastCtrl.create({
          message: e,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
  }

  public showSlide(){
    let status = localStorage.getItem("usuario");
    if (status == null) {
      localStorage.setItem("usuario", JSON.stringify(1));
      return true;
    } else {
      return false;
    }
  }

  public getByEmail(email : string){
    return this.dbProvider.getDB().then((db : SQLiteObject) => {
      return db.executeSql('SELECT * FROM usuarios WHERE email = ?', [email])
      .then((data) => {
        // let usuarios = [];
        // for(let i = 0; i < data.rows.length; i++){
        //   let usuario = data.rows.item(i);
        //   usuarios.push(usuario);
        // }
        // return usuarios;
        let usuarios = [];
        for(let i = 0; i < data.rows.length; i++){
          let usuario = data.rows.item(i);
          usuarios.push(usuario);
        }
        return usuarios;
      })
      .catch((e) => console.error('Erro na Consulta '+ e));
    })
    .catch((e) => console.error(e +" Erro no banco"));
  }

  

}
