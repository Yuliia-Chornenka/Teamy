import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoading } from 'src/app/reducers/loading/loading.selectors';
import { LoadingState } from 'src/app/reducers/loading/loading.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  public loading$: Observable<boolean> = this.store$.pipe(select(selectLoading));


  constructor(private authService: AuthenticationService, private store$: Store<LoadingState>) { }

  ngOnInit(): void {
    this.authService.getValue().subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  onLogoutClick() {
    this.authService.logOut();
    this.authService.setValue(this.authService.loggedIn());
  }
}
