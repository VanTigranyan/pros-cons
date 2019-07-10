import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material";

import { DecisionComponent } from './decision.component';
import { ContentTableComponent } from "./content-table/content-table.component";
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    DecisionComponent,
    ContentTableComponent,
  ],
  exports: [
    DecisionComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    FormsModule,
  ]
})
export class DecisionModule { }
