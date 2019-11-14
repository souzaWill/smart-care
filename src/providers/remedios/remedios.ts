import { Injectable } from '@angular/core';
import { Remedio } from '../../app/models/remedio';
import { DatabaseProvider } from '../database/database';
import { ToastController } from 'ionic-angular';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class RemediosProvider {

  constructor(public toastCtrl: ToastController, private dbProvider: DatabaseProvider) { }

  public insert(remedio: Remedio) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'INSERT INTO remedios (nome, usuario_id, quantidade, tipo, intervalo, imagem) values (?, ?, ?, ?, ?, ?)';
        let data = [remedio.nome, remedio.usuario_id, remedio.quantidade, remedio.tipo, remedio.intervalo, remedio.imagem];

        return db.executeSql(sql, data)
          .catch((e) => {
            console.error(e);
            // const toast = this.toastCtrl.create({
            //   message: e,
            //   duration: 23000,
            //   position: 'bottom'
            // });
            // toast.present();
          });
      })
      .catch((e) => {
        const toast = this.toastCtrl.create({
          message: e,
          duration: 23000,
          position: 'bottom'
        });
        toast.present();
      });
  }

  /**
   * 
   * @param id busca pelo id do usuario os remedios que ele cadastrou
   * @returns array de remedios
   */
  public getByIdUsuario(id) {
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      return db.executeSql('SELECT * FROM remedios WHERE usuario_id = ?', [id])
        .then((data) => {
          let remedios = [];
          for (let i = 0; i < data.rows.length; i++) {
            let remedio = data.rows.item(i);
            remedios.push(remedio);
          }
          return remedios;
        })
        .catch((e) => console.error(e));
    })
      .catch((e) => console.error(e + " Erro no banco"));

  }
  /**
   * 
   * @param id busca pelo id do usuario os remedios que ele cadastrou
   * @returns array de remedios
   */
  public getById(id) {
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      console.log(id);
      return db.executeSql('SELECT * FROM remedios WHERE id = ?', [id])
        .then((data) => {
          for (let i = 0; i < data.rows.length; i++) {
            var remedio = data.rows.item(0);
            console.log(remedio);
          }
          return remedio;
        })
        .catch((e) => console.error(e));
    })
      .catch((e) => console.error(e + " Erro no banco"));

  }

  public delete(id) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'DELETE FROM remedios WHERE id = ?';
        let data = [id];

        return db.executeSql(sql, data).catch((e) => console.error(e))

      }).catch((e) => console.error(e));
  }

  public getEnding(id){
    return this.dbProvider.getDB()
    .then((db : SQLiteObject) => {
      let sql = 'select * from remedios where quantidade = (select min(quantidade) from remedios) and usuario_id = ?';
      let data = [id]
      
      return db.executeSql(sql,data)
      .then((data) => {
        let remedios = [];
          for (let i = 0; i < data.rows.length; i++) {
            let remedio = data.rows.item(i);
            if (remedio.quantidade < 5) {
              remedios.push(remedio);
            }
          }
          return remedios;
      })
      .catch();
      }
    )
    .catch((e) => console.error(e))
  }

  


}
