import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Usuario } from '../../app/models/usuario';



/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionProvider {

  constructor(public storage: Storage) { }

  create(usuario: Usuario, remember : boolean) {
    this.storage.set('usuario', usuario);
    this.storage.set('ContinuaLogado', remember);
  }

  get(): Promise<any> {
    return this.storage.get('usuario');
  }



  remove() {
    this.storage.remove('usuario');
    this.storage.remove('ContinuaLogado');
  }

  exist() {
    return this.storage.get('ContinuaLogado').then(keep => {
      return this.get().then(session => {
        console.log('resultado >>> ', session);
        if (session && keep) {
          console.log('resultado IF');
          return true;
        } else {
          console.log('resultado else');
          return false;
        }
      });
    });

  }

}
