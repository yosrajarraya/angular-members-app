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

AddMember(member: Member):Observable<void> {
  //code pour envoyer une requete HTTP POST vers le backend pour ajouter un membre
  return this.http.post<void>('http://localhost:3000/members', member);
   }
   deleteMember(id: number): Observable<void> {
    //code pour envoyer une requete HTTP DELETE vers le backend pour supprimer un membre
    return this.http.delete<void>(`http://localhost:3000/members/${id}`);
  }

//implementation des methodes CRUD qui genereent des requetes HTTP vers le backend
getMemberById(id: string): Observable<Member> {
  return this.http.get<Member>(`http://localhost:3000/members/${id}`);
}

updateMember(id: string, member: Member): Observable<void> {
  return this.http.put<void>(`http://localhost:3000/members/${id}`, member);
}
}