import React, { FC, useEffect, useState } from 'react';

import { md } from 'common/components/Markdown';
import { Pane } from 'common/components/Panes';
import {
  getNotificationPermission,
  resolveNotificationPermission,
  verifyNotification,
} from 'common/utils/notification';
import {
  getNotificationSubscription,
  registerPushManager,
  removeNotificationSubscription,
  verifyPushManager,
} from 'common/utils/pushManager';
import { useToast } from 'core/utils/toast/useToast';
import { deleteSubscription, getSettings, getSubscriptions, postSubscription, updateSettings } from 'notifications/api';
import { INotificationSetting, INotificationSubscription } from 'notifications/models/Notification';
import { verifyServiceWorker } from 'serviceworker/browser';

import BrowserSupport from './BrowserSupport';
import style from './notifications.less';
import Option from './Option';

const ABOUT_NOTIFICATIONS = md`
  # Notifikasjoner

  Notifikasjoner kan brukes til å sende deg varsler for hendelser som skjer
  på nettsiden uten at du trenger å være på den direkte.
`;

const ABOUT_BROWSER_SUPPORT = md`
  ### Nødvendige funksjoner

  For at det skal være mulig å bruke notifikasjoner fullt ut
  må følgende funksjonaliteter være tilgjengelige i nettleseren:
`;

const ABOUT_ENABLE_NOTIFICATIONS = md`
  ### Tillat Notifikasjoner

  For å kunne bruke dette må du gi oss tillatelse til å sende deg varsler.
  Dette er funksjonalitet bygget inn i nettleseren,
  og du må først gi tillatelse til å bruke det på hele nettstdet.
`;

const ABOUT_NOTIFICATION_OPTIONS = md`
  ### Alternativer

  Her kan du velge hvilke deler av nettsiden du ønsker å motta notifikasjoner.
`;

export const Notifications: FC = () => {
  const [allowNotifications, setAllowNotifications] = useState(resolveNotificationPermission());
  const [settings, setSettings] = useState<INotificationSetting[]>([]);
  const [subscriptions, setSubscriptions] = useState<INotificationSubscription[]>([]);
  const [subscription, setSubscription] = useState<PushSubscription | undefined>(undefined);
  const subscriptionEndpoint = subscription ? subscription.endpoint : '';
  const currentSubscription = subscriptions.find((s) => s.endpoint === subscriptionEndpoint);

  const [displayMessage] = useToast({ overwrite: true, type: 'info' });

  const fetchSettings = async () => {
    const data = await getSettings();
    setSettings(data.results);
  };

  const fetchSubscriptions = async () => {
    const data = await getSubscriptions();
    setSubscriptions(data.results);
  };

  const fetchSubscriptionFromSW = async () => {
    const sub = await getNotificationSubscription();
    setSubscription(sub || undefined);
  };

  useEffect(() => {
    fetchSubscriptions();
    fetchSettings();
    fetchSubscriptionFromSW();
  }, []);

  const toggleGlobalNotifications = async () => {
    const permission = await getNotificationPermission();
    setAllowNotifications(permission);
  };

  const subscribe = async () => {
    const { subscription: newSubscription, message } = await registerPushManager();
    setSubscription(newSubscription);
    if (message) {
      displayMessage(message);
    }
    if (newSubscription) {
      await postSubscription(newSubscription);
    }
  };

  const unsubscribe = async () => {
    const sub = await getNotificationSubscription();
    if (sub && currentSubscription) {
      await deleteSubscription(currentSubscription.id);
      const removed = await removeNotificationSubscription();
      if (removed) {
        setSubscription(undefined);
      }
    }
  };

  const toggleSubscription = async () => {
    if (currentSubscription) {
      await unsubscribe();
    } else {
      await subscribe();
    }
    await fetchSubscriptions();
  };

  const patchSetting = async (setting: INotificationSetting) => {
    await updateSettings(setting.id, { ...setting, push: !setting.push });
    await fetchSettings();
  };

  return (
    <>
      <Pane>{ABOUT_NOTIFICATIONS}</Pane>
      <Pane>
        {ABOUT_BROWSER_SUPPORT}
        <div className={style.container}>
          <BrowserSupport name="Notification" value={verifyNotification()} />
          <BrowserSupport name="PushManager" value={verifyPushManager()} />
          <BrowserSupport name="ServiceWorker" value={verifyServiceWorker()} />
        </div>
      </Pane>
      <Pane>
        {ABOUT_ENABLE_NOTIFICATIONS}
        <div className={style.container}>
          <Option
            description="Tillat notifikasjoner på dette nettstedet"
            name="allowNotifications"
            value={allowNotifications}
            toggle={toggleGlobalNotifications}
          />
          <Option
            description="Registrer denne enheten for å motta notifikasjoner"
            name="subscription"
            value={!!currentSubscription}
            toggle={toggleSubscription}
          />
        </div>
      </Pane>
      <Pane>
        {ABOUT_NOTIFICATION_OPTIONS}
        <div className={style.container}>
          {settings.map((setting) => (
            <Option
              key={setting.message_type}
              name={setting.verbose_type}
              description={setting.verbose_type}
              value={setting.push}
              toggle={() => patchSetting(setting)}
            />
          ))}
        </div>
      </Pane>
    </>
  );
};

export default Notifications;
