FROM node:16-slim

MAINTAINER Dorian Smiley, dsmiley@codestrap.me

WORKDIR /usr/app

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y xvfb \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# If running Docker >= 1.13.0 use docker run's --init arg to reap zombie processes, otherwise
# uncomment the following lines to have `dumb-init` as PID 1
# ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_x86_64 /usr/local/bin/dumb-init
# RUN chmod +x /usr/local/bin/dumb-init
# ENTRYPOINT ["dumb-init", "--"]

# Uncomment to skip the chromium download when installing puppeteer. If you do,
# you'll need to launch puppeteer with:
#     browser.launch({executablePath: 'google-chrome-stable'})
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
COPY package.json .
# COPY package-lock.json .
COPY server.js .
COPY index.html .
COPY ./button ./button
COPY ./css ./css
COPY ./image-gallery ./image-gallery
COPY ./ssr ./ssr
# the example app uses a local file ref for the lotus lib to help enable testing and development
# we need to replace it in Docker container since the ref will break
RUN sed -i 's/file:../3.0.1/' package.json

# Install puppeteer so it's available in the container.
RUN npm install \
    # Add user so we don't need --no-sandbox.
    # same layer as npm install to keep re-chowned files from using up several hundred MBs more space
    && groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /usr/app/node_modules \
    && chown -R pptruser:pptruser /usr/app/image-gallery

# Run everything after as non-privileged user.
USER pptruser

ENV PORT=3000
ENV DISPLAY=1.0
ENV DEBUG='lotus-ssr:*'

EXPOSE 3000

CMD ["google-chrome-stable"]
