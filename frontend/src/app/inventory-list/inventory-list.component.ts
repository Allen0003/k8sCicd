import { Component, OnInit } from '@angular/core';
import { Inventory } from '../model/investory';
import { InventoryList } from '../model/mock-inventory-list';


@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  inventoryArr = InventoryList;

  selectedItem: Inventory | undefined;


  ngOnInit(): void {

  }

  onSelect(item: Inventory): void {
    this.selectedItem = item;
  }
}
