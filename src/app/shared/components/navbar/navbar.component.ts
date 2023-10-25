import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageControlService } from 'src/app/features/pages/services/pageControl/page-control.service';
import { Router } from '@angular/router';
import { AccountDataService } from '../../services/accountData/account-data.service';
import { Subscription, map } from 'rxjs';
import { DeleteClassService } from '../../services/deleteClass/delete-class.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy{
  selectedPage = 'posts';
  accountStatus = 'Student';
  isInClassroom = false;

  private pageSubscription: Subscription | undefined;
  private accountSubscription: Subscription | undefined;

  constructor(
    private pageService: PageControlService,
    private router: Router,
    private accountService: AccountDataService,
    private cdr: ChangeDetectorRef,
    private deleteClassService: DeleteClassService
  ){}

  ngOnInit() {
   this.pageSubscription = this.pageService.getPage().subscribe(
      (page)=>{
        this.selectedPage = page
        this.cdr.markForCheck();
      }
    )
    this.accountSubscription = this.accountService.loggedInAccount.subscribe(
      (acc)=>{
        this.accountStatus = acc?.account_type || "Student";
        const classes = acc?.account_classes;
        if(classes && classes?.length>0){
          this.isInClassroom = true;
        }
        this.cdr.markForCheck();
      }
    )
  }

  ngOnDestroy(){
    this.pageSubscription?.unsubscribe();
    this.accountSubscription?.unsubscribe();
  }

  setSelectedPage(page: string){
    this.pageService.updatePage(page);

    const currentUrl = this.router.url;
    const urlParts = currentUrl.split('/');
    urlParts[urlParts.length - 1] = page;
    const newUrl = urlParts.join('/');
    this.router.navigateByUrl(newUrl);
  }

  deleteCurrentClassroom(){
    let confirmation = confirm("You are about to delete current classroom");
    if(confirmation){
      this.deleteClassService.deleteCurrentClass();

    }
  }
  
}
