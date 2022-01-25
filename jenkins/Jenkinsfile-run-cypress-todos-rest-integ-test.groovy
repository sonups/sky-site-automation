pipeline {
  agent any
  stages {
    stage('Clean up previously running or stopped container') {
      steps {
        script {
          try {
            sh '''
                    docker kill jenkins-sky'''
                        } catch (err) {
            echo err.getMessage()
          }

          try {
            sh '''
                    docker rm jenkins-sky'''
                        } catch (err) {
            echo err.getMessage()
          }
        }
      }
    }

    // stage('Clean up used reports directories') {
    //   steps {
    //     script {
    //       try {
    //         sh '''
    //                 rm -rf target/
    //                 rm -rf reports/
    //                 rm -rf allure-report
    //                 '''
    //                     } catch (err) {
    //         echo err.getMessage()
    //       }

    //     }
    //   }
    // }

    stage('Start Cypress UI tests') {
      steps {
        script {
          sh '''
          docker run --interactive --name jenkins-sky sps89/jenkins-sky
          '''
        }
      }
    }

    // stage('Copy report json to allure target folder') {
    //   steps {
    //     script {
    //       try {
    //         sh '''

    //                 mkdir target

    //                 cd ..
    //                 cp reports target/
    //                 mv target/reports target/allure-results'''
    //                     } catch (err) {
    //         echo err.getMessage()
    //       }
    //     }
    //   }
    // }

    // stage('Allure') {
    //   steps {
    //     allure includeProperties: false, jdk: '', results: [[path: 'target/allure-results']]
    //   }
    // }
  }
}
