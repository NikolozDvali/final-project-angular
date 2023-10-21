import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageControlService } from 'src/app/features/pages/services/pageControl/page-control.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  selectedPage = 'posts';

  constructor(
    private pageService: PageControlService,
    private router: Router
  ){}

  ngOnInit() {
    this.pageService.getPage().subscribe(
      (page)=>this.selectedPage = page,
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
