/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import serviceAccount from '../config/push-notification-b0558-firebase-adminsdk-wi7f5-e3c54bd4a3.json'

//@ts-ignore
import FCM from 'fcm-notify'

const fcm = new FCM(serviceAccount)

export const pushNotification = (deviceTokens: string, data: string) => {
  const message = {
    token: deviceTokens,
    notification: {
      title: 'An order placed!',
      body: data,
    },
  }

  //@ts-ignore
  return fcm.send(message, function (err, response) {})
}
