# Basic Weather App

### About

An application created as a demo for React, TypeScript, NestJS, and TypeORM.
It allows you to access the OpenWeatherMap API and check the current weather conditions in various cities.
Additionally, it includes a login panel secured with JWT, enabling access to usage statistics for the panel.
All you need to run the application is your own token from [oenweathermap](https://openweathermap.org/)
and your secret key to secure the tokens.

/backend/.env
~~~
OPEN_WEAHTER_API_KEY=
JWT_SECRET=
~~~~

Then and app 
~~~~
docker-compose up --build
~~~~