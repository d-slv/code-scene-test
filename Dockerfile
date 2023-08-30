FROM maven:3.8.4-openjdk-17-slim AS build
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY . /usr/app
RUN mvn clean package -Dmaven.test.skip=true

FROM openjdk:18-jdk-slim AS tomcat
WORKDIR /usr/app
#RUN apk update && apk add tzdata
#RUN cp /usr/share/zoneinfo/America/Fortaleza /etc/localtime
ENV JAVA_OPTS "-Xms1536m -Xmx1536m -XX:MaxMetaspaceSize=512m  -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:ParallelGCThreads=20 -XX:ConcGCThreads=5 -XX:InitiatingHeapOccupancyPercent=45 -Djava.awt.headless=true -Duser.timezone=America/Fortaleza -Duser.language=pt -Duser.region=BR "
COPY --from=build /usr/app/target/*.war /usr/app/app.war
EXPOSE 8080
RUN echo '/usr/local/openjdk-18/bin/java $JAVA_OPTS -jar /usr/app/app.war' > /run.sh && chmod +x /run.sh
ENTRYPOINT ["sh"]
CMD ["/run.sh"]
