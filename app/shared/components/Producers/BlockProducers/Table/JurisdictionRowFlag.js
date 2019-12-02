// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Flag } from 'semantic-ui-react';
import setProperFlag from '../../../helpers/setProperFlag';

class JurisdictionRowFlag extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      flags: []
    };
  }

  setProperFlag = (producer) => {
    const name = producer.jurisdictions[0].name;
    const flag = setProperFlag(name);
    this.state.flags[producer.owner] = { class: flag, name: name };
    console.log('####', name, flag, this.state.flags);
  }

  render() {
    const {
      producer
    } = this.props;

    this.setProperFlag(producer);

    return (
      <React.Fragment>
        <Flag name={this.state.flags[producer.owner].class} /><span>{producer.jurisdictions[0].name}</span>
      </React.Fragment>
    );
  }
}

export default translate('producers')(JurisdictionRowFlag);
