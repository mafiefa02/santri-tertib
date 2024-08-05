export const getRewardsTableColumns = (group: 'rewards' | 'categories') => {
  switch (group) {
    case 'rewards':
      return ['Reward', 'Points', 'Category', 'Actions'];
    case 'categories':
      return ['Category', 'Reward(s)', 'Actions'];
  }
};
