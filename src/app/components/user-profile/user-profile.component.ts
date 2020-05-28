import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { IUser } from '../../Models/user.model';


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

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserData().subscribe({
      next: (user: IUser) => {
            this.user = user;
            this.imageUrl = user.photo;
      },
      error: (err) => {
          this.isServerWork = false;
      }
    });
  }

  onImagePicked(event: Event): void {
    this.imageObj = (event.target as HTMLInputElement).files[0];
    this.imageName = this.imageObj.name;
  }


  onImageUpload() {
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.userService.imageUpload(imageForm).subscribe({
      next: (res) => {
        this.imageUrl = res.image;
        this.isImgTooBig = false;
        this.isImgUploadError = false;
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
