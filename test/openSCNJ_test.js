const assert = require ('assert');
Feature('openSCNJ');
Before (({I}) => {
    I.amOnPage('/');
});

Scenario ('Test that Scan Create New Job form is opened by clicking menu item', async ({ I, workqueuePage, loginPage, SCNJPage }) => {
    await loginPage.login ('ws2019dock\\Administrator', 'd63mf44f!');
    await workqueuePage.openSCNJ();
    I.seeInCurrentUrl(SCNJPage.URLs.scnj);
    let navigator =  await I.grabTextFrom(SCNJPage.panels.navigator);
    assert.strictEqual(navigator, "Navigator", "SCNJ form is not opened");
});

