import type { GameState, Base } from './types.js';
import {
  countPossibleSecrets,
  generateSecret,
  createDigitValidator,
  isValidGuess,
  addGuess,
} from './logic.js';

const initialState: GameState = {
  status: 'set up',
  settings: { length: 4, base: 10 },
  secret: '',
  history: [],
  startTime: 0,
};

let state = initialState;

const BASE_OPTIONS: readonly { label: string; value: Base }[] = [
  { label: 'bin', value: 2 },
  { label: 'oct', value: 8 },
  { label: 'dec', value: 10 },
  { label: 'hex', value: 16 },
];

const LENGTHS: number[] = [2, 3, 4, 5, 6];

function createBaseSelect(): HTMLSelectElement {
  const selectEl = document.createElement('select');
  const optionsEl = BASE_OPTIONS.map((option) => {
    const optionEl = document.createElement('option');
    optionEl.textContent = option.label;
    optionEl.value = String(option.value);
    return optionEl;
  });

  selectEl.name = 'base';
  selectEl.append(...optionsEl);
  selectEl.value = String(state.settings.base);
  selectEl.disabled = state.status !== 'set up';

  selectEl.addEventListener('change', () => {
    const selected = BASE_OPTIONS.find(
      (option) => String(option.value) === selectEl.value,
    );

    if (selected) {
      state = {
        ...state,
        settings: {
          ...state.settings,
          base: selected.value,
          length: selected.value === 2 ? 2 : state.settings.length,
        },
      };
      render();
    }
  });

  return selectEl;
}

function createLengthSelect(): HTMLSelectElement {
  const selectEl = document.createElement('select');
  const availableLengths = getAvailableLengths(state.settings.base);

  const optionsEl = availableLengths.map((length) => {
    const optionEl = document.createElement('option');
    optionEl.textContent = String(length);
    optionEl.value = String(length);
    return optionEl;
  });

  selectEl.name = 'length';
  selectEl.append(...optionsEl);
  selectEl.value = String(state.settings.length);
  selectEl.disabled = state.status !== 'set up';

  selectEl.addEventListener('change', () => {
    const selected = LENGTHS.find(
      (length) => String(length) === selectEl.value,
    );

    if (selected) {
      state = {
        ...state,
        settings: {
          ...state.settings,
          length: selected,
        },
      };
      render();
    }
  });

  return selectEl;
}

function getAvailableLengths(base: Base): number[] {
  if (base === 2) return [2];
  return LENGTHS;
}

function createPossibleCount(): HTMLParagraphElement {
  const textEl = document.createElement('p');
  const count = countPossibleSecrets(
    state.settings.length,
    state.settings.base,
  );
  textEl.textContent = `Possible secrets: ${count}`;
  return textEl;
}

function createGuessInput(): HTMLInputElement {
  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.name = 'guess';
  inputEl.maxLength = state.settings.length;

  const digitValidator = createDigitValidator(state.settings.base);

  inputEl.addEventListener('input', () => {
    const chars = inputEl.value.split('');

    const suitableChars = chars.filter(digitValidator);
    inputEl.value = suitableChars.join('');
  });

  return inputEl;
}

function createStartButton(): HTMLButtonElement {
  const buttonEl = document.createElement('button');
  buttonEl.textContent = 'Start Game';

  buttonEl.addEventListener('click', () => {
    state = {
      ...state,
      status: 'play',
      secret: generateSecret(state.settings.length, state.settings.base),
      history: [],
      startTime: Date.now(),
    };

    render();
  });

  return buttonEl;
}

function createErrorElement(): HTMLParagraphElement {
  const textEl = document.createElement('p');
  return textEl;
}

function createGuessButton(
  guessInput: HTMLInputElement,
  errorEl: HTMLParagraphElement,
): HTMLButtonElement {
  const buttonEl = document.createElement('button');
  buttonEl.textContent = 'Send the Guess';

  buttonEl.addEventListener('click', () => {
    const isValid = isValidGuess(
      guessInput.value,
      state.settings.length,
      state.settings.base,
    );
    if (isValid) {
      state = addGuess(state, guessInput.value);
      render();
    } else {
      errorEl.textContent = `Enter ${state.settings.length} different digits`;
    }
  });

  return buttonEl;
}

function render(): void {
  const title = document.createElement('h1');
  title.textContent = 'Bulls and Cows';
  const commonElements = [
    title,
    createBaseSelect(),
    createLengthSelect(),
    createPossibleCount(),
  ];

  switch (state.status) {
    case 'set up':
      document.body.replaceChildren(...commonElements, createStartButton());
      break;
    case 'play': {
      const guessInput = createGuessInput();
      const errorEl = createErrorElement();
      document.body.replaceChildren(
        ...commonElements,
        guessInput,
        errorEl,
        createGuessButton(guessInput, errorEl),
      );
      break;
    }
    case 'win':
      document.body.replaceChildren(...commonElements);
      break;
  }
}

render();
