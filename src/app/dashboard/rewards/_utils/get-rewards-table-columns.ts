export const getRewardsTableColumns = (group: 'rewards' | 'categories') => {
  switch (group) {
    case 'rewards':
      return ['Reward', 'Points', 'Category'];
    case 'categories':
      return ['Category', 'Reward(s)'];
  }
};
