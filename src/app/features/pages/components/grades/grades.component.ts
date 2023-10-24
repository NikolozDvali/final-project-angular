import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { ClassroomService } from 'src/app/shared/services/classroom/classroom.service';
import { Grade } from 'src/app/shared/interfaces';
import { AccountDataService } from 'src/app/shared/services/accountData/account-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class GradesComponent implements OnInit, OnDestroy {
  grades: Grade[] = [];
  selectedGrade: Grade | undefined;

  private classroomSubscription: Subscription | undefined;

  constructor(
    private elementRef: ElementRef,
    private accountService: AccountDataService,
    private classroomService: ClassroomService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(){
    this.classroomSubscription = this.classroomService.selectedClassData.subscribe(
      (newData)=>{
        this.grades = (newData?.class_members.find(elem => elem.member_id == this.accountService.getAccountData()?.id)?.member_grades || []);
        this.cdr.markForCheck();
        
      }
    )
  }

  ngOnDestroy(){
    this.classroomSubscription?.unsubscribe();
  }

  handleHover(grade: Grade){
    if(this.selectedGrade == grade){
      return;
    }
    this.setSelectedGrade(grade);
  }

  setSelectedGrade(grade: Grade) {
    this.selectedGrade = grade;
  }

  @HostListener('mousewheel', ['$event'])
  onMouseWheel(event: any) {
    if (this.elementRef.nativeElement.querySelector('.grades-container:hover')) {
      this.elementRef.nativeElement.querySelector('.grades-container').scrollLeft += event.deltaY/10;
    }
  }
}
