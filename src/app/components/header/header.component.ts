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
    this.isLoggedIn = this.authService.loggedIn();
    // need to subscribe
  }

  onLogoutClick(){
    this.authService.logOut();
  }
}
