export const enum UserType {
  User = 'User',
  Organization = 'Organization',
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

export const enum ContentType {
  File = 'file',
  Dir = 'dir',
}

export const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Java: '#b07219',
  Dart: '#00B4AB',
  Vue: '#4fc08d',
  Kotlin: '#F18E33',
  Python: '#3572A5',
  HTML: '#e34c26',
  Dockerfile: '#384d54',
  CSS: '#157dbe',
  'C++': '#f34b7d',
  'Jupyter Notebook': '#DA5B0B',
  'Objective-C': '#438eff',
}
