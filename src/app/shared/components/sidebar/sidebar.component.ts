import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDataService } from '../../services/accountData/account-data.service';
import { ClassNames } from '../../interfaces';
import { ClassroomService } from '../../services/classroom/classroom.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  name: string = '';
  status: string = "Student";
  classes: ClassNames[] = [];

  constructor(
    private accountService: AccountDataService,
    private classroomService: ClassroomService
  ) {}

  ngOnInit(){
    const accountData = this.accountService.getAccountData();

    this.classes = accountData?.account_classes || [];
    if(this.classes.length > 0){
      this.classroomService.setNewChosenClass(this.classes[0].class_id);
    }

    this.name = accountData?.account_name || "";
    this.status = accountData?.account_type || "Student";
  }

}
