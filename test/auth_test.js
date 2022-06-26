const assert = require ('assert');
Feature('auth');
Before (({I}) => {
    I.amOnPage('/');
});


Scenario('Test that we can login to KTA', async ({ I, workqueuePage, loginPage  }) => {
    await loginPage.login ('ws2019dock\\Administrator', 'd63mf44f!');
    I.seeInCurrentUrl(workqueuePage.URLs.workqueueUrl);
    I.seeElement(workqueuePage.menus.menuItem);
    let label =  await I.grabTextFrom(workqueuePage.labels.workqueue);
    assert.strictEqual(label, "Work Queue", "Work Queue page load failed");
});
