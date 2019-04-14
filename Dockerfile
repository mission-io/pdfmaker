FROM missionio/dev as build
WORKDIR /usr/src/app

COPY [".", "./"]
RUN npm install
RUN mio build -e prod -i -v 
RUN ls -ls
WORKDIR /usr/src/app/build
RUN shrink init && shrink -r -c -s -m -v && rm shrink.json && rm package-lock.json

FROM missionio/prod:latest
WORKDIR /usr/src/app
EXPOSE 80
COPY --from=build /usr/src/app/build /usr/src/app
CMD [ "./node_modules/.bin/pm2-runtime", "start", "pm2.json" ]
