import { defineConfig } from 'cypress'

declare var require: any
export default defineConfig({
  
  video: false,
  videoUploadOnPasses: false,
  trashAssetsBeforeRuns: true,
  viewportWidth: 1601,
  viewportHeight: 1200,
  pageLoadTimeout: 30000,
  defaultCommandTimeout: 30000,
  requestTimeout: 15000,
  responseTimeout: 15000,
  numTestsKeptInMemory: 5,
  watchForFileChanges: false,
  retries: {
      // Configure retry attempts for `cypress run`
      // Default is 0
      "runMode": 0,
      // Configure retry attempts for `cypress open`
      // Default is 0
      "openMode": 0,
    },
  
  chromeWebSecurity: false,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mochawesome, spec, mocha-junit-reporter',
    mochawesomeReporterOptions: {
      reportDir: 'cypress/reports/mocha',
      quite: true,
      overwrite: false,
      html: false,
      json: true,
      charts: true,
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/results-[hash].xml',
    },
  },
  env: {
    TEST_TAGS: 'sanity,regression,smoke,debug',
    baseUrl: 'https://www.uiflow-stage.com/',
    email: 'ashrafvali.shaik@qualitlabs.com',
    password: 'Shaik@1996'
  },
  
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {

      const fs = require('fs')
      const path = require('path')
      const repoRoot = path.join("./cypress/downloads", '..', '..')
      const xlsx = require("node-xlsx").default;
      
       on('task', {     
          parseXlsx({ filePath }) {
            return new Promise((resolve, reject) => {
              try {
                const jsonData = xlsx.parse(fs.readFileSync(filePath));
                resolve(jsonData);
              } catch (e) {
                  reject(e);
                }
            }        
          )},
      })

    },
    
    baseUrl: 'https://www.uiflow-stage.com/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
  
})

