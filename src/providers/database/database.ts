import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';


/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  /**
   * pega o arquivo do banco sqlite
   */
  public getDB(){
    return this.sqlite.create({
      name: 'smartCare.db',
      location: 'default'
    });
    
  }

  /**
   * cria o banco
   */
  public createDatabase(){
    return this.getDB()
    .then((db:SQLiteObject)=> {
      this.createTables(db);
    })
    .catch(e => console.error(e));
  }

  /**
   * 
   * @param db 
   * cria as tabelas no banco passado no parametro db
   */
  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS usuarios (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT, email TEXT UNIQUE, senha TEXT, imagem TEXT);'],
      ['CREATE TABLE IF NOT EXISTS remedios (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT, quantidade int , tipo string Not null, usuario_id int, intervalo int, imagem TEXT, FOREIGN KEY(usuario_id) REFERENCES usuarios(id))'],
      ['CREATE TABLE IF NOT EXISTS alarmes (id integer primary key AUTOINCREMENT NOT NULL, remedio_id int NOT NULL, usuario_id int NOT NULL, observacao TEXT, data DATE NOT NULL, hora TIME NOT NULL, dosagem int, FOREIGN KEY(usuario_id) REFERENCES usuarios(id),FOREIGN KEY(remedio_id) REFERENCES remedios(id))']
    
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

}
