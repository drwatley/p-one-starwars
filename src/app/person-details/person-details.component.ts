import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }           from '@angular/router';

//models
import { Person } from '../person';

//services 
import { PeopleService } from "../people.service";

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styles: []
})
export class PersonDetailsComponent implements OnInit {

  professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];
  
  person: Person;
  sub:    any;

  constructor(private peopleService: PeopleService, 
              private route:         ActivatedRoute,
              private router:        Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      this.person = this.peopleService.get(id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  savePersonDetails() {
    //alert(`Saved!!!! ${JSON.stringify(this.person)}`);
    this.peopleService.save(this.person);
  }

  gotoPeoplesList() {
    // let link = ['/persons'];
    // this.router.navigate(link);
    //the above is to demonstrate routing back, but using below is more normal or sane. 
    window.history.back();
  }
}
