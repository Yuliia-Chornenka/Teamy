import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  imageObj: File;
  imageUrl: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
  }

  onImagePicked(event: Event): void {
    // const FILE = (event.target as HTMLInputElement).files[0];
    // this.imageObj = FILE;
    this.imageObj = (event.target as HTMLInputElement).files[0];
    // this.imageObj = FILE;
  }

  onImageUpload() {
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.userService.imageUpload(imageForm).subscribe(res => {
      this.imageUrl = res.image;
    });
  }


}
