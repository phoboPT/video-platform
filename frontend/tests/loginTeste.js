/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';

fixture`New Fixture`.page`http://localhost:7777`;

test('Teste Login', async t => {
  await t
    .click(Selector('#button-signin'))
    .typeText(Selector('#email'), 'teste@teste.com')
    .pressKey('tab')
    .typeText(Selector('#password'), 'a')
    .pressKey('enter')
    .expect(Selector('a').withText('HI').innerText)
    .eql('HI , ADMIN HUGO DFDSF');
});
