import { BeexpressPage } from './app.po';

describe('beexpress App', () => {
  let page: BeexpressPage;

  beforeEach(() => {
    page = new BeexpressPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
