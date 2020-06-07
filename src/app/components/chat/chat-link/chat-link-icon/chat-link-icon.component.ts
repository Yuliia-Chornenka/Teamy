import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-link-icon',
  templateUrl: './chat-link-icon.component.html',
  styleUrls: ['./chat-link-icon.component.scss']
})
export class ChatLinkIconComponent implements OnInit {
  @Input() link: string;
  iconType = 'generic';
  iconName = 'link';

  constructor() { }

  ngOnInit(): void {
    this.checkLink();
  }

  checkLink() {
    if (this.link.match(/^https:\/\/(www.)?github\.com/gm)) {
      this.iconType = 'custom';
      this.iconName = 'git.png';
    }

    if (this.link.match(/^https:\/\/(www.)?travis-ci\.org/gm)) {
      this.iconType = 'custom';
      this.iconName = 'travis.png';
    }

    if (this.link.match(/^https:\/\/(www.)?.*\.heroku\.com/gm)) {
      this.iconType = 'custom';
      this.iconName = 'heroku.png';
    }
  }
}
