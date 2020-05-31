import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { IUser } from '../../Models/user.model';
import { IProject } from '../../Models/project';
import { Store } from '@ngrx/store';
import { LoadingState } from 'src/app/reducers/loading/loading.reducer';
import { LoadingStartAction, LoadingFinishAction } from 'src/app/reducers/loading/loading.actions';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  imageObj: File;
  imageName: string;
  imageUrl: string;
  user: IUser;
  isAccountOpen = false;
  isImgTooBig = false;
  isImgUploadError = false;
  isServerWork = true;
  isNewPhoto = false;
  userProjects: Array<IProject> = [];

  constructor(private userService: UserService, private store$: Store<LoadingState>) {
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.store$.dispatch(new LoadingStartAction());

    this.userService.getUserData().subscribe({
      next: (user: IUser) => {
        this.user = user;
        this.imageUrl = user.photo;
        this.userProjects = [...user.projects.mentor, ...user.projects.member];
      },
      error: (err) => {
        this.isServerWork = false;
      },
      complete: () => {
        this.store$.dispatch(new LoadingFinishAction());
      }
    });
  }

  onImagePicked(event: Event): void {
    this.imageObj = (event.target as HTMLInputElement).files[0];
    this.imageName = this.imageObj.name;
    this.isNewPhoto = true;
  }


  onImageUpload() {
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.userService.imageUpload(imageForm).subscribe({
      next: (res) => {
        this.imageUrl = res.image;
        this.isImgTooBig = false;
        this.isImgUploadError = false;
        this.isNewPhoto = false;
        this.imageName = '';
      },
      error: (err) => {
        if (err.status === 413) {
          this.isImgTooBig = true;
        } else {
          this.isImgUploadError = true;
        }
      }
    });
  }
}
