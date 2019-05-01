FROM missionio/dev as build
WORKDIR /app

COPY [".", "./"]
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
RUN npm install
RUN mio build -e prod -i -v 
RUN ls -ls
WORKDIR /app/build
# RUN shrink init && shrink -r -c -s -m -v && rm shrink.json && rm package-lock.json

FROM missionio/prod:latest
WORKDIR /app

# Installs latest Chromium (72) package.
RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
    chromium@edge \
    nss@edge \
    freetype@edge \
    harfbuzz@edge \
    ttf-freefont@edge

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
USER pptruser

EXPOSE 3000
COPY --from=build /app/build /app
CMD [ "./node_modules/.bin/pm2-runtime", "start", "pm2.json" ]
