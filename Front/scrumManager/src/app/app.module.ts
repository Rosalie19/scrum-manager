import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroHome } from '@ng-icons/heroicons/outline'; 
import { BacklogSprintComponent } from './components/backlog/backlog-sprint/backlog-sprint.component';
import { HeaderComponent } from './components/header/header.component';
@NgModule({
  declarations: [
    HeaderComponent,
    BacklogSprintComponent
  ],
  imports: [
    HttpClientModule,
    NgIconsModule.withIcons({ heroHome })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }