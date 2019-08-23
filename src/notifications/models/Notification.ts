export interface INotificationSubscription {
  id: number;
  endpoint: string;
  auth: string;
  p256dh: string;
}

export interface INotificationSetting {
  id: number;
  message_type: string;
  mail: boolean;
  push: boolean;
  verbose_type: string;
}

export interface INotification {
  id: number;
  message_type: string;
  sent: boolean;
  title: string;
  body: string;
  tag: string;
  badge: string;
  image: string | null;
  icon: string | null;
  require_interaction: boolean;
  renotify: boolean;
  silent: boolean;
  timestamp: number;
  url: string;
  verbose_type: string;
}
