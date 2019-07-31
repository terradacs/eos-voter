// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Dropdown } from 'semantic-ui-react';

export default class JurisdictionsForm extends Component<Props> {
  state = {
    options: [],
    searchedOptions: []
  }

  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
  }

  componentDidMount() {
    const { actions, jurisdictions } = this.props;
    const interval = setInterval(() => {
      if (this.dropdownRef.current !== null) {
        this.prepareDropdown();
        clearInterval(interval);
      }
    });
    actions.getJurisdictions();
    this.makeOptions(jurisdictions);
  }

  prepareDropdown() {
    const ref = this.dropdownRef.current.ref;
    const child = ref.children;
    for (let i = 0; i < child.length; i += 1) {
      if (child[i].tagName === 'A') {
        ref.removeChild(child[i]);
        i -= 1;
      }
    }
    if (document.getElementById('selectedItems') === null) {
      const div = document.createElement('div');
      div.id = 'selectedItems';
      div.innerText = `Selected items: ${this.props.jurisdictions.choosenJurisdictions.length}`;
      ref.insertBefore(div, ref.firstChild);
    }
  }

  makeOptions(jurisdictions) {
    const options = [];
    const j = jurisdictions.jurisdictions;
    if (j) {
      for (let i = 0; i < j.length; i += 1) {
        const name = `${j[i].name} (${j[i].description})`;
        options.push({ code: j[i].code, value: name, text: name });
      }
    }
    this.setState({
      options
    });
  }

  changeValue() {
    const newValue = [];
    const oldValue = this.props.jurisdictions.choosenJurisdictions;
    for (let i = 0; i < oldValue.length; i += 1) {
      newValue.push(oldValue[i].value);
    }
    return newValue;
  }

  onChange(data) {
    const jurisdictions = [];
    for (let i = 0; i < data.value.length; i += 1) {
      jurisdictions.push(data.options.find(o => o.value === data.value[i]));
    }
    this.props.actions.saveChoosenJurisdictions(jurisdictions);
  }

  render() {
    const newValue = this.changeValue();
    const { label } = this.props;

    return (
      <I18n ns="wallet">
        {
          (t) => (
            <Dropdown
              ref={this.dropdownRef}
              options={this.state.options}
              placeholder="Select Jurisdiction"
              fluid
              search
              multiple
              selection
              value={newValue}
              scrolling
              onChange={(e, value) => this.onChange(value)}
              label={label}
            />
          )
        }
      </I18n>
    );
  }
}
