import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsbobRoutingModule } from './jsbob-routing.module';
import { JsbobComponent } from './jsbob.component';


@NgModule({
  declarations: [JsbobComponent],
  imports: [
    CommonModule,
    JsbobRoutingModule
  ]
})
export class JsbobModule { }
