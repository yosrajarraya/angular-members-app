import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
//ordre intervient dans le routage : les routes sont évaluées dans l'ordre où elles sont définies, la première route qui correspond à l'URL demandée est utilisée pour afficher le composant associé
//toujour ** au dessous de toutes les routes pour éviter les conflits de routage
const routes: Routes = [
  {
    path: 'create',
    pathMatch: 'full',
    component: MemberFormComponent
  },
  {
  path: '',
  pathMatch: 'full',
  component: MemberComponent
  },
  {// : c'est définie id dynamique qui peut prendre n'importe quelle valeur, on peut acceder a cette valeur dans le composant avec ActivatedRoute
    path: 'edit/:id',
    pathMatch: 'full',
    component: MemberFormComponent
  },
  {
    path: '**',
    component: MemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
