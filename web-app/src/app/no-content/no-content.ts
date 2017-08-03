import { Component } from '@angular/core';

@Component({
  selector: 'no-content',
  styleUrls : ['./no-content.component.scss'],
  template: `
    <div class="errorContainer">
      <h1>404: page missing</h1>
    </div>
  `
})
export class NoContent {

}
