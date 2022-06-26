const assert =  require ('chai').assert;
Feature('classifyDoc');
Before (({I}) => {
    I.amOnPage('/');
});

Scenario ('Test classification a doc', async ({ I, workqueuePage, loginPage, SCNJPage, scanSettingsPage}) => {
    await loginPage.login ('ws2019dock\\Administrator', 'd63mf44f!');
    await workqueuePage.openSCNJ();
    await SCNJPage.openScanSettings();
    await scanSettingsPage.setFileImport();
    await SCNJPage.sendPath();
    await SCNJPage.importDoc();
    await SCNJPage.setDocType("BHPassport");
    let doc = await I.grabAttributeFrom(SCNJPage.docs.firstDoc, 'data-qtip');
    assert.include(doc, "BHPassport", "The doc has not been classified");
    
});