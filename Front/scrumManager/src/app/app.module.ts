import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgIconsModule } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroUsers } from '@ng-icons/heroicons/outline';
@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
    NgIconsModule.withIcons({ featherAirplay, heroUsers })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }