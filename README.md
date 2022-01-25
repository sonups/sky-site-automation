<!-- PROJECT LOGO -->
<br />
<p align="center">
   <a href="https://github.com/sonups/sky-site-automation">
   <img src="https://hackernoon.com/hn-images/1*IrV85j4bpBjZocD5jVnCHQ.jpeg" alt="Logo" width="300" height="150">
      <img src="https://adamtheautomator.com/wp-content/uploads/2019/12/jenkins-powershell.png" alt="Logo" width="150" height="150">
   </a>
   </p>
<h3 align="center">Sky website Automation using Cypress (Docker & Jenkins available)</h3>
<p align="center">
   Sky website Automation using Page objects model in Cypress JS. Run all your UI End to end tests silently .
   Cucumber BDD scripts in Cypress
</p>

Table of contents
=================

<!--ts-->

  * [Built With](#built-with)
  * [Clone the repo](#1-clone-the-repo-and-install-npm-dependencies)
  * [Different ways of Building And Executing project](#different-ways-of-building--executing-project)
  	* [1. Running tests in local](#1-running-tests-in-local)
  	 	* [1. Clone the repo and Install npm dependencies](#1-clone-the-repo-and-install-npm-dependencies)
         * [2. Verify Lint](#2-verify-lint)
         * [3. Various Test configurations](#3-various-test-configurations)
         * [4. Structure of BDD feature files](#4-structure-of-bdd-feature-files)
         * [5. Report Generation](#5-report-generation)
  	* [2. Running tests in docker](#2-running-tests-from-docker)
  		* [1. Run docker build](#1-run-docker-build)
         * [2. (Optional) Remove existing running containers](2-optional-remove-existing-running-containers-required-when-there-is-already-a-container-running-with-same-name)
         * [3. Execute tests by passing specific tags](#3-execute-tests-by-passing-specific-tags)
  	* [3. Running tests in Jenkins hosted from docker](#3-running-tests-in-jenkins-hosted-from-docker)
  		* [3.1 Setting up jenkins](#31-setting-up-jenkins)
  	  		* [OPTION A - Running shell script jenkins-run.sh (In linux)](#------option-a----running-shell-script-jenkins-runsh-in-linux)
  	  	 	* [OPTION B - Executing each commands in shell(Windows or Mac)](#------option-b----executing-each-commands-in-shellwindows-or-mac)
         * [3.2 Executing tests in jenkins](#32-executing-tests-in-jenkins)
  	* [4. Running tests in Jenkins hosted in Azure cloud vm](#4-running-tests-in-jenkins-hosted-in-azure-cloud-vm)
- [Contact](#contact)


### Built With

Npm, nodejs & docker required for running the tests. Thse tools needs to be installed in host machine prior to building the project
* [Docker](https://www.docker.com/)
* [Npm](https://www.npmjs.com/)
* [NodeJs](https://nodejs.org/en/)

### Different ways of Building & Executing project

<!-- SETTING PROJECT LOCALLY -->
## 1. Running tests in local

##### 1. Clone the repo and Install npm dependencies
   ```sh
   git clone https://github.com/sonups/sky-site-automation
   cd sky-site-automation
   npm install
   ```

##### 2. Verify Lint
   ```sh
npm run lint
   ```
   
 ##### 3. Various Test configurations
 
   | Command  | Description | 
| ------------- | ------------- |
| npm run cy-open  | Open cypress workbook  |
| npm run cy-run-headless  | Run tests in headless mode  |
| npm run cy-run-chrome  | Run tests in Chrome  |
| npm run cy-run-firefox  | Run tests in Firefox  |
|  npm run cucumber-run-specific-tags -- -e TAGS=@ui-tests  | Run All UI Acceptance Tests   |
| npm run cucumber-run-specific-tags -- -e TAGS=@sky-home-page| Run Sky home page acceptance tests |
| npm run cucumber-run-specific-tags -- -e TAGS=@sky-search | Run Sky search acceptance tests  |

 ##### 4. Structure of BDD feature files
    
    ├── cypress   
    │         └── pageobjects  			# Page objects folder
    │         └── support			# Step definitions folder
    │         └── integration          
    │                   └
    │                   └── features                # BDD features folder
    |                            └──── sky.feature # Sky home page acceptance tests  
    |                            └──── skySearch.feature # Sky search acceptance tests

  ##### 5. Report Generation

a) allure

b) mocha-awesome



| Command                            | Description                  | Remarks                                                                          |
| ------------- |:-------------:| -----:|
| **npm run test-run-allure-report** | Generate Allure report       | Report opens automatically in a browser [ html generated in **/allure-report** ] |
| **npm run test-mochawesomereport** | Generate mochaawesome report | html generated in **/mochawesome-report**                              |

   
<!-- EXECUTING TEST FROM DOCKERIZED TESTS -->
## 2. Running tests from docker

##### 1. Run docker build

Issue the build commands from Root Folder **sky-site-automation**

   ```sh
   cd sky-site-automation
   docker build -t sps89/sky-site-automations .
   ```
##### 2. (Optional) Remove existing running containers (Required when there is already a container running with same name)
   ```sh
	docker kill sky-site-automations
	docker rm sky-site-automations
   ```
##### 3. Execute tests by passing specific tags

| Description                            | Command                  |
| ------------- |:-------------:| 
| Execute All acceptance tests **sky.com** | **docker run --rm -i -e "TAGS=-e TAGS="@ui-tests"" --name sky-site-automations sps89/sky-site-automations**      | 
| Execute Sky home page acceptance tests **sky.com** | **docker run --rm -i -e "TAGS=-e TAGS="@sky-home-page"" --name sky-site-automations sps89/sky-site-automations**      | 
| Execute Sky website search acceptance tests **sky.com** | **docker run --rm -i -e "TAGS=-e TAGS="@sky-search"" --name sky-site-automations sps89/sky-site-automations**   |


<!-- Execution from Jenkins hosted from docker container -->
## 3. Running tests in Jenkins hosted from docker
### 3.1 Setting up jenkins
To setup jenkins using docker there are 2 options
#### -----> *OPTION A* -- Running shell script jenkins-run.sh (In linux)

Execute the shell script in Linux environment
   ```sh
   cd sky-site-automation
   cd scripts
   sh jenkins-run.sh
   ```
   
   If everything goes well please navigate to **http://localhost:8089**  to launch jenkins dashboard. Otherwise follow option B

#### -----> *OPTION B* -- Executing each commands in shell(windows or mac) 
##### 
1. Clone the repo & run docker build (for building jenkins images)

   ```sh
   cd sky-site-automation
   cd jenkins
   docker build -t sps89/jenkins-sky .
   ```
##### 
2. (Required only when there is already a container running with same name) This ensures the existing running containers are killed and removed  - **(ignore errors)**
   ```sh
   docker kill jenkins-sky
   docker rm jenkins-sky 
   ```


##### 

3. Start Jenkins service using docker
   ```sh
	docker run -d --shm-size=2048m --name jenkins-sky -v /var/run/docker.sock:/var/run/docker.sock -p 8089:8080 -p 50000:50000 sps89/jenkins-sky  

   ```
### 3.2 Executing tests in jenkins

#### ----> Open the Jenkins dashboard using link http://localhost:8089   

**(may be have to wait for 1-2 minutes for the docker container to spin up )**

<p align="center">
   <img src="https://raw.githubusercontent.com/sonups/sky-site-automation/master/pictures/jenkins.png" alt="Logo" width="600" height="200">
   </p>
   

#### ----> Step 1 . Build the docker image required to run tests

The job **Build_cypress_tests_docker_image** builds the docker image required to run tests

**Benefits** - Any repo change will be cloned and build in a single click

#### ----> Step 2 . Jobs to run tests 

| Jenkins Job                            | Description                  |
| ------------- |:-------------:|
| **Run__All_Acceptance_Tests** | Execute All UI acceptance tests of **Sky.com** site         |
| **Run__Sky_Home_Page_Tests** | Execute Sky home page acceptance tests of **Sky.com** site   |
| **Run__Sky_Search_Tests** | Execute Sky search acceptance tests of **Sky.com** site   |

 
<p align="center">
   <img src="https://raw.githubusercontent.com/sonups/sky-site-automation/master/pictures/jenkins-console-output.png" alt="Logo" width="600" height="200">
   </p>


<!-- CONTACT -->
# Contact

Sonu Sadasivan - sonu.sadasivan@gmail.com
LinkedIn - https://www.linkedin.com/in/sonups/

Project Link: [https://github.com/sonups/sky-site-automation](https://github.com/sonups/sky-site-automation)


