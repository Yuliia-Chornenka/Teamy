import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

interface IAuthor {
  name: string;
  photo: string;
  email: string;
}

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {
  @Input() authorId: string;

  public author: IAuthor;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser(this.authorId).subscribe((user) => {
      this.author = { name: user.name, photo: user.photo, email: user.email };
    });
  }
}
