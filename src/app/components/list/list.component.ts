import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Card } from 'src/app/models/card';
import { PromptDialogComponent, PromptDialogModel } from 'src/app/prompt-dialog/prompt-dialog.component';
import { v4 as uuidv4 } from 'uuid';

import { List } from '../../models/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: List;
  @Input() connectedTo: string[];
  @Output() delete = new EventEmitter<string>();
  @Output() changed = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addCard(): void {
    const dialogData = new PromptDialogModel('What would you name your card?', 'Card name');
    const dialogRef = this.dialog.open(PromptDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const newCard: Card = {
          id: uuidv4(),
          name: dialogResult,
        };

        this.list.cards.push(newCard);
        this.changed.emit();
      }
    });
  }

  deleteCard(cardId: string): void {
    const message = `Are you sure you want to remove this?`;
    const dialogData = new ConfirmDialogModel('Confirm Remove', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.list.cards = this.list.cards.filter(x => x.id !== cardId);
        this.changed.emit();
      }
    });
  }

  deleteList(): void {
    const message = `Are you sure you want to remove this?`;
    const dialogData = new ConfirmDialogModel('Confirm Remove', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.delete.emit(this.list.id);
      }
    });
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
    this.changed.emit();
  }
}
