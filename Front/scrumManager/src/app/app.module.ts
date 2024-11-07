import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NoopAnimationPlayer } from '@angular/animations';
@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    NoopAnimationPlayer,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }