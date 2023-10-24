import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostService } from '../../services/add-new-post/new-post.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateService } from '../../services/date/date.service';
import { Post } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-new-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NewPostFormComponent {

  constructor(
    private formBuilder: FormBuilder,
    private postService: NewPostService,
    private dateService: DateService,
    private cdr: ChangeDetectorRef
  ){}

  post(){
    const formData = this.postForm.value;

    const date = this.dateService.getCurrentDate();
    const post: Post = {
      post_title: formData.post_title || '', 
      post_text: formData.post_text || '',
      post_date: date,
    };

    this.postService.addNewPost(post);
    this.postForm.reset();
  }

  postForm = this.formBuilder.group({
    post_title: ['', Validators.required],
    post_text: ['', Validators.required],
  })
}
