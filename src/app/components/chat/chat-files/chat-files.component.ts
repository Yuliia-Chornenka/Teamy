import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ITeamRes } from '../../../models/team-res';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat-files',
  templateUrl: './chat-files.component.html',
  styleUrls: ['./chat-files.component.scss']
})
export class ChatFilesComponent implements OnInit {

  fileObj: File;
  fileName: string;
  isFileTooBig = false;
  isFileUploadError = false;
  isNewFile = false;
  chatTeamFiles: Array<string>;
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
      this.chatTeamFiles = res.team.files;
    });
  }

  onFilePicked(event: Event): void {
    this.fileObj = (event.target as HTMLInputElement).files[0];
    this.fileName = this.fileObj.name;
    this.isNewFile = true;
  }

  onFileUpload() {
    const fileForm = new FormData();
    fileForm.append('image', this.fileObj);
    this.chatService.fileUpload(this.teamId, fileForm).subscribe({
      next: (res) => {
        this.chatTeamFiles.push(res.file);
        this.isFileTooBig = false;
        this.isFileUploadError = false;
        this.isNewFile = false;
        this.fileName = '';
      },
      error: (err) => {
        if (err.status === 413) {
          this.isFileTooBig = true;
        } else {
          this.isFileUploadError = true;
        }
      }
    });
  }
}
