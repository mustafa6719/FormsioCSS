// Define the custom component class
class CustomSelectBoxesComponent extends Formio.Components.components.base {
  // Build the custom component
  build() {
    this.createElement();
    this.createLabel(this.element);
    this.createInput(this.element);
    this.createDescription(this.element);
    this.createTooltip(this.element);
    this.attachLogic();
  }

  // Create the checkbox inputs
  createInput(container) {
    const values = this.component.data.values;
    this.refs.input = [];
    values.forEach((value) => {
      const input = this.ce('input', {
        type: 'checkbox',
        value: value.value,
        id: `${this.component.key}-${value.value}`,
        checked: this.dataValue.includes(value.value),
        name: this.component.key
      });
      this.addEventListener(input, 'change', (event) => {
        this.updateValue(event);
      });
      const label = this.ce('label', { for: `${this.component.key}-${value.value}` });
      label.appendChild(this.text(value.label));
      const wrapper = this.ce('div', { class: 'checkbox' });
      wrapper.appendChild(input);
      wrapper.appendChild(label);
      container.appendChild(wrapper);
      this.refs.input.push(input);
    });
  }

  // Update the component value based on checkbox state
  updateValue(event) {
    const value = event.target.value;
    const checked = event.target.checked;
    let newValue = this.dataValue.slice();
    if (checked && !newValue.includes(value)) {
      newValue.push(value);
    } else if (!checked && newValue.includes(value)) {
      newValue = newValue.filter(v => v !== value);
    }
    this.setValue(newValue);
  }

  // Get the component value
  getValue() {
    return this.dataValue;
  }

  // Set the component value and update checkboxes
  setValue(value, flags) {
    this.dataValue = value;
    this.refs.input.forEach(input => {
      input.checked = value.includes(input.value);
    });
    this.updateValue(flags);
  }
}

// Register the custom component with Form.io
Formio.Components.addComponent('customSelectBoxes', CustomSelectBoxesComponent);
