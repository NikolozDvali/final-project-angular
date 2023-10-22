import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomService } from 'src/app/shared/services/classroom/classroom.service';
import { IClass, IPost } from 'src/app/shared/interfaces';
import { NewPostFormComponent } from '../../../new-post-form/components/new-post-form/new-post-form.component';

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
  
  constructor(
    private classroomService: ClassroomService
  ){}

  ngOnInit() {
    this.classroomService.selectedClassData.subscribe(
      (classdata)=>{
        this.classroomData = classdata;
        this.posts = classdata?.class_posts || [];
      }
    )
  }
}
