// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Dropdown } from 'semantic-ui-react';

export default class JurisdictionsForm extends Component<Props> {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
  }

  state = {
    options: []
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
    if (this.dropdownRef.current) {
      const { ref } = this.dropdownRef.current;
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
      } else {
        document.getElementById('selectedItems').innerText = `Selected items: ${this.props.jurisdictions.choosenJurisdictions.length}`;
      }
    }
  }

  makeOptions(jurisdictions) {
    const options = [];
    const j = jurisdictions.jurisdictions;
    const { choosenJurisdictions } = this.props.jurisdictions;
    const indexes = [];
    if (j) {
      for (let i = 0; i < j.length; i += 1) {
        const name = `${j[i].name} (${j[i].description})`;
        options.push({
          code: j[i].code, value: name, text: name, active: choosenJurisdictions.includes(j[i].code)
        });
        if (choosenJurisdictions.includes(j[i].code)) {
          indexes.push(options.length - 1);
        }
      }
    }
    let temp = {};
    for (let n = 0; n < indexes.length; n += 1) {
      temp = Object.assign({}, options[indexes[n]]);
      options.splice(indexes[n], 1);
      options.splice(0, 0, temp);
    }
    this.setState({
      options
    });
  }

  onChange(data) {
    this.dropdownRef.current.setValue([]);
    let jurisdictions = this.props.jurisdictions.choosenJurisdictions;
    const temp = [];
    for (let i = 0; i < data.value.length; i += 1) {
      temp.push(data.options.find(o => o.value === data.value[i]).code);
    }
    for (let j = 0; j < temp.length; j += 1) {
      this.makeItemActiveOrNotActive(temp[j]);
      const index = jurisdictions.indexOf(temp[j]);
      if (jurisdictions.indexOf(temp[j]) !== -1) {
        jurisdictions.splice(index, 1);
      } else {
        jurisdictions.push(temp[j]);
      }
    }
    this.props.actions.saveChoosenJurisdictions(jurisdictions);
  }

  makeItemActiveOrNotActive(item) {
    const { options } = this.state;
    const index = options.map((e) => e.code).indexOf(item);
    const option = options[index];
    if (option.code === item) {
      if (option.active === false) {
        option.active = true;
      } else {
        option.active = false;
      }
    }
    const temp = Object.assign({}, option);
    options.splice(index, 1);
    options.splice(0, 0, temp);
    this.setState({ options });
  }

  render() {
    this.prepareDropdown();
    const { label } = this.props;

    return (
      <I18n ns="wallet">
        {
          (t) => (
            <Dropdown
              ref={this.dropdownRef}
              options={this.state.options}
              fluid
              search
              multiple
              selection
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
