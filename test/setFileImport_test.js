const assert = require ('assert');
Feature('setFileImport');

Before (({I}) => {
    I.amOnPage('/');
});

Scenario ('Test we can set File Import as a Scan Source', async ({ I, workqueuePage, loginPage, SCNJPage, scanSettingsPage}) => {
    await loginPage.login ('ws2019dock\\Administrator', 'd63mf44f!');
    await workqueuePage.openSCNJ();
    await SCNJPage.openScanSettings();
    await scanSettingsPage.setFileImport();
    let currentScanner = await I.grabTextFrom(SCNJPage.labels.currentScanner);
    assert.strictEqual(currentScanner, "File Import", "File Import scan source was not set");
});
