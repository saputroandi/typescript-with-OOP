import { Ability, AbilityBuilder } from '@casl/ability';

interface User {
  id: number;
  email: string;
  role: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
  iat?: number;
}

class Policy {
  public static handle(user: User) {
    const { rules, can } = new AbilityBuilder(Ability);

    const policies: any = {
      guest(
        user: { role: string; id?: string },
        can: (ability: string, subject: string, field?: {}) => void
      ): void {
        can('create', 'Account');
      },
      user(
        user: { role: string; id?: string },
        can: (ability: string, subject: string, field?: {}) => void
      ): void {
        can('create', 'Todos');
        can('read', 'Todos', { user_id: user.id });
      },
      admin(
        user: { role: string; id?: string },
        can: (ability: string, subject: string, field?: {}) => void
      ): void {
        can('manage', 'all');
      },
    };

    if (user && typeof policies[user.role] === 'function') {
      policies[user.role](user, can);
    } else {
      policies['guest'](user, can);
    }

    return new Ability(rules);
  }
}

export default Policy;
