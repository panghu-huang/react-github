export const enum UserType {
  User = 'user',
  Organization = 'organization',
}

export const enum EventType {
  ForkEvent = 'ForkEvent',
  WatchEvent = 'WatchEvent',
  PublicEvent = 'PublicEvent',
  DeleteEvent = 'DeleteEvent',
  PushEvent = 'PushEvent',
  PullRequestEvent = 'PullRequestEvent',
  CreateEvent = 'CreateEvent',
}