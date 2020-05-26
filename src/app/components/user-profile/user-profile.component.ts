import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { IUser } from '../../Models/user.model';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  imageObj: File;
  // backgroundImg = 'https://teamy.s3.amazonaws.com/15904143344361.jpg';
  imageUrl: string;
  user: IUser;
  isAccountOpen = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserData().subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }

  onImagePicked(event: Event): void {
    this.imageObj = (event.target as HTMLInputElement).files[0];
  }

  onImageUpload() {
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.userService.imageUpload(imageForm).subscribe(res => {
      console.log(res);
      this.imageUrl = res.image;
    });
  }


}
