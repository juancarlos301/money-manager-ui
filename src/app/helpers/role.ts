import { SessionTokenType } from '../types';

type ChPermParamsType = (
  profile: string[],
  currentUser: SessionTokenType,
  strict?: boolean
) => boolean;

export const chPerm: ChPermParamsType = (
  profile,
  currentUser,
  strict = false
) => {
  if (currentUser && currentUser.role) {
    return profile.includes(currentUser.role)
      ? true
      : currentUser.role.includes('totalAccess') && !strict;
  }
  return false;
};
