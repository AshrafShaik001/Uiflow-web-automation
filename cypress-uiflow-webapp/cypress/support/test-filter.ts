/// <reference types="Cypress" />

const TestFilter = (definedTags: any, runTest: any) => {
    if (Cypress.env('TEST_TAGS')) {
      const tags = Cypress.env('TEST_TAGS').split(',');
      const isFound = definedTags.some((definedTag:string) => tags.includes(definedTag));
      const isExcluded = definedTags.some((definedTag:string) => tags.includes("not_"+ definedTag));
  
      if (isFound) {
        if(!isExcluded){
          runTest();
        }
      }
    }
  };
  
  export default TestFilter;