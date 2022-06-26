const { I, scanSettingsPage, workqueuePage } = inject();
var exec = require('child_process').execFile;
module.exports = {

  buttons: {
    openScanSettings: "//span[contains(@class, 'scanSettingsButton')]",
    scanAll: "//span[contains(@class, 'scanAllButton')]",
    createJob: "//span[contains(@class, 'createJobButton')]", 
    deleteButton: "//span[contains(@class, 'deleteDocumentButton')]",
  },

docTypesFields: {
  BHPassport: {
    PassportNumber: {
      label: "//span[contains(@class, 'form-item-label-text') and contains(text(), 'Passport Number')]",
      field: "//input[contains(@name, 'PassportNo')]",
    }
  },
  BHApplication: {

  },
},

  elements: {
    docTypeCombo: "//div[contains(@id, 'documenttypecombobox') and contains(@class, 'arrow')]",
  },

  dialogDelete: {
    body:"//div[contains(@class, 'x-window-text') and contains (text(), 'Are you sure you want to delete the selected document? All data from the document will be lost.')]",
    yesButton: "//span[contains(@id, 'button') and contains (text(), 'Yes')]",
  },

  dialogReclassify: {
    body:"//div[contains(@id, 'messagebox') and contains (text(), 'Are you sure you want to change the document type? The field data may be lost.')]",
    yesButton: "//span[contains(@id, 'button') and contains (text(), 'Yes')]",
  },

  panels: {
    navigator: "//div[contains(@id, 'header-title') and contains (text(), 'Navigator')]",
    fields: "//div[contains(@id, 'header-title') and contains (text(), 'Fields')]",
    thumbnails: "//div[contains(@id, 'header-title') and contains (text(), 'Thumbnails')]",
    imageViewer: "//div[contains(@id, 'viewerpanel') and (@class = 'x-panel-bodyWrap')]",
    
  },

 toolbars: {
    imageViewer: "//div[contains(@id, 'imagepanel')]//div[contains(@id, 'imagetoolbar') and contains (@role, 'toolbar')]",
    statusBarCounters: "//div[contains(@id, 'statusbarpanel')]//div[contains(@id, 'statusbaritem')][3]",
    statusBarUpload: "//div[contains(@id, 'statusbarpanel')]//div[contains(@id, 'statusbaritem')and contains (text(), 'Nothing to Upload')]",
  
  },

  URLs: {
    scnj: 'TotalAgility/Forms/DEV_ThinClient_Sanity_Process_Scan.form',
  },

  containers: {
    baseContaner: "//div[contains(@class, 'basethinclientview')]",
  },

  labels: {
    currentScanner: "(//label[contains(@class, 'capture-toolbar-text')])[1]"
  },

  docs: {
    firstDoc: "(//div[contains(@id, 'batchtreepanel')]//div[contains(@class, 'x-grid-item-container')]//table//tr)[2]",
  },

  async openScanSettings () {
     I.click(this.buttons.openScanSettings);
     I.waitForElement(scanSettingsPage.elements.scanSettingsDialog, 15);
   },

   async importDoc () {
    I.click(this.buttons.scanAll);
    I.waitForElement(this.toolbars.statusBarUpload, 30);
  },

  sendPath () {
   exec('./upload/1doc.exe', function(err, data) {  
        console.log(err);                  
    });  
},

async setDocType (type) {
  const docType = `//li[contains(@class, 'x-boundlist-item') and contains (text(), '${type}')]`;
  I.click(this.docs.firstDoc);
  I.click(this.elements.docTypeCombo);
  I.click(docType);
  I.waitForElement(`//div[contains(@id, 'batchtreepanel')]//div[contains(@class, 'x-grid-item-container')]//table//tr[contains(@data-qtip, '1: ${type} (1)')]`, 15);
},
   
async changeDocType (type) {
  const docType = `//li[contains(@class, 'x-boundlist-item') and contains (text(), '${type}')]`;
  I.click(this.docs.firstDoc);
  I.click(this.elements.docTypeCombo);
  I.click(docType);
},

async dialogYesRemove () {
  I.waitForVisible(this.dialogDelete.body);
  I.waitForClickable(this.dialogDelete.yesButton, 10);
  I.click(this.dialogDelete.yesButton);
  },

  async dialogYesReclassify () {
    I.waitForVisible(this.dialogReclassify.body);
    I.waitForClickable(this.dialogReclassify.yesButton, 10);
    I.click(this.dialogReclassify.yesButton);
    },

    async typeToField (field, value) {
      I.click(field);
      I.fillField(field, value);
      I.pressKey('Enter');
  },

  async createJob () {
    I.click(this.buttons.createJob);
    I.click(workqueuePage.elements.homeIcon);
    I.waitForElement(workqueuePage.labels.workqueue, 10);
  },

}
