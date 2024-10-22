import { RouterModule, Routes } from '@angular/router';
import { PageTableauComponent } from './components/tableau/page-tableau/page-tableau.component';
import { PageBacklogComponent } from './components/backlog/page-backlog/page-backlog.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'tableau', component: PageTableauComponent },
    { path: 'backlog', component: PageBacklogComponent },
    { path: '', redirectTo: '/tableau', pathMatch: 'full' }]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }