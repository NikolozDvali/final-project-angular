import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountDataService } from '../../services/accountData/account-data.service';

export const isTeacherGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountDataService)
  return accountService.isTeacher();
};
