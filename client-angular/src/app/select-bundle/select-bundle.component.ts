import { EventEmitter, Component, Input, OnInit, Output } from '@angular/core';
import { MatOption } from '@angular/material/core';

import { Observable, of } from 'rxjs';

interface Package {
  name: string;
}

@Component({
  selector: 'app-select-bundle',
  templateUrl: './select-bundle.component.html',
  styleUrls: ['./select-bundle.component.scss'],
})
export class SelectBundleComponent implements OnInit {
  @Input() options: Observable<Package[]> = of([]);
  @Output() itemSelected = new EventEmitter<Package>();

  constructor() {}

  ngOnInit(): void {}

  optionSelected(option: MatOption) {
    this.itemSelected.emit(option.value);
  }
}
