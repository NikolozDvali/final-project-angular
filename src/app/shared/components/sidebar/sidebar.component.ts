import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDataService } from '../../services/accountData/account-data.service';
import { ClassNames } from '../../interfaces';
import { ClassroomService } from '../../services/classroom/classroom.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  classes: ClassNames[] = [];
  name: string = '';
  status: string = 'Student';
  selectedClassId = '';

  constructor(
    private accountService: AccountDataService,
    private classroomService: ClassroomService,
    private router: Router
  ) {}

  ngOnInit() {
    this.accountService.loggedInAccount.subscribe(
      (newAcc)=>{
        this.classes = newAcc?.account_classes || [];
        this.name = newAcc?.account_name || '';
        this.status = newAcc?.account_type || "Student";
      }
    )
    this.classroomService.selectedClassId.subscribe(
      (newId)=>{
        this.selectedClassId = newId || '';
      }
    )
  }

  setSelectedClass(id: string){
    this.classroomService.setSelectedClassId(id)
  }

  logout(){
    this.accountService.logout();
    this.router.navigate(['/auth/login']);
  }
}
