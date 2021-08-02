import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    (window as any).plugins.OneSignal.setLogLevel({
      logLevel: 6,
      visualLevel: 0,
    });

    const notificationOpenedCallback = function (jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    // Set your iOS Settings
    const iosSettings = {};
    iosSettings['kOSSettingsKeyAutoPrompt'] = false;
    iosSettings['kOSSettingsKeyInAppLaunchURL'] = false;

    // Ionic 5 Capacitor may need to use (window as any).plugins.OneSignal
    (window as any).plugins.OneSignal.startInit(
      '3b2b0888-adbb-4bb7-998a-1b72fc8f6c20'
    )
      .handleNotificationOpened(notificationOpenedCallback)
      .iOSSettings(iosSettings)
      .inFocusDisplaying(
        (window as any).plugins.OneSignal.OSInFocusDisplayOption.Notification
      )
      .endInit();

    (
      window as any
    ).plugins.OneSignal.promptForPushNotificationsWithUserResponse(function (
      accepted
    ) {
      console.log('User accepted notifications: ' + accepted);
    });
  }
}
