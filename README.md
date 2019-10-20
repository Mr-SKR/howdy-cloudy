# Howdy Cloudy
Howdy Cloudy is a Webapplication to retrieve weather information based on location.

## Prerequisites

### Install dependencies

* Install [Node](https://nodejs.org/en/)
* Navigate to the project directory(howdy-cloudy)
> npm install

### Obtain API keys

Signup and obtain API keys from below service providers

* [Dark Sky](https://darksky.net/dev)
* [Mapbox](https://account.mapbox.com/)

Insert the ontained API keys in howdy-cloudy/src/utils/apikeys.json and save changes

```
{
    "darksky_access_token": "[INSERT DARKSKY API KEY HERE]",
    "mapbox_access_token": "[INSERT MAPBOX API KEY HERE]"
}
```

## Run

> node src/app.js
