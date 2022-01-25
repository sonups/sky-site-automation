pipeline {
    agent any
    stages {
        stage('Git Checkout sky automatio tests repository') {
            steps {
                sh 'rm -rf *'
                git 'https://github.com/sonups/sky-site-automation.git'
            }
        }

        stage('Dockerize Cypress test automation') {
            steps {
                script {
                    try {
                        sh '''
                    docker build -t sky-site-automations .'''
                        } catch (err) {
                        echo err.getMessage()
                    }
                }
            }
        }
    }
}

