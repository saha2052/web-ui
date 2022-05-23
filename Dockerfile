FROM node:13.8.0-buster

WORKDIR /app

ENV LANG C.UTF-8
ENV NPM_CONFIG_LOGLEVEL warn
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY env-config.js /app/public/env-config.js

RUN apt-get -q update && apt-get clean && \
    apt-get install -y \
    supervisor \
    nginx && \
    mkdir -p /var/log/supervisor && mkdir -p /etc/supervisor/conf.d \
    rm -rf /var/lib/apt/lists/*


RUN echo "daemon off;" >> /etc/nginx/nginx.conf
COPY nginx-app.conf /etc/nginx/sites-available/default
COPY supervisor-app.conf /etc/supervisor.conf
# RUN supervisorctl reread
# RUN supervisorctl update

ADD ./ /app

RUN npm install
WORKDIR /app

EXPOSE 80 443 3000

CMD ["supervisord", "-c", "/etc/supervisor.conf"]
#CMD ["npm", "start"]
