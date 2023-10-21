import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { ClassroomService } from 'src/app/shared/services/classroom/classroom.service';
import { Grade } from 'src/app/shared/interfaces';
import { AccountDataService } from 'src/app/shared/services/accountData/account-data.service';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

  grades: Grade[] = [];

  constructor(
    private elementRef: ElementRef,
    private accountService: AccountDataService,
    private classroomService: ClassroomService
  ) {}

  ngOnInit(){
    this.classroomService.selectedClassData.subscribe(
      (newData)=>{
        this.grades = (newData?.class_members.find(elem => elem.member_id == this.accountService.getAccountData()?.account_id)?.member_grades || []);
      }
    )
  }

  @HostListener('mousewheel', ['$event'])
  onMouseWheel(event: any) {
    if (this.elementRef.nativeElement.querySelector('.grades-container:hover')) {
      this.elementRef.nativeElement.querySelector('.grades-container').scrollLeft += event.deltaY/10;
    }
  }
}
