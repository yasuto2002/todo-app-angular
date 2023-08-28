import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ErrorAction } from './error.action';

export class ErrorStateModel {
  eroorMes = '';
}

@State<ErrorStateModel>({
  name: 'eroor',
  defaults: {
    eroorMes: '',
  },
})
@Injectable()
export class ErrorState {
  @Action(ErrorAction.Set)
  setErrorMes(ctx: StateContext<ErrorStateModel>, action: ErrorAction.Set) {
    ctx.patchState({ eroorMes: action.message });
  }

  @Selector()
  static eroorMes(state: ErrorStateModel) {
    return state.eroorMes;
  }
}
