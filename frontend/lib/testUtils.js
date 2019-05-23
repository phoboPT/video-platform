import casual from 'casual';

// seed it so we get consistent results
casual.seed(777);

const fakeItem = () => ({
  __typename: 'Course',
  createdAt: '2019-04-04T08:56:43.705Z',
  id: '123',
  price: '25,00',
  state: 'PUBLISHED',
  thumbnail:
    'https://www.google.com/imgres?imgurl=http%3A%2F%2Fqnimate.com%2Fwp-content%2Fuploads%2F2014%2F03%2Fimages2.jpg&imgrefurl=http%3A%2F%2Fqnimate.com%2Funderstanding-html-img-tag%2F&docid=2QpCn8mhLjh9DM&tbnid=RYBz6TYw2D7ZZM%3A&vet=10ahUKEwjHubO1xobiAhWIoBQKHaruA5gQMwhCKAMwAw..i&w=800&h=400&bih=976&biw=1920&q=img&ved=0ahUKEwjHubO1xobiAhWIoBQKHaruA5gQMwhCKAMwAw&iact=mrc&uact=8',
  title: 'Javascript for dummies',
});

const fakeUser = () => ({
  __typename: 'User',
  id: '4234',
  name: casual.name,
  email: casual.email,
  permissions: ['ADMIN'],
  orders: [],
  cart: [],
});

const fakeOrderItem = () => ({
  __typename: 'OrderItem',
  id: casual.uuid,
  image: `${casual.word}.jpg`,
  title: casual.words(),
  price: 4234,
  quantity: 1,
  description: casual.words(),
});

const fakeOrder = () => ({
  __typename: 'Order',
  id: 'ord123',
  charge: 'ch_123',
  total: 40000,
  items: [fakeOrderItem(), fakeOrderItem()],
  createdAt: '2018-04 - 06T19: 24: 16.000Z',
  user: fakeUser(),
});

const fakeCartItem = overrides => ({
  __typename: 'CartItem',
  id: 'omg123',
  quantity: 3,
  item: fakeItem(),
  user: fakeUser(),
  ...overrides,
});

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export {
  LocalStorageMock,
  fakeItem,
  fakeUser,
  fakeCartItem,
  fakeOrder,
  fakeOrderItem,
};
