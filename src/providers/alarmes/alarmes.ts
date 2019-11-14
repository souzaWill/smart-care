import { Injectable } from '@angular/core';
import { Alarme } from '../../app/models/alarme';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { RemediosProvider } from '../remedios/remedios';

@Injectable()
export class AlarmesProvider {
  remedio_nome;
  constructor(private remedio : RemediosProvider  ,private dbProvider : DatabaseProvider, private localNotification : LocalNotifications ) { }

  public insert(alarme : Alarme) {
    this.remedio.getById(alarme.remedio_id)
        .then((data) => {
          this.remedio_nome = data.nome;
        })
    return this.dbProvider.getDB().then((db : SQLiteObject) => {
      let sql = 'insert into alarmes ( remedio_id, usuario_id, observacao, data, hora, dosagem ) values(?,?,?,?,?,?)';
      let data = [alarme.remedio_id, alarme.usuario_id, alarme.observacao, alarme.data, alarme.hora, alarme.dosagem]
      
      db.executeSql(sql,data)
      .then((data) => {
        var date = new Date(alarme.data+" "+alarme.hora);
        let notificacao;
        
    notificacao = {
      id: data.insertId,
      title: this.remedio_nome,
      text: "hora de tomar "+ alarme.dosagem+ " " + alarme.remedio_id ,
      trigger: {at: date},
      actions: [
        { id: 'yes', title: 'Yes' },
        { id: 'no',  title: 'No' }
      ],
      sound: 'file://assets/sound/sound.mp3',
      vibrate: true
    }


    this.localNotification.schedule(notificacao);
    

      })
      .catch((e) => console.error(e))
    }).catch((e) => console.error(e));
  }

  /**
   * @param usuario_id : id do usuario logado
   * @returns alarmes : lista de Alarmes
   */
  public getbyUser(id : number){
    return this.dbProvider.getDB().then((db : SQLiteObject) => {
      let sql = "select a.id as id, b.nome as remedio_id, a.usuario_id as usuario_id, a.observacao as observacao, a.data as data, a.hora as hora, a.dosagem as dosagem from alarmes as a join remedios as b on a.remedio_id = b.id where a.usuario_id = ?";
      let data = [id];

      return db.executeSql(sql,data)
      .then((data) => {
        let alarmes = [];
          for (let i = 0; i < data.rows.length; i++) {
            let remedio = data.rows.item(i);
            alarmes.push(remedio);
          }
          return alarmes;
      })
      .catch();
    })
  }

  public delete(id: number){
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'DELETE FROM alarmes WHERE id = ?';
        let data = [id];

        return db.executeSql(sql, data).catch((e) => console.error(e))

      }).catch((e) => console.error(e));
  }

  public getNextAlarme(id){
    return this.dbProvider.getDB().then((db:SQLiteObject) => {
      let sql = "select a.id as id, b.nome as remedio_id, a.usuario_id as usuario_id, a.observacao as observacao, a.data as data, a.hora as hora, a.dosagem as dosagem from alarmes as a join remedios as b on a.remedio_id = b.id where a.hora = (select min(hora) from alarmes) and a.data = (select min(data) from alarmes) and a.usuario_id = ?";
      let data = [id];
      return db.executeSql(sql,data).
      then((data) => {
        let alarmes = [];
          for (let i = 0; i < data.rows.length; i++) {
            let remedio = data.rows.item(i);
            alarmes.push(remedio);
          }
          return alarmes;
      })
      .catch((e) => console.error(e))
    })
  }


}
