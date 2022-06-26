const { I, workqueuePage } = inject();

module.exports = {

  fields: {
    username: "input[name='loginUsernameField']",
    password: "input[name='loginPasswordField']",
  },

  buttons: {
    loginButton: "//div[contains (text(), 'Login')]"
  },
  
  async login (username, password) {
    I.waitForElement(this.fields.username, 10);
    I.click(this.fields.username);
    I.fillField(this.fields.username, username);
    I.click(this.fields.password);
    I.fillField(this.fields.password, password);
    I.click(this.buttons.loginButton);
    I.waitForElement(workqueuePage.menus.menuItem, 10);
  },

}
