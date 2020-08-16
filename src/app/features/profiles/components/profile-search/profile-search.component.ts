import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.scss'],
})
export class ProfileSearchComponent {
  @Input() requestInProgress = false;
  @Output() searchSubmit = new EventEmitter<string>();

  searchTerm = new FormControl('');

  submit(): void {
    if (this.searchTerm.value.trim()) {
      this.searchSubmit.emit(this.searchTerm.value);
    }
  }
}
