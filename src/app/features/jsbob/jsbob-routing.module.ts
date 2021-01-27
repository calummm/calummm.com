import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsbobComponent } from './jsbob.component';

const routes: Routes = [{ path: '', component: JsbobComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsbobRoutingModule { }
