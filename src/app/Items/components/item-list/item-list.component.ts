import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../models/item.model';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnChanges {

  form: FormGroup
  @Input() stepId: number;
  addNewItem: boolean = true;
  items: Item[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _itemsService: ItemsService
  ) { 
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.stepId != undefined) {
      this._itemsService.GetItemByStep(this.stepId).subscribe(items => {
          this.items = items;
          this.PrepareNewItem();
      });
    }   
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: null,
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  RemoveItem(id: number) {
    this._itemsService.Delete(id).subscribe(data => {
      if(data) {
        this.items = this.items.filter(i => i.id !== id);
      }
    });
  }

  ClearForm(){
    this.form.reset();
  }

  PrepareNewItem(){
    this.addNewItem = true;
    this.ClearForm();
  }
  
  SelectItem(id: number) {
    let item = this.items.find(i => i.id == id);
    this.form.patchValue({
      id: id,
      title: item.title,
      description: item.description
    });
    this.addNewItem = false;
  }

  onSubmit() {
    let obj: Item = {
      id: this.form.get('id').value,
      title: this.form.get('title').value,
      description: this.form.get('description').value,
      stepId: this.stepId
    }
    if(this.addNewItem){
      this._itemsService.Create(obj).subscribe(data => {
        if(data) {
          this.items.push(data)
        }
      });
    }
    else {
      this._itemsService.Update(obj).subscribe(data => {
        if(data) {
          let item = this.items.find(i => i.id == obj.id);
          item.description = obj.description;
          item.title = obj.title
        }
      })
    }
    this.ClearForm();
  }
}
