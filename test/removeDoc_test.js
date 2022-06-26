const assert =  require ('chai').assert;
Feature('removeDoc');
Before (({I}) => {
    I.amOnPage('/');
});

Scenario ('Test removing a doc', async ({ I, workqueuePage, loginPage, SCNJPage, scanSettingsPage}) => {
    await loginPage.login ('ws2019dock\\Administrator', 'd63mf44f!');
    await workqueuePage.openSCNJ();
    await SCNJPage.openScanSettings();
    await scanSettingsPage.setFileImport();
    await SCNJPage.sendPath();
    await SCNJPage.importDoc();
    I.click(SCNJPage.buttons.deleteButton);
    await SCNJPage.dialogYesRemove();
    I.waitForInvisible(SCNJPage.docs.firstDoc, 10);
    let counter = await I.grabTextFrom(SCNJPage.toolbars.statusBarCounters);
    assert.include(counter, "Pages in Activity: 0", "The doc has not been removed");
    
});