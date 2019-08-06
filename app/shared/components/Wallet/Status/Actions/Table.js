// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Icon, Message, Segment, Transition, Table, Button } from 'semantic-ui-react';

import ExplorerLink from '../../../Global/Modal/ExplorerLink';
import ActionsTableRow from './Table/Row';
import JurisdictionHistoryRow from './Table/JurisdictionHistoryRow';

class WalletStatusActionsTable extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      visible: [],
      // nextAction,
    };
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.jurisdictions.producer !== nextProps.jurisdictions.producer) {
    //   this.setProducerJurisdiction(
    //     nextProps.jurisdictions.producer_jurisdictions,
    //     nextProps.jurisdictions.producer
    //   );
    // }
    console.log('#### will receive', nextProps, this.props);
  }

  setRowVisbilitity = (action) => {
    // this.setState({
    //   nextAction: action
    // });
    this.state.visible[action] = !this.state.visible[action];
    this.setState({
      visible: this.state.visible
    });
  }

  render() {
    const {
      amount,
      actionHistory,
      blockExplorers,
      chain,
      connection,
      settings,
      jurisdictions,
      actions,
      t
    } = this.props;

    // console.log('#### action!!!!', this.props, jurisdictions);

    const loading = (actionHistory.list.length < 1);
    let baseTable = <Table.Body />;
    // let jurisdictionTable = <Table.Body />;
    if (!loading) {
      // console.log('#### actionHistory', actionHistory);
      let fullResults = actionHistory.list.slice(0, amount);
      // console.log('#### fullResults', fullResults);

      const filterSpamTransfersUnder = settings.filterSpamTransfersUnder || 0.0000;

      if (filterSpamTransfersUnder !== 0.0000) {
        fullResults = fullResults.filter(action => {
          const {
            act
          } = action.action_trace;

          if (act.name !== 'transfer') {
            return true;
          }

          const {
            from,
            quantity
          } = act.data;

          if (Number(quantity.split(' ')[0]) > filterSpamTransfersUnder || from === settings.account) {
            return true;
          }

          return false;
        });
      }

      baseTable = (
        <Table.Body key="FullResults">
          {fullResults.map((action) => {
            const isClicked = this.state.visible[action];
            return (
              <React.Fragment>
                <ActionsTableRow
                  action={action}
                  blockExplorers={blockExplorers}
                  chain={chain}
                  connection={connection}
                  key={action.account_action_seq}
                  settings={settings}
                  setRowVisbilitity={this.setRowVisbilitity}
                  isClicked={isClicked}
                  actions={actions}
                />
                {/* <span>Ble</span> */}
                {/* <JurisdictionHistoryRow /> */}
                {this.state.visible[action.account_action_seq] &&
                <Table.Row>
                  <Table.Cell>
                    <JurisdictionHistoryRow />
                  </Table.Cell>
                </Table.Row>
                }
              </React.Fragment>
            );
          })}
        </Table.Body>
      );
    }
    return (
      <Segment basic loading={loading} vertical>
        <Message
          icon
          warning
        >
          <Icon name="warning sign" />
          <Message.Content>
            <Message.Header>
              {t('actions_table_warning_header')}
            </Message.Header>
            <p>
              {t('actions_table_warning_content')}
            </p>
            <Message.Header
              size="small"
            >
              <Header.Content>
                <ExplorerLink
                  blockExplorers={blockExplorers}
                  content={t('actions_table_view_explorer')}
                  linkData={settings.account}
                  linkType="account"
                  settings={settings}
                />
              </Header.Content>
            </Message.Header>
          </Message.Content>
        </Message>
        <Table
          attached
          size="small"
          striped
          style={{ borderRadius: 0 }}
          unstackable
        >
          <Table.Header>
            {/* <Table.Row>
              <Table.HeaderCell width={6}>
                {t('actions_table_header_one')}
              </Table.HeaderCell>
              <Table.HeaderCell width={2}>
                {t('actions_table_header_two')}
              </Table.HeaderCell>
              <Table.HeaderCell width={2} />
            </Table.Row> */}
            <Table.Row>
              <Table.HeaderCell width={6}>
                {t('actions_table_header_one')}
              </Table.HeaderCell>
              <Table.HeaderCell width={2}>
                {t('actions_table_header_two')}
              </Table.HeaderCell>
              <Table.HeaderCell width={2}>
                Jurisdictions
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Transition animation="slide down" duration={200}>
            {baseTable}
          </Transition>
        </Table>
      </Segment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTable);
