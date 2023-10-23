import { CanActivateFn } from '@angular/router';
import { AccountDataService } from '../../services/accountData/account-data.service';
import { inject } from '@angular/core';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountDataService)
  return accountService.isLoggedIn();
};
