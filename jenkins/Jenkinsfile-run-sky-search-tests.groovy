pipeline {
  agent any
  stages {
    stage('Clean up previously running or stopped container') {
      steps {
        script {
          try {
            sh '''
                    docker kill sky-site-automations'''
                        } catch (err) {
            echo err.getMessage()
          }

          try {
            sh '''
                    docker rm sky-site-automations'''
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

    stage('Start Sky search tests acceptance') {
      steps {
        script {
          sh '''
          docker run --rm -i -e "TAGS=-e TAGS="@sky-search"" --name sky-site-automations sps89/sky-site-automations
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
