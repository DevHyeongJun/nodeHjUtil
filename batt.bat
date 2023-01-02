set MAVEN_PATH=%cd%/modules/maven/bin

cd %1

%MAVEN_PATH%/mvn -U clean --update-snapshots dependency:copy-dependencies package -Dmaven.text.skip=true -Dmaven.text.skip=true
