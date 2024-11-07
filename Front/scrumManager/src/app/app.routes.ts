import { RouterModule, Routes } from '@angular/router';
import { PageTableauComponent } from './components/tableau/page-tableau/page-tableau.component';
import { PageBacklogComponent } from './components/backlog/page-backlog/page-backlog.component';
import { NgModule } from '@angular/core';
import { PageProjectComponent } from './components/project/page-project/page-project.component';

export const routes: Routes = [
    { path: 'project/:project', component: PageProjectComponent },
    { path: 'tableau', component: PageTableauComponent },
    { path: 'backlog/:project', component: PageBacklogComponent },
    { path: 'tableau/:project', redirectTo: '/tableau', pathMatch: 'full' },
    { path: '', redirectTo: '/project/1', pathMatch: 'full' }]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }