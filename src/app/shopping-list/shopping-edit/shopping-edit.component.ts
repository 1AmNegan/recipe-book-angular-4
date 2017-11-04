import { Component, OnInit, Output, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;

  private subscription: Subscription;
  editMode = false;
  editedIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editedIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const ingredientInput = new Ingredient(value.name, value.amount);
    this.shoppingListService.addIngredient(ingredientInput);

    form.reset();
  }

  onUpdateItem(form: NgForm) {
    const value = form.value;
    this.editMode = false;
    const editedIngredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.updateIngredient(this.editedIndex, editedIngredient);

    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedIndex);
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

}
