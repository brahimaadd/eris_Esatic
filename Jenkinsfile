pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Code récupéré depuis GitHub'
            }
        }

        stage('Verification') {
            steps {
                sh '''
                    echo "=== Vérification du projet ==="
                    test -f index.html
                    test -f README.md
                    test -f styles.css
                    echo "Fichiers requis présents"
                '''
            }
        }

        stage('Build') {
            steps {
                echo 'Build du projet Web'
                echo 'Projet HTML/CSS prêt'
            }
        }
    }

    post {
        success {
            echo 'PIPELINE SUCCESS'
        }

        failure {
            echo 'PIPELINE FAILURE'
        }
    }
}
