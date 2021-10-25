import { Ability, AbilityBuilder } from '@casl/ability';

class Policy {
  public static handle(user: any) {
    const { rules, can } = new AbilityBuilder(Ability);

    const policies: any = {
      guest(user: any, can: any) {
        can('create', 'Account');
      },
      user(user: any, can: any) {
        can('create', 'Todos');
        can('read', 'Todos', { user_id: user.id });
      },
      admin(user: any, can: any) {
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
