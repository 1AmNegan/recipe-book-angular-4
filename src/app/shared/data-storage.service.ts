import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';


@Injectable()
export class DataStorageService {

  constructor( private http: Http, private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put('https://ng-my-first.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  fetchRecipes() {
    this.http.get('https://ng-my-first.firebaseio.com/recipes.json').subscribe((response) => {
      console.log(response.json());
      this.recipeService.setRecipes(response.json());
    }, (err) => console.log(err));
  }
}
