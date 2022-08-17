const scanner = require('sonarqube-scanner');

scanner(
  {    
    token : "sqp_e781cac1898c1fd83773a5de65e85d9e134e827a",
    options:{
      "sonar.projectKey":"local-open-finance-user",
    }
  },
  () => process.exit()
)