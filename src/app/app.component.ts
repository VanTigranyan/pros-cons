import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppService } from "../services/app.service";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public userId: string;
  public groupId: string;
  private componentIsActive = false;

  constructor(
    private service: AppService,
  ) {}

  ngOnInit(): void {
    this.componentIsActive = true;
    this.service.getUserId()
      .pipe(
        takeWhile(() => this.componentIsActive)
      )
      .subscribe((id:string) => {
      this.userId = id;
    });
    this.service.getGroupId()
      .pipe(
        takeWhile(() => this.componentIsActive)
      )
      .subscribe((id: string) => {
      this.groupId = id;
    })
  }

  ngOnDestroy(): void {
    this.componentIsActive = false;
  }
}
