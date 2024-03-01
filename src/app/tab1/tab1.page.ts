import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, AfterViewInit {
  @ViewChild('segment') segment?: IonSegment;

  public selectedMapSubCatControl = new FormControl<string | null>(null);

  public options = ['1', '2', '3', '4', '5', '6', '7', '8'];

  public static readonly VALUES = ['A', 'B', 'C', 'D', 'E'];
  public values?: string[];

  constructor() {}

  async ngOnInit() {
    this.values = this.shuffleArray(Tab1Page.VALUES);

    this.selectedMapSubCatControl.valueChanges.subscribe(async () => {
      // this.values = this.shuffleArray(Tab1Page.VALUES); // TODO: comment this line out if you want to see the bug disappear
    });
  }

  shuffleArray(array: string[]): string[] {
    let shuffledArray = [...array]; // Create a copy of the array to avoid mutating the original array
    let currentIndex = shuffledArray.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = shuffledArray[currentIndex];
      shuffledArray[currentIndex] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temporaryValue;
    }

    return shuffledArray;
  }

  onSegmentChange($event: any) {
    console.log('000', $event);
    // this.values = this.shuffleArray(Tab1Page.VALUES); // TODO: comment this line out if you want to see the bug disappear
  }

  ngAfterViewInit() {
    if (!this.segment) {
      throw new Error('ERROR');
    }
    this.segment.ionChange.subscribe(() => {
      this.values = this.shuffleArray(Tab1Page.VALUES); // TODO: comment this line out if you want to see the bug disappear
    });
  }

}
