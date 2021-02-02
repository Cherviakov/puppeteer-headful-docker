### Puppeteer headfull docker example

Puppeteer usually run in headless mode and that is enough for most needs.
However sometimes it is required to run puppeteer in headful mode, in
particular that is the case when you need to download pdf from URL, which
points to pdf directly, therefore browser embed pdf in html page, when
you navigate to its URL.

To run puppeteer headful on remote server need to use xvfb package, wich
emulates X server allows browser to think it is actually displaying something.
Command used looks as follows:
```sh
xvfb-run --server-args="-screen 0 1024x768x24" npm start
```

Trying to use same command in Docker though ends in failure due to puppeteer
cannot connect to X server. To resolve this need to run xvfb separately and
specify in env variables exact display to use.

Current repository showcase how it is done, start.sh running xvfb and then
node application, Dockerfile specify environmental variable and runs start.sh

Kudos to https://stackoverflow.com/questions/32151043/xvfb-docker-cannot-open-display

### Docker

docker build -t headful .
docker run -d --name headful headful
