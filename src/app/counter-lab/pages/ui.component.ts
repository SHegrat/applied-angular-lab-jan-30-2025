import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
} from '@angular/core';
import { CounterStore } from '../services/counter-lab.store';

@Component({
  selector: 'app-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="counter-container">
      <button
        [disabled]="store.subtractDisabled()"
        (click)="store.subtract()"
        class="btn btn-primary"
      >
        -
      </button>
      <span data-testid="current" class="count-display">
        {{ store.currentCount() }}
      </span>
      <button (click)="store.add()" class="btn btn-primary">+</button>
    </div>
    <div class="fizzbuzz-display" data-testid="fizzBuzz">
      {{ store.fizzBuzz() }}
    </div>
  `,
  styles: `
    .counter-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin: 20px;
    }
    .btn {
      width: 40px;
      height: 40px;
      font-size: 20px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .btn:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .count-display {
      font-size: 24px;
      font-weight: bold;
    }
    .fizzbuzz-display {
      margin-top: 20px;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }
  `,
})
export class UiComponent {
  store = inject(CounterStore);
}
