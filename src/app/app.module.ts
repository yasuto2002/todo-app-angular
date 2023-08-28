import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { TodoModule } from './todo/todo.module';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { ErrorDashboardModule } from './error-dashboard/error-dashboard.module';
import { NgxsModule } from '@ngxs/store';
import { ErrorState } from './store/eroor/error.state';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatTabsModule,
    ErrorDashboardModule,
    NgxsModule.forRoot([ErrorState]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
