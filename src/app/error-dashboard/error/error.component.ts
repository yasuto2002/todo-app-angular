import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { ErrorState } from 'src/app/store/eroor/error.state';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  @Select(ErrorState.eroorMes) mes$!: Observable<string>;

  constructor(private route: ActivatedRoute) {}
}
