import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { ClassroomService } from 'src/app/shared/services/classroom/classroom.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent, RouterOutlet],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit{

  isLoadedClassroom = false;

  constructor(
    private classroomService: ClassroomService
  ){}

  ngOnInit(){
    this.classroomService.selectedClassId.subscribe(
      (data)=>{
        if(data){
          this.isLoadedClassroom = true;
        }else{
          this.isLoadedClassroom = false;
        }
      }
    )
  }
}
