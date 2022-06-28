const assert =  require ('chai').assert;
Feature('addValueToField');
Before (({I}) => {
    I.amOnPage('/');
});

Scenario ('Test adding a value to the field', async ({ I, workqueuePage, loginPage, SCNJPage, scanSettingsPage}) => {
    await loginPage.login ('ws2019dock\\Administrator', 'd63mf44f!');
    await workqueuePage.openSCNJ();
    await SCNJPage.openScanSettings();
    await scanSettingsPage.setFileImport();
    await SCNJPage.sendPath();
    await SCNJPage.importDoc();
    await SCNJPage.setDocType("BHPassport");
    let text = "SomeText12345";
    await SCNJPage.typeToField(SCNJPage.docTypesFields.BHPassport.PassportNumber.field, text);
    await SCNJPage.createJob();
    I.waitForElement(workqueuePage.activities.scan, 10);
    await workqueuePage.takeLastScanActivity();
    let value = await I.grabAttributeFrom(SCNJPage.docTypesFields.BHPassport.PassportNumber.field, 'value');
    assert.include(value, text, "Value is incorrect");
    
});
