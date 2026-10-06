pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Code récupéré depuis GitHub'
            }
        }

        stage('Tests') {
            steps {
                sh '''
                    echo "=== TESTS DU PROJET ==="

                    test -f index.html
                    test -f README.md
                    test -f styles.css

                    grep -q "<html" index.html
                    grep -q "<h1>" index.html
                    grep -q "<h2>" index.html
                    grep -q "styles.css" index.html

                    echo "Tous les tests sont OK"
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
