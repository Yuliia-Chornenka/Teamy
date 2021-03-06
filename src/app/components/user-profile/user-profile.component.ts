import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { LoadingState } from 'src/app/reducers/loading/loading.reducer';
import { LoadingStartAction, LoadingFinishAction } from 'src/app/reducers/loading/loading.actions';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user.model';
import { IProject } from '../../models/project';
import { DeleteProfilePopupComponent } from './delete-profile-popup/delete-profile-popup.component';
import { ChangePasswordPopupComponent } from './change-password-popup/change-password-popup.component';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.scss' ]
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
  isSuccessDeleted = true;

  constructor(private userService: UserService, private store$: Store<LoadingState>,
              public dialog: MatDialog, private authService: AuthenticationService) {
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
        this.userProjects = [ ...user.projects.mentor, ...user.projects.member ];
      },
      error: (err) => {
        this.isServerWork = false;
        this.store$.dispatch(new LoadingFinishAction());
      },
      complete: () => {
        this.store$.dispatch(new LoadingFinishAction());
      }
    });
  }

  onImagePicked(event: Event): void {
    this.isImgTooBig = false;
    this.imageObj = (event.target as HTMLInputElement).files[0];
    if (this.imageObj) {
      this.imageName = this.imageObj.name;
    } else {
      this.imageName = '';
      this.isImgTooBig = false;
    }
    this.isNewPhoto = !!this.imageName;
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
          this.isNewPhoto = false;
        } else {
          this.isImgUploadError = true;
        }
      }
    });
  }

  deleteAccount() {
    this.isSuccessDeleted = true;
    const dialogRef = this.dialog.open(DeleteProfilePopupComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store$.dispatch(new LoadingStartAction());

        this.userService.deleteUserAccount().subscribe({
          next: (response: object) => {
            this.authService.logOut();
            this.authService.setValue(this.authService.loggedIn());
          },
          error: (err) => {
            this.isSuccessDeleted = false;
            this.store$.dispatch(new LoadingFinishAction());
          },
          complete: () => {
            this.store$.dispatch(new LoadingFinishAction());
          }
        });
      }
    });
  }

  changePassword(): void {
    this.dialog.open(ChangePasswordPopupComponent);
  }
}
