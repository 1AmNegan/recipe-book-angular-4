import { Component, Output, EventEmitter } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService) { }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe((result) => {
      console.log('Recipe Saved');
    }, (err) => console.error(err));
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }
}
