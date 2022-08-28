const scanner = require('sonarqube-scanner');

scanner(
  {    
    token : process.env.SONAR_TOKEN,
    options:{
      "sonar.projectKey":process.env.SONAR_PROJECT_KEY,
      "sonar.sources": "./src",
    }
  },
  () => process.exit()
)