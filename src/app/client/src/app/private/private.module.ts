import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { DashboardModule } from '@sunbird/dashboard';

@NgModule({
  imports: [
    CommonModule,
    DashboardModule,
    PrivateRoutingModule
  ],
  declarations: []
})
export class PrivateModule { }
