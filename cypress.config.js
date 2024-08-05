const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    /*setupNodeEvents(on, config) {
      // implement node event listeners here
    },*/
    baseUrl: 'http://localhost:8080', // Set this to your development server URL
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: true,
    videoCompression: 32,
    videosFolder: 'cypress/videos',
  },
});
