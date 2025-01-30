import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../services/counter-lab.store';

@Component({
  selector: 'app-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <h2>Select Count By</h2>
      <button class="styled-button" (click)="store.setCountBy(1)">
        Count by 1
      </button>
      <button class="styled-button" (click)="store.setCountBy(3)">
        Count by 3
      </button>
      <button class="styled-button" (click)="store.setCountBy(5)">
        Count by 5
      </button>
    </div>
  `,
  styles: `
    div {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }
    .styled-button {
      margin: 10px;
      padding: 10px 20px;
      font-size: 18px;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .styled-button:hover {
      background-color: #0056b3;
    }
  `,
})
export class PrefsComponent {
  store = inject(CounterStore);
}
