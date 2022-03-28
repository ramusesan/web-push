// let cacheData = "appV3";

// const urlsToCache = [
//   "/",
//   "/index.html",
//   "/static/js/bundle.js",
//   "/static/js/0.chunk.js",
//   "/static/js/main.chunk.js",
//   "/manifest.json",
//   "/favicon.ico",
//   "/images/logo.png",
//   "/logo192.png",
//   "/users",
// ];

// // Set the files into cache...
// this.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheData).then((cache) => {
//       cache.addAll(urlsToCache);
//     })
//   );
// });

// var options = {
//   body: "you successfully subscribed to our services from SW",
//   icon: "./images/icons/pearson-icon.png",
//   image: "./images/pearson-subject.png",
//   dir: "ltr",
//   lang: "en-US",
//   vibrate: [100, 50, 200],
//   badge: "./favicon.ico", // only andriod has badge
//   tag: "assignment-notification", // groups multi messages as single message based on this tag names
//   renotify: true, // if true ,then even if we send multi msg on same tag name this will vibrate. otherwise wont notify

//   actions: [
//     { action: "confirm", title: "OK" },
//     { action: "cancel", title: "Cancel" },
//   ],
//   requireInteraction: true
// };

// const title = "Success";

// // Get the files into cache...
// this.addEventListener("fetch", (event) => {
//   if (event.request.url === "http://localhost:3000/static/js/bundle.js") {
//     console.log("URL", event.request.url);
//     event.waitUntil(
//       // this.registration.showNotification(title, options) // show notification
//     );
//   }

//   if (!navigator.onLine) {
//     event.respondWith(
//       caches.match(event.request).then((resp) => {
//         if (resp) {
//           console.log("HEllo", resp);
//           return resp;
//         }
//         let requestUrl = event.request.clone();
//         fetch(requestUrl);
//       })
//     );
//   }
// });


// Get the files into cache...
this.addEventListener('notificationclick', function(event) {

    console.log(event);
    var notification = event.notification;
    var action = event.action;
  
    console.log(notification);
  
    if (action === 'confirm') {
      console.log('Confirm was chosen');
      notification.close();
    } else {
      console.log(action);
      event.waitUntil(
        clients.matchAll()
          .then(function(clis) {
            var client = clis.find(function(c) {
              return c.visibilityState === 'visible';
            });
  
            if (client !== undefined) {
            //   client.navigate(notification.data.url);
              client.navigate('https://web-push-client.herokuapp.com/');
              client.focus();
            } else {
              clients.openWindow('https://web-push-client.herokuapp.com/');
            }
            notification.close();
          })
      );
    }
  });
  