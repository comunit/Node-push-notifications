console.log('service worker loaded...');

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('push recieved...');
  self.registration.showNotification(data.title, {
    body: 'notified by Imran Rafique',
    icon: 'http://image.ibb.co/frY0Fd/tmlogo.png'
  });
});