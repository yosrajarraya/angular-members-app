import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from 'src/Services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../Models/Member';
@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
//declaration de la variable Form de type FormGroup
form!: FormGroup;
//initialiser le form
  constructor( private MS :MemberService ,  private router: Router,
  private route: ActivatedRoute) { }

ngOnInit(): void {
  // recuperer id de la route
  // si id existe => edit (getMemberById) 
  //sinon => create (initialiser le form)
  this.form = new FormGroup({
      cin: new FormControl(null),
      name: new FormControl(null),
      type: new FormControl(null),
      createdDate: new FormControl(new Date())
    });

    // Récupérer l'id depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');
console.log("ID récupéré :", id);
    // Si id existe => mode modification
    if (id) {
      this.MS.getMemberById(id).subscribe((res: Member) => {
            console.log("DATA récupérée :", res);

        this.form.patchValue(res);
      });
    }
  }

//sub
  
 sub() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // UPDATE
      this.MS.updateMember(id, this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      // CREATE
      this.MS.AddMember(this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }

  }

}
