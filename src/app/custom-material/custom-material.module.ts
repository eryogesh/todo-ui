import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    MatButtonModule, MatDialogModule, MatCardModule, MatTooltipModule
  ],
  exports: [
    MatButtonModule, MatDialogModule, MatCardModule, MatTooltipModule
  ]
})
export class CustomMaterialModule {
}
