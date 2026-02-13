import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/Models/Member';
//@override égale à decorator en TS(injectable est un decorator) 
//permet de declarer que le service accepte l'injection de dependance
//root : le service est disponible dans toute l'application par défaut
//injection de dependance : un composant peut demander une instance d'un service
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor( private http: HttpClient) {
  }
  GetAllMembers():Observable<Member[]> {
  //code pour envoyer une requete HTTP GET vers le backend pour recuperer tous les membres
  //http client.get('url/api/members') elle génerer les requetes HTTP
    return this.http.get<Member[]>('http://localhost:3000/members');

}
   }

//implementation des methodes CRUD qui genereent des requetes HTTP vers le backend

