import { IntegraBIPage } from './app.po';

describe('integraBI App', function() {
  let page: IntegraBIPage;

  beforeEach(() => {
    page = new IntegraBIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
