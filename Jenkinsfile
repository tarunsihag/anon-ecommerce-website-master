pipeline {
    agent any  // This tells Jenkins to run on any available agent (you can specify specific agent if needed)
    
    environment {
        // You can define environment variables here if needed
    }
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/tarunsihag/anon-ecommerce-website-master'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Add your build commands here
                    sh 'docker build -t my-ecommerce-app .'
                }
            }
        }
        
        stage('Test Docker') {
            steps {
                script {
                    // Add your test commands here, for example, running the container or other checks
                    echo "Running Docker tests..."
                }
            }
        }
    }
    
    post {
        always {
            // This section runs after the stages are completed, regardless of success/failure
            echo "Pipeline completed"
        }
    }
}
