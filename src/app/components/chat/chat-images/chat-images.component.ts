import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ITeamRes } from '../../../models/team-res';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat-images',
  templateUrl: './chat-images.component.html',
  styleUrls: ['./chat-images.component.scss']
})
export class ChatImagesComponent implements OnInit {

  imageObj: File;
  imageName: string;
  isImgTooBig = false;
  isImgUploadError = false;
  isNewPhoto = false;
  chatTeamImages: Array<string>;
  teamId: string;

  constructor(private route: ActivatedRoute,
              private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => (this.teamId = params.id));
    this.getTeamData();
  }

  getTeamData(): void {
    this.chatService.getTeam(this.teamId).then((res: ITeamRes) => {
      this.chatTeamImages = res.team.images;
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
    this.chatService.imageUpload(this.teamId, imageForm).subscribe({
      next: (res) => {
        this.chatTeamImages.push(res.image);
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
