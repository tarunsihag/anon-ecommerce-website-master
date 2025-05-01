pipeline {
    agent { label 'linux' }  // Ensure this matches the agent with Docker
    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-ecommerce-app .'
            }
        }
    }
}
