# FRONTEND IMAGE
FROM --platform=amd64 node:18 AS frontend

WORKDIR /frontend

COPY ./frontend/package.json .

RUN npm install

COPY ./frontend/ .

RUN npm run build


# BACKEND IMAGE --- production
FROM --platform=amd64 python:3.9.4


WORKDIR /var/www

# environment varialbes
ENV FLASK_APP=app
ENV FLAKS_ENV=production

# fill these 3 in on docker container / render environments
ARG SCHEMA
ENV SCHEMA=${SCHEMA}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG SECRET_KEY=banana
ENV SECRET_KEY=${SECRET_KEY}


# installs postgres
RUN pip install psycopg2[binary]

# copy the bin (start commands)
COPY ./bin/ ./bin/

# copies backend imports
COPY ./backend/requirements.txt ./backend/

# imports our backend deps
RUN pip install -r ./backend/requirements.txt

# copies the backend app
COPY ./backend/ ./backend

# bring in the frontend folder
COPY --from=frontend /frontend/dist ./frontend/dist


EXPOSE 5000

CMD ["bash", "./bin/start.sh"]
