import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { delay, map, Observable, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public selectedMapSubCatControl = new FormControl<string | null>(null);

  public options = ['1', '2', '3', '4', '5', '6', '7', '8']

  public static readonly VALUES = ['A', 'B', 'C', 'D', 'E'];
  public values$: Observable<string[]> = of(Tab1Page.VALUES).pipe(delay(50));

  constructor() {}

  ngOnInit() {
    this.selectedMapSubCatControl.valueChanges.pipe(
      startWith(null), // Start with an initial value to trigger the shuffle immediately on init
      switchMap(() => of(Tab1Page.VALUES)), // Convert the static VALUES array into an observable
      map(values => this.shuffleArray(values)), // Map each emission to a shuffled version of VALUES
      delay(50) // Delay the emission if needed (optional)
    ).subscribe((shuffledValues) => {
      this.values$ = of(shuffledValues)
    });
  }

  shuffleArray(array: string[]): string[] {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}
