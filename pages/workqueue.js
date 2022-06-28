const { I,  SCNJPage } = inject();

module.exports = {

  labels: {
    workqueue: "//label[contains(@class, 'kofax-label')]//h1[contains(text(), 'Work Queue')]",
  
  },

  menus: {
    menuItem: "//span[contains(@id, 'WorkspaceMenu') and contains (text(), 'test_12345')]",
  },

  URLs: {
    workqueueUrl: 'TotalAgility/Forms/GeneralWorkQueue.form',
    scnj: 'TotalAgility/Forms/DEV_ThinClient_Sanity_Process_Scan.form',
    
  },

  elements: {
    querytreelist: "//div[contains(@class, 'Querytreelist')]",
    homeIcon: "//*[contains(@data-qtip, 'Home')]",
  },

  activities: {
    scan: "//a[contains(text(), 'Scan_Activity')]",
  },

  async openSCNJ () {
     I.click(this.menus.menuItem);
     I.waitForElement(SCNJPage.containers.baseContaner, 10);
   },

   async takeLastScanActivity () {
    let numOfElements = await I.grabNumberOfVisibleElements(this.activities.scan);
    I.click("("+ this.activities.scan + ")" + `[${numOfElements}]`);
    I.waitForElement(SCNJPage.panels.navigator, 10);
    I.waitForElement(SCNJPage.docTypesFields.BHPassport.PassportNumber.field, 10);
  },
}
