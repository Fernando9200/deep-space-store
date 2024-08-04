/* eslint-disable no-undef */
const COMMAND_DELAY = 500; // Adjust this value to slow down the test

for (const command of ['click', 'type', 'select', 'check', 'uncheck', 'trigger', 'dblclick']) {
  Cypress.Commands.overwrite(command, (originalFn, ...args) => {
    const origVal = originalFn(...args);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(origVal);
      }, COMMAND_DELAY);
    });
  });
}
