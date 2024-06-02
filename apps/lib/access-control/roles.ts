export enum Role {
  Admin = 0,
  User = 1,
  Guest = 2
}

export const rolesMetadata = {
  [Role.Admin]: {
    name: 'Admin',
    description: 'Admin role'
  },
  [Role.User]: {
    name: 'User',
    description: 'User role'
  },
  [Role.Guest]: {
    name: 'Guest',
    description: 'Guest role'
  },
}
