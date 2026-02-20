import { Component, OnInit } from '@angular/core';
import { Member } from '../Models/Member';
import { MemberService } from 'src/Services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  //injection de dependance : mecanisme qui assure le découplage entre les composants et les services
  //un composant peut demander une instance d'un service sans se soucier de sa creation ou de sa gestion
  //le service est injecté dans le constructeur du composant
  constructor( private MS :MemberService , private dialog :MatDialog ) { }//on a injecté MS dans member component pour pouvoir utiliser les methodes de MS dans member component
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

delete(id: number): void {
  // lancer une boite de dialogue de confirmation avant de supprimer le membre
  let dialogRef = this.dialog.open(ConfirmDialogComponent, {
    height: '200px',
    width: '300px',
    data: { message: 'Êtes-vous sûr de vouloir supprimer ce membre ?' } // on peut passer un message si besoin
  });

  // attendre le res de user
  // if (click) = confirme =>
  dialogRef.afterClosed().subscribe((res) => {
    if (res) {
      // si user confirme la suppression => on supprime le membre
      this.MS.deleteMember(id).subscribe(() => {
        // en fais la requete get pour actualiser la liste des membres apres la suppression
        this.MS.GetAllMembers().subscribe((res: Member[]) => {
          this.dataSource = res;
        });
      });
    }
  });
}
}