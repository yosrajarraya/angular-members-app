import { Component, OnInit } from '@angular/core';
import { Member } from '../Models/Member';
import { MemberService } from 'src/Services/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  //injection de dependance : mecanisme qui assure le découplage entre les composants et les services
  //un composant peut demander une instance d'un service sans se soucier de sa creation ou de sa gestion
  //le service est injecté dans le constructeur du composant
  constructor( private MS :MemberService) { }//on a injecté MS dans member component pour pouvoir utiliser les methodes de MS dans member component
  dataSource: Member[] = [];
 displayedColumns: string[] = ['id', 'name', 'cin', 'type', 'createdDate','actions'];

 ngOnInit(): void {
  this.MS.GetAllMembers().subscribe(
    (res: Member[]) => {
       console.log(res);
      this.dataSource = res; 
    }
  );
}


}
