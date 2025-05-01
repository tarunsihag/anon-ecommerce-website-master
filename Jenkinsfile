pipeline {
    agent any  // This will use the default node, typically the Jenkins controller
    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-ecommerce-app .'  // Shell command for Linux
            }
        }
        stage('Run Docker Container') {
            steps {
                sh 'docker run -d -p 80:80 my-ecommerce-app'  // Shell command for Linux
            }
        }
    }
}
