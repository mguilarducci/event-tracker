# event-tracker
:post_office: for events

# Installation

Use npm:

`npm install --save event-tracker`

# Usage

```js
var EventTracker = require('event-tracker');
eventTracker = new EventTracker();
```

## Intercom support

```js
var IntercomTracker = require('event-tracker/lib/trackers/intercom-tracker');

eventTracker.use(new IntercomTracker({
  appId: 'your-intercom-app-id',
  secretKey: 'your-intercom-secret-key',
  apiKey: 'your-intercom-api-key'
}));
```

## Get identifiers

```js
var identifiers = eventTracker.getIdentifiers('intercom',
  { userId: 'your-application-user-id', email: 'your-application-user-email' });
  
console.log(identifiers);
// { 
//    user_id: 'your-application-user-id', 
//    email: 'your-application-user-email',
//    user_hash: 'hash'
// }
```

## Create events

```js
eventTracker.createEvent('intercom', 'event-name', {
  userId: 'your-application-user-id', 
  email: 'your-application-user-email',
  metadata: {
  	custom_data_1: 'value',
  	custom_data_2: 'value',
  	custom_data_3: 'value',
  	custom_data_4: 'value',
  	custom_data_5: 'value'
  }
});
```
