import { Selector } from 'testcafe';

fixture`testes`.page`http://localhost:7777`;

test('createCourse', async t => {
  await t
    .click(Selector('#button-signin'))
    .typeText(Selector('#email'), 'ola@ola.com')
    .pressKey('tab')
    .typeText(Selector('#password'), 'a')
    .click(Selector('#login'))
    .click(Selector('a').withText('INSTRUCTOR AREA'))
    .click(Selector('#ButtonAdd Add'))
    .typeText(Selector('#title'), 'trs')
    .pressKey('backspace')
    .pressKey('backspace')
    .typeText(Selector('#title'), 'este teste')
    .click(Selector('.ql-editor.ql-blank').find('p'))
    .typeText(Selector('.ql-editor.ql-blank').find('p'), 'isto e um teste')
    .click(Selector('button').withText('Published'))
    .click(Selector('[name="thumbnail"]'))
    .setFilesToUpload(Selector('[name="thumbnail"]'), [
      '/home/phobo/Documentos/video-platform/frontend/tests/_uploads_/DeepinScreenshot_20190624161056 1.png',
    ])
    .click(Selector('[name="price"]'), {
      caretPos: 0,
    })
    .pressKey('backspace')
    .typeText(Selector('[name="price"]'), '123')
    .click(Selector('#dropdownlist'))
    .click(Selector('option').withText('Software Design'))
    .click(Selector('#submit'))
    .expect(Selector('#title').value)
    .eql('teste teste');
});
