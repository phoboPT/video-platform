/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';

fixture`testes`.page`http://localhost:7777`;

test('createAccount', async t => {
  await t
    .click(Selector('#button-signin'))
    .click(Selector('#register-button'))
    .typeText(Selector('#email'), '1234@1234.pt')
    .pressKey('tab')
    .typeText(Selector('#name'), '123')
    .pressKey('tab')
    .typeText(Selector('#password'), '12345678')
    .click(Selector('#register'))
    .expect(Selector('p').withText('Welcome to Video Platform 123').exists)
    .eql(true);
});
