FROM node:24-alpine
WORKDIR /app
COPY --chown=node:node . .
RUN mkdir -p /app/var && chown node:node /app/var
USER node
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000 DATA_DIR=/app/var
EXPOSE 3000
CMD ["node","server/index.mjs"]
