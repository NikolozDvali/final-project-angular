import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { isLoggedInGuard } from 'src/app/shared/guards/is-logged-in/is-logged-in.guard';
import { isLoggedOutGuard } from 'src/app/shared/guards/is-logged-out/is-logged-out.guard';
import { AccountDataService } from 'src/app/shared/services/accountData/account-data.service';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {
  constructor(
    private router: Router,
    private accountService: AccountDataService
  ) { }

  ngOnInit(): void {
    if (this.accountService.isLoggedIn()) {
      this.router.navigate(['/main']);
    } else{
      this.router.navigate(['/auth']);
    }
  }
}
