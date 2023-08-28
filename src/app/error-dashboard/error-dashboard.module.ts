import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { NgxsModule } from '@ngxs/store';
import { ErrorState } from '../store/eroor/error.state';

@NgModule({
  declarations: [ErrorComponent],
  imports: [CommonModule, NgxsModule.forRoot([ErrorState])],
})
export class ErrorDashboardModule {}
