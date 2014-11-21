describe('root-state', function() {
  it('display the message', function() {
    browser.get('http://localhost:3444'); 

    var textElem = element(by.binding('test.statement'))

    expect(textElem.getText()).toEqual('This is the application root not.');
  });
});