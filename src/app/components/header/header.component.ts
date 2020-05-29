import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;

  constructor( private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.getValue().subscribe((value ) => {
      this.isLoggedIn = value;
    });
  }

  onLogoutClick(){
    this.authService.logOut();
    this.authService.setValue(this.authService.loggedIn());
  }
}
