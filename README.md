node-websocket
================================================================================

simple websocket tester for node

Run as:

    node server.js

You can also push this project to a Cloud Foundry instance with:

    cf push

After running/pushing the app, visit the server in a browser;
a WebSocket will be open in the browser, and messages will
be sent/received to/from the server via the WebSocket.

The server just echos the messages sent to it, prefixed by the
number of messages received by the server.
