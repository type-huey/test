import {
  PlatformTokenField,
  PlatformTokenFieldProps,
  useGitlabToken,
  useRedminToken,
  usePlatformTokenActions,
} from '~/entities/platform-token';
import { usePlatformSyncConfigActions } from '~/entities/platform-sync';
import {
  PLATFORM_NAME,
  PLATFORM_TOKEN_STATUS,
  PlatformNameUnion,
  PlatformTokenStatusUnion,
} from '~/shared/constants/platform';
import { getUserInfo as healthCheckRedmine } from '~/entities/redmine/api';
import { getGitlabVersion } from '~/entities/gitlab/api/gitlab.api';

export const PlatformTokenForm = () => {
  const gitlab = useGitlabToken();
  const redmine = useRedminToken();
  const { setAuthenticated, setUnauthenticated, rest } = usePlatformTokenActions();
  const { setConfigPlatform, removeSyncPlatform } = usePlatformSyncConfigActions();

  const handleVerify = (platformName: PlatformNameUnion) => {
    return (value: string, tokenStatus: PlatformTokenStatusUnion) => {
      if (tokenStatus === PLATFORM_TOKEN_STATUS.AUTHENTICATED) {
        setAuthenticated(platformName, value);
      } else if (tokenStatus === PLATFORM_TOKEN_STATUS.UNAUTHENTICATED) {
        setUnauthenticated(platformName);
        removeSyncPlatform(platformName);
      } else {
        rest(platformName);
        removeSyncPlatform(platformName);
      }
    };
  };

  const fields: ({ _id: PlatformNameUnion } & PlatformTokenFieldProps)[] = [
    {
      _id: PLATFORM_NAME.GITLAB,
      labelText: 'GitLab',
      placeholder: 'GitLab 토큰을 입력해주세요',
      defaultValue: gitlab.token,
      tokenStatus: gitlab.status,
      authenticate: async (token) => {
        let result = false;

        try {
          const res = await getGitlabVersion(token);

          result = !!res?.version;
        } catch (error) {}

        return result;
      },
      onVerify: handleVerify(PLATFORM_NAME.GITLAB),
    },
    {
      _id: PLATFORM_NAME.REDMINE,
      labelText: 'Redmine',
      placeholder: 'Redmine 토큰을 입력해주세요',
      defaultValue: redmine.token,
      tokenStatus: redmine.status,
      authenticate: async (token) => {
        let result = false;

        try {
          const res = await healthCheckRedmine(token);

          setConfigPlatform(PLATFORM_NAME.REDMINE, { userId: res.user.id });

          result = true;
        } catch (error) {}

        return result;
      },
      onVerify: handleVerify(PLATFORM_NAME.REDMINE),
    },
  ];

  return (
    <>
      {fields.map((field) => (
        <PlatformTokenField key={field._id} {...field} />
      ))}
    </>
  );
};
