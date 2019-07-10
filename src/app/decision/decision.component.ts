import { Component, Input, OnInit } from '@angular/core';

import { DecisionService } from "../../services/decision.service";

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.scss']
})
export class DecisionComponent implements OnInit {

  public pros: string[];
  public cons: string[];
  public networkPending = false;

  constructor(
    private dService: DecisionService,
  ) {}

  ngOnInit() {
    this.networkPending = true;
    this.dService.fetchProsAndCons().subscribe(() => {this.networkPending = false});
    this.dService.pros$.subscribe((val: string[]) => {
      this.pros = val;
    });
    this.dService.cons$.subscribe((val: string[]) => {
      this.cons = val;
    });
    this.dService.isPending$.subscribe((val: boolean) => this.networkPending = val);
  }

  public addValue(type: 'pro' | 'con', value: string) {
    if (value.trim()) {
      if (type === 'pro') {
        this.dService.addPro(value);
      } else {
        this.dService.addCon(value);
      }
    }
  }

  public removeValue(type: 'pro' | 'con', idx: number) {
    if (type === 'pro') {
      this.dService.removePro(idx);
    } else {
      this.dService.removeCon(idx);
    }
  }

  public updateValue(type: 'pro' | 'con', idx: number, value: string) {
    if (type === 'pro') {
      this.dService.updatePro(idx, value);
    } else {
      this.dService.updateCon(idx, value);
    }
  }

}
