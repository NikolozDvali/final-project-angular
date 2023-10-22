import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost, Post } from 'src/app/shared/interfaces';
import { AccountDataService } from 'src/app/shared/services/accountData/account-data.service';
import { ClassroomService } from 'src/app/shared/services/classroom/classroom.service';
import { RandomService } from 'src/app/shared/services/random/random.service';

@Injectable({
  providedIn: 'root'
})
export class NewPostService {
  // This service must add new post
  // and tell classroom service to update data from db.
  private baseUrl = 'http://localhost:3000/classes';
  private classId: string = '';
  private currentPosts: IPost[] = [];
  private usedIds: string[] = [];

  constructor(
    private random: RandomService,
    private classroomService: ClassroomService,
    private http: HttpClient,
  ) { 
    classroomService.selectedClassData.subscribe(
      (data)=>{
        this.currentPosts = data?.class_posts || [];
        this.usedIds = this.currentPosts.map(elem=>elem.post_id);
        this.classId = data?.id || '';
      }
    )
  }

  addNewPost(post: Post){
    let randomId = this.random.generateRandomId(10);

    while(this.usedIds.includes(randomId)){
      randomId = this.random.generateRandomId(10);
    }

    const ipost: IPost = {...post, post_id: randomId};
    const fullPosts = [...this.currentPosts, ipost];

    const url = this.generateUrl();
    this.sendPatchRequest(fullPosts, url).subscribe();
  }

  private generateUrl(){
    return `${this.baseUrl}/${this.classId}`;
  }

  private sendPatchRequest(iposts: IPost[], url: string){
    return this.http.patch<IPost>(url, {class_posts: iposts});
  }
}
