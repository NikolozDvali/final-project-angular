import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDataService } from '../../services/accountData/account-data.service';
import { ClassNames } from '../../interfaces';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  classes: ClassNames[] = [];

  constructor(
    private accountService: AccountDataService
  ) {}

  ngOnInit(){
    this.classes = this.accountService.getAccountData()?.account_classes || [];
  }

}
