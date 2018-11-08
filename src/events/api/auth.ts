import { AUTH } from 'common/constants/endpoints';
import { get, post } from 'common/utils/api';

export const signIn = async (username: string, password: string): Promise<void> => {
  const user = await post(AUTH, { username, password });
};

export const signOut = async (): Promise<void> => {
  // TODO: implement logout with redux
};
