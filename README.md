      _  __  ._  _ _/__. _
     /_///_///_'/_ / //_\ 
    /     |/        |/    


Spacecubed's Projectr(js)
=====================

Sources:
-------
- Twitter Streaming API - by specified terms
- Twitter Streaming API - by user
- Instagram - Polling

Notings:
-------
- Sources are streamed in preference, or polled as required

Get projecting:
--------------
- git clone
- npm install
- cp sample.env .env && (Edit it with your settings)
- foreman start
- browse to http://localhost:5000

A note on data:
--------------

The easiest option for local development is to use the inbuilt fake data source.

- Achieve this by browsing to: http://localhost:5000?data=fake

If you want to test the against real data sources you'll need to:

- Ensure you have correct keys etc. set in your .env
- Run mongo locally: `mongod`
- Wait for the events to be collected in your Mongo
- Grin happily

