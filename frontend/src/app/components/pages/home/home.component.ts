import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];

  constructor(
    private foodservice: FoodService,
    activatedRoute: ActivatedRoute
  ) {
    let foodsObservable:Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        foodsObservable = this.foodservice.getAllFoodsBySearchTerm(params.searchTerm)
      }else if(params.tag){
foodsObservable = this.foodservice.getAllFoodsByTag(params.tag)
      }
       else {
        foodsObservable = foodservice.getAll()
      }

      foodsObservable.subscribe((serverfoods)=>{
        this.foods=serverfoods;
      })
    })

  }

  ngOnInit(): void {
  }

}
