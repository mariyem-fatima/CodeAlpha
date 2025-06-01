const display = document.getElementById('display');

    function appendValue(val) {
      display.value += val;
    }

    function clearDisplay() {
      display.value = '';
    }

    function backspace() {
      display.value = display.value.slice(0, -1);
    }

    function calculate() {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = 'Error';
      }
    }

    document.addEventListener('keydown', (e) => {
      const key = e.key;
      if (/[0-9+\-*/().]/.test(key)) {
        appendValue(key);
      } else if (key === 'Enter') {
        e.preventDefault();
        calculate();
      } else if (key === 'Backspace') {
        backspace();
      } else if (key.toLowerCase() === 'c') {
        clearDisplay();
      }
    });