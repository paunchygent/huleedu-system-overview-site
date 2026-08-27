# syntax=docker/dockerfile:1.7
FROM nginx:1.30.4-alpine@sha256:97d490c12ba55b4946b01546d1c3ed324e8d41ab1c9fcb2a616aa470620e5b46

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /usr/share/nginx/html/huleedu-system-overview
COPY public/huleedu-system-overview.html /usr/share/nginx/html/huleedu-system-overview/index.html
COPY public/huleedu-system-overview.css /usr/share/nginx/html/huleedu-system-overview/huleedu-system-overview.css
COPY public/evidence /usr/share/nginx/html/evidence
COPY public/code /usr/share/nginx/html/code
COPY public/favicon.svg /usr/share/nginx/html/favicon.svg
