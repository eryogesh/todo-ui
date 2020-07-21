import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    ConfirmDialogComponent,
    PromptDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    CustomMaterialModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [ConfirmDialogComponent, PromptDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
