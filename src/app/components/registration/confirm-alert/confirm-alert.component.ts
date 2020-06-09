import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm-register',
  template: `
      <div class="confirmation">
        <p>You are successfully registered.</p>
        <p>Now login please. 😊</p>
      </div>
  `,
  styles: [`
    .confirmation {
      padding: 10px;
    }
  `],
})
export class ConfirmRegisterComponent {}
