import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountDataService } from '../../services/accountData/account-data.service';

export const isStudentGuard: CanActivateFn = (route, state) => {
  const account = inject(AccountDataService)
  return !account.isTeacher();
};
