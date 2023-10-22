import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageControlService } from 'src/app/features/pages/services/pageControl/page-control.service';
import { Router } from '@angular/router';
import { AccountDataService } from '../../services/accountData/account-data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  selectedPage = 'posts';
  accountStatus = 'Student';
  isInClassroom = false;

  constructor(
    private pageService: PageControlService,
    private router: Router,
    private accountService: AccountDataService
  ){}

  ngOnInit() {
    this.pageService.getPage().subscribe(
      (page)=>{
        this.selectedPage = page
      }
    )
    this.accountService.loggedInAccount.subscribe(
      (acc)=>{
        this.accountStatus = acc?.account_type || "Student";
        const classes = acc?.account_classes;
        if(classes && classes?.length>0){
          this.isInClassroom = true;
        }
      }
    )
  }

  setSelectedPage(page: string){
    this.pageService.updatePage(page);

    const currentUrl = this.router.url;
    const urlParts = currentUrl.split('/');
    urlParts[urlParts.length - 1] = page;
    const newUrl = urlParts.join('/');
    this.router.navigateByUrl(newUrl);
  }
  
}
