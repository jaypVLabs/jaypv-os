import wixEditor from "wix-editor";

// Entry point for sandbox experiments
console.log('Sandbox environment is ready.');

wixEditor.getCurrentViewport().then((viewport) => {
  // Your code that uses the 'viewport' value goes here
  console.log('Current viewport:', viewport);
  /* For example, `viewport` can be: 
    {
      type: "DESKTOP",
      range: {
        minWidth: 1001,
        maxWidth: undefined
      }
    }
  */
});
