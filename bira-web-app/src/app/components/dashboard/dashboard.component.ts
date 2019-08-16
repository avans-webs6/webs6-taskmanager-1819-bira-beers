import { Component, OnInit } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  public columnType: Observable<any>;
  public moveables: Observable<any>;

  constructor(private store: DatastoreService) {
  }

  ngOnInit() {
    this.columnType = this.store.getAllFromTypeSorted('states', 'sort');
    this.moveables = this.store.getAllFromType('userStories');
  }

}
