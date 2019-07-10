import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface ValueEvent {
  type: 'pro' | 'con';
  value?: string;
  idx?: number;
}

@Component({
  selector: 'app-content-table',
  templateUrl: './content-table.component.html',
  styleUrls: ['./content-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentTableComponent implements OnInit {

  @Input() public pros: string[];
  @Input() public cons: string[];
  @Output('addValue') public addValue = new EventEmitter<ValueEvent>();
  @Output('removeValue') public removeValue = new EventEmitter<ValueEvent>();
  @Output('updateValue') public updateValue = new EventEmitter<ValueEvent>();

  constructor() {
  }

  ngOnInit() {
  }

}
