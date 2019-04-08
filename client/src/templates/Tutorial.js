export const BasicTutorial = [
  {title: "Create Model", selector: ".Editor-top-open :nth-child(1)", text: "Create a new model"},
  {title: "Open Model", selector: ".Editor-top-open :nth-child(2)", text: "Open a model by selecting Open Model"},
  {title: "Download Model", selector: ".Editor-top-open :nth-child(3)", text: "Download model by selecting Download"},
  {title: "Save Model", selector: ".Editor-top-open :nth-child(4)", text: "Save model by selecting Save Model"},
  {title: "Edit Node", selector: "#node_Initial", text: "To edit a node you can click on it in the graph"},
  {title: "Module Remarks", selector: ".ModuleProperties-remarks", text: "This is a place to put any remarks or citations for this model."}, 
  {title: "Adding a State", selector: ".navbar-nav :nth-child(5)", text: "This will add a new state to the model, it can then be edited like any other state."},
  {title: "Adding a Structure", selector: ".navbar-nav :nth-child(6)", text: "We have a few commonly used structures, this will allow you to add them to your model. This feature is not yet available."},
]

export const EditTutorial = [
  {title: "Change State Name", selector: ".State h3", text: "This text is editable, you can change the name of this state here."},
  {title: "Change State Type", selector: ".State :nth-child(2)", text: "You can change the type of this state here, you can find a listing of state types at <a href='https://github.com/synthetichealth/synthea/wiki/Generic-Module-Framework%3A-States' target='_blank'> the wiki </a>."},
  {title: "State Editor", selector: ".State-Editor", text: "Here is a context aware editor, depending on what your state has it will list the various attributes."},
  {title: "Delete State", selector: "div.State > a.delete-button", text: "This will remove the currently selected state from the editor."},
  {title: "Transition Type", selector: ".Transition-Type", text: "You can change the type of the transition the model has here, <a href='https://github.com/synthetichealth/synthea/wiki/Generic-Module-Framework%3A-Transitions' target='_blank'> here </a> is a list of transition types."},


]
