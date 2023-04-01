export default {
  get: (name: string) => {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem(name);
      return storage ? JSON.parse(storage) : null;
    }
  },
  set: (name: string, value: any) => {
    if (typeof window !== 'undefined') {
      return localStorage.setItem(name, JSON.stringify(value));
    }
  },
  remove: (name: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.removeItem(name);
    }
  },
  removeAll: () => {
    if (typeof window !== 'undefined') {
      return localStorage.clear();
    }
  },
};
