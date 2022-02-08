FROM mhart/alpine-node:11
RUN sudo apt install tesseract-ocr
RUN sudo apt install libtesseract-dev
WORKDIR /repo
COPY . .
RUN yarn
RUN yarn build
RUN yarn install --production --ignore-scripts --prefer-offline

EXPOSE 3000

ENTRYPOINT ["node", "-r", "dotenv-extended/config"]

CMD ["server/index.js"]
