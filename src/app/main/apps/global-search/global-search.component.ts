import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlobalSearchService } from './global-search-service';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss']
})
export class GlobalSearchComponent implements OnInit {
  $destroy:  Subject<any>;
  searchData;
  searchValue:  string
  constructor(
    private searchService: GlobalSearchService,
    private activateRoute: ActivatedRoute
  ) {
    this.$destroy = new Subject();
    //this.searchValue = (this.activateRoute.snapshot.params.value) ? this.activateRoute.snapshot.params.value : 'null';
   }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      const searchValue = params.value;
      this.searchService.get_search_results(searchValue)
      .then(data => {
        this.searchData =  data;
      });
    });
 
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$destroy.next();
    this.$destroy.complete();
  }

}
