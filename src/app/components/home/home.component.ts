import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { List } from 'src/app/models/list';
import { PromptDialogComponent, PromptDialogModel } from 'src/app/prompt-dialog/prompt-dialog.component';
import { v4 as uuidv4 } from 'uuid';

import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lists: List[] = [];

  constructor(private listService: ListService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.listService.getLists().pipe(take(1)).subscribe(lists => {
      this.lists = lists;
    });
  }

  /**
   * Updates current value of lists array to backend api
   */
  private updateLists(): void {
    this.listService.updateLists(this.lists).pipe(take(1)).subscribe();
  }

  addList(): void {
    const dialogData = new PromptDialogModel('What would you name your list?', 'List name');
    const dialogRef = this.dialog.open(PromptDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const newList: List = {
          id: uuidv4(),
          name: dialogResult,
          cards: []
        };

        this.lists.push(newList);
        this.updateLists();
      }
    });
  }

  deleteList(listId: string): void {
    this.lists = this.lists.filter(x => x.id !== listId);
    this.updateLists();
  }

  onListChange(): void {
    this.updateLists();
  }
}
