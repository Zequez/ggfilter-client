const names = {
  steam: {
    name: 'Steam'
  },
  oculus: {
    name: 'Oculus'
  }
};

export type Stores = keyof typeof names;
export const storesKeys = Object.keys(names) as Stores[];
export default names;
