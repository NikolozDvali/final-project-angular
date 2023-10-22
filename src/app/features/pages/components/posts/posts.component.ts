import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomService } from 'src/app/shared/services/classroom/classroom.service';
import { IClass, IPost } from 'src/app/shared/interfaces';
import { NewPostFormComponent } from '../../../new-post-form/components/new-post-form/new-post-form.component';
import { AccountDataService } from 'src/app/shared/services/accountData/account-data.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, NewPostFormComponent],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  classroomData: IClass | undefined;
  posts: IPost[] = [];
  accountStatus: string = "Student"
  
  constructor(
    private classroomService: ClassroomService,
    private accountService: AccountDataService
  ){}

  ngOnInit() {
    this.classroomService.selectedClassData.subscribe(
      (classdata)=>{
        this.classroomData = classdata;
        this.posts = classdata?.class_posts || [];
      }
    )

    this.accountService.loggedInAccount.subscribe(
      (data)=>{
        this.accountStatus = data?.account_type || 'Student';
      }
    )
  }
}
