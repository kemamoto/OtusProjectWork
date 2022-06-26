const assert =  require ('chai').assert;
Feature('importDoc');
Before (({I}) => {
    I.amOnPage('/');
});

Scenario ('Test importing a doc', async ({ I, workqueuePage, loginPage, SCNJPage, scanSettingsPage}) => {
    await loginPage.login ('ws2019dock\\Administrator', 'd63mf44f!');
    await workqueuePage.openSCNJ();
    await SCNJPage.openScanSettings();
    await scanSettingsPage.setFileImport();
    await SCNJPage.sendPath();
    await SCNJPage.importDoc();
    I.waitForElement(SCNJPage.docs.firstDoc, 30); 
    let counter = await I.grabTextFrom(SCNJPage.toolbars.statusBarCounters);
    assert.include(counter, "Pages Scanned: 1", "The doc has not been imported");
   
    
});