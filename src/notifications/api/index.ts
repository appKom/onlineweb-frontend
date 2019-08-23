import { getUser } from 'authentication/api';
import * as api from 'common/utils/api';
import { INotificationSetting, INotificationSubscription } from 'notifications/models/Notification';

const API_URL = '/api/v1/notifications';

export const getSubscriptions = async () => {
  const user = await getUser();
  return api.get<api.IAPIData<INotificationSubscription>>(API_URL + '/subscriptions/', { page_size: 60 }, { user });
};

export const postSubscription = async (sub: PushSubscription) => {
  const user = await getUser();
  const json = sub.toJSON();
  const data = {
    auth: json.keys ? json.keys.auth : null,
    p256dh: json.keys ? json.keys.p256dh : null,
    endpoint: json.endpoint,
  };
  await api.post(API_URL + '/subscriptions/', data, {}, { user });
};

export const deleteSubscription = async (id: number) => {
  const user = await getUser();
  await api.del(`${API_URL}/subscriptions/${id}/`, { user });
};

export const getSettings = async () => {
  const user = await getUser();
  return api.get<api.IAPIData<INotificationSetting>>(API_URL + '/settings/', { page_size: 60 }, { user });
};

export const updateSettings = async (id: number, setting: Partial<INotificationSetting>) => {
  const user = await getUser();
  return api.patch<INotificationSetting>({ query: `${API_URL}/settings/${id}/`, data: setting, options: { user } });
};
