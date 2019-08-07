// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Icon, Message, Segment, Transition, Table, Button } from 'semantic-ui-react';

import ExplorerLink from '../../../Global/Modal/ExplorerLink';
import ActionsTableRow from './Table/Row';
import JurisdictionHistoryRow from './Table/JurisdictionHistoryRow';

import serializer from '../../../../../../app/shared/actions/helpers/serializeBytes';

class WalletStatusActionsTable extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      visible: [],
      leftRows: [],
      rightRows: [],
      nextSequence: -1
    };
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.jurisdictions.sequenceBlock !== nextProps.jurisdictions.sequenceBlock &&
    //     nextProps.jurisdictions.sequenceBlock === nextProps.jurisdictions.sequenceTransaction) {
    if (this.props.jurisdictions.sequenceTransaction !== nextProps.jurisdictions.sequenceTransaction) {
      this.transactionJurisdictions(
        nextProps.jurisdictions.transactionExtensions,
        nextProps.jurisdictions.sequenceTransaction
      );
      this.blockJurisdictions(
        nextProps.jurisdictions.blockJurisdictions.producer_jurisdiction_for_block,
        nextProps.jurisdictions.sequenceBlock
      );
    }

    if (this.props.jurisdictions.sequenceBlock !== nextProps.jurisdictions.sequenceBlock) {
      this.transactionJurisdictions(
        nextProps.jurisdictions.transactionExtensions,
        nextProps.jurisdictions.sequenceTransaction
      );
      this.blockJurisdictions(
        nextProps.jurisdictions.blockJurisdictions.producer_jurisdiction_for_block,
        nextProps.jurisdictions.sequenceBlock
      );
    }

    // console.log('#### will receive', nextProps, this.props);
    // const temp = serializer.deserialize(this.props.jurisdictions.transactionExtensions);
    // console.log('####', temp);
  }

  setRowVisbilitity = (action) => {
    this.setState({
      nextSequence: action
    });
    this.state.visible[action] = !this.state.visible[action];
    this.setState({
      visible: this.state.visible
    });
  }

  transactionJurisdictions = (transactionExtensions, sequence) => {
    if (!transactionExtensions) {
      return;
    }
    const arr = [];
    const jurisdictions = this.props.jurisdictions.jurisdictions;
    const codes = serializer.deserialize(transactionExtensions);

    jurisdictions.forEach((it, i) => {
      codes.forEach((jt, j) => {
        if (jurisdictions[i].code === codes[j]) {
          arr.push(jurisdictions[i]);
        }
      });
    });

    // console.log('#### leftRows', arr);

    this.state.leftRows[sequence] = arr;
    this.setState({
      leftRows: this.state.leftRows
    });
  }

  blockJurisdictions = (blockJurisdictions, sequence) => {
    if (!this.state.leftRows[sequence]) {
      return;
    }
    const arr = [];
    const jurisdictions = this.props.jurisdictions.jurisdictions;
    let codes = [];

    blockJurisdictions.forEach((it, i) => {
      codes = codes.concat(blockJurisdictions[i].new_jurisdictions);
    });

    jurisdictions.forEach((it, i) => {
      codes.forEach((jt, j) => {
        if (jurisdictions[i].code === codes[j]) {
          this.state.leftRows[sequence].forEach((kt, k) => {
            if (kt.code === codes[j]) {
              arr.push(jurisdictions[i]);
            }
            // if (this.state.leftRows[sequence][k].code === codes[j]) {
            //   arr.push(jurisdictions[i]);
            // }
          });
          // arr.push(jurisdictions[i]);
        }
      });
    });

    // arr.forEach((it, i) => {
    //   codes.forEach((jt, j) => {
    //     if (jurisdictions[i].code === codes[j]) {
    //       arr.push(jurisdictions[i]);
    //     }
    //   });
    // });

    // console.log('#### rightRows', arr);

    this.state.rightRows[sequence] = arr;
    this.setState({
      rightRows: this.state.rightRows
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
            const isClicked = this.state.visible[action.account_action_seq];
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
                {this.state.visible[action.account_action_seq] &&
                <Table.Row>
                  <Table.Cell className="jurisdiction-row" colSpan={100}>
                    <JurisdictionHistoryRow
                      leftRows={this.state.leftRows[action.account_action_seq] ? this.state.leftRows[action.account_action_seq] : []}
                      rightRows={this.state.rightRows[action.account_action_seq] ? this.state.rightRows[action.account_action_seq] : []}
                      jurisdictions={jurisdictions}
                      currentSequence={this.state.nextSequence === action.account_action_seq}
                    />
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
