FROM node:latest
MAINTAINER Guillaume Blanco <guillaume.blanco@heig-vd.ch>

#
# When we build the image, we copy the executable jar in the image file system.
#
COPY src /opt/app/

WORKDIR /opt/app/
RUN npm install

ENTRYPOINT ["node", "/opt/app/musician.js"]
