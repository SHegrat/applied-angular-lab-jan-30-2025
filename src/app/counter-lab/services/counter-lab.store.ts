import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
  withHooks,
  watchState,
} from '@ngrx/signals';

const BY_VALUES = [1, 3, 5] as const;
export type ByValues = (typeof BY_VALUES)[number];

type CounterState = {
  by: ByValues;
  current: number;
};

export const CounterStore = signalStore(
  withState<CounterState>({
    by: 1,
    current: 0,
  }),
  withMethods((store) => {
    return {
      setCountBy: (by: ByValues) => patchState(store, { by }),
      add: () => patchState(store, { current: store.current() + store.by() }),
      subtract: () =>
        patchState(store, {
          current: Math.max(0, store.current() - store.by()),
        }),
    };
  }),
  withComputed((store) => {
    return {
      currentCount: computed(() => store.current()),
      subtractDisabled: computed(() => store.current() - store.by() < 0),
      fizzBuzz: computed(() => {
        const count = store.current();
        if (count === 0) return '';
        if (count % 3 === 0 && count % 5 === 0) return 'FizzBuzz';
        if (count % 3 === 0) return 'Fizz';
        if (count % 5 === 0) return 'Buzz';
        return '';
      }),
    };
  }),
  withHooks({
    onInit(store) {
      const savedState = localStorage.getItem('counter-state');
      if (savedState !== null) {
        const state = JSON.parse(savedState) as unknown as CounterState;
        patchState(store, state);
      }
      watchState(store, (state) => {
        localStorage.setItem('counter-state', JSON.stringify(state));
      });
    },
  }),
);
