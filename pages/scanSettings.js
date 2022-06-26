const { I } = inject();

module.exports = {

  elements: {
    scanSettingsDialog: "#ScanSettingsDialog",
    selectScannerCombo: "//input[contains(@id, 'scan-settings-scanner-scanner-selection-combobox')]",
    selectFileImport: "//*[(@role='option') and contains (text(), 'File Import')]",
    saveSettingButton: "#save-settings-button",
  },

  async setFileImport () {
    I.click(this.elements.selectScannerCombo);
    I.click(this.elements.selectFileImport);
    I.click(this.elements.saveSettingButton);
    I.waitForInvisible(this.elements.scanSettingsDialog);
  },

}
