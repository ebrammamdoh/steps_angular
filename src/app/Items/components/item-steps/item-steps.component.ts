import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';
import { Step } from '../../models/steps.model';
import { ItemsService } from '../../services/items.service';
import { StepsService } from '../../services/steps.service';

@Component({
  selector: 'app-item-steps',
  templateUrl: './item-steps.component.html',
  styleUrls: ['./item-steps.component.css']
})
export class ItemStepsComponent implements OnInit {

  steps: Step[] = [];
  selectedItems: Item[];
  stepId: number = 1;

  constructor(
    private _stepsService: StepsService
  ) { }

  ngOnInit(): void {
    this._stepsService.GetAll().subscribe(data => {
      this.steps = data;
    });
  }

  AddStep() {
    this._stepsService.Create().subscribe(step => {
      this.steps.push(step);
      this.OpenItem(step.id)
    })

  }

  RemoveStep(stepId: number) {
    this._stepsService.Delete(stepId).subscribe(data => {
      this.steps = this.steps.filter(s => s.id !== stepId);
      this.OpenItem(1)
    });
  }

  OpenItem(stepId: number) {
    this.stepId = stepId;
  }

  next() {
    if (this.steps[this.steps.length - 1].id != this.stepId)
      ++this.stepId;
  }

  previous() {
    if (this.steps[0].id != this.stepId)
      --this.stepId;
  }
}
