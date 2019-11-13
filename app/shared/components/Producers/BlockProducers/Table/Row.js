// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Icon, Popup, Progress, Responsive, Table } from 'semantic-ui-react';
import { isEqual } from 'lodash';

import DangerLink from '../../../Global/Modal/DangerLink';
import ProducersVoteWeight from '../Vote/Weight';
import JurisdictionRow from './JurisdictionRow';
import JurisdictionRowFlag from './JurisdictionRowFlag';
import checkForBeos from '../../../helpers/checkCurrentBlockchain';

class ProducersTableRow extends Component<Props> {
  shouldComponentUpdate = (nextProps) =>
    !isEqual(this.props.producer.key, nextProps.producer.key)
    || !isEqual(this.props.isValidUser, nextProps.isValidUser)
    || !isEqual(this.props.isSelected, nextProps.isSelected);

  render() {
    const {
      addProducer,
      connection,
      getProducerInfo,
      hasInfo,
      isMainnet,
      isSelected,
      producer,
      position,
      isProxying,
      isValidUser,
      removeProducer,
      settings,
      t,
      totalVoteWeight,
      jurisdictions,
      actions,
      rows,
      PRODUCERS,
      ALLS
    } = this.props;

    producer.jurisdictions = [];
    const all = this.props.jurisdictions.jurisdictions;
    const allProducers = this.props.jurisdictions.all_producers_jurisdictions;
    const owner = allProducers[producer.owner];
    if (owner && (typeof owner === 'number') && all.length > 0) {
      producer.jurisdictions.push(all.find(alls => alls.code === owner));
    }
    const epoch = 946684800000;
    const lastProduced = (producer.last_produced_block_time * 500) + epoch;
    const isActive = (Date.now() - lastProduced) < 1000;
    const votePercent = (producer.percent)
      ? (producer.percent * 100).toFixed(2)
      : 0;
    const voteFormatted = (producer.votes > 0)
      ? (
        <ProducersVoteWeight
          weight={producer.votes}
        />
      )
      : 'None';
    const shouldDisplayInfoButton = connection.supportedContracts && connection.supportedContracts.includes('producerinfo');
    const producersVotedIn = connection.chainId !== '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f';

    return (
      <Table.Row positive={isActive} key={producer.key}>
        <Table.Cell
          singleLine
          textAlign="center"
        >
          {(shouldDisplayInfoButton) && (
            <span>
              {(hasInfo)
                ? (
                  <Button
                    color="purple"
                    icon="magnify"
                    onClick={() => getProducerInfo(producer.owner)}
                    size="small"
                  />
                ) : (!(checkForBeos(connection)) &&
                  <Popup
                    content={t('producer_json_unavailable_content')}
                    header={t('producer_json_unavailable_header')}
                    hoverable
                    inverted
                    position="left center"
                    trigger={
                      (isMainnet)
                      ? <Button icon="magnify" size="small" />
                      : false
                    }
                  />
                ) ||
                ((checkForBeos(connection)) &&
                  <Popup
                    content={t('producer_json_unavailable_content_beos')}
                    header={t('producer_json_unavailable_header')}
                    hoverable
                    inverted
                    position="left center"
                    trigger={
                      (isMainnet)
                      ? <Button icon="magnify" size="small" />
                      : false
                    }
                  />
                )
              }
            </span>
          )}
          {(producersVotedIn) && (
            <Popup
              content={t('producer_vote_description', { chainSymbol: connection.chainSymbol })}
              header={t('producer_vote_header', { producer: producer.owner })}
              hoverable
              position="right center"
              trigger={(
                <Button
                  color={isSelected ? 'blue' : 'grey'}
                  disabled={!isValidUser}
                  icon={isSelected ? 'checkmark box' : 'minus square outline'}
                  onClick={
                    (isSelected)
                    ? () => removeProducer(producer.owner)
                    : () => addProducer(producer.owner)
                  }
                  size="small"
                />
              )}
            />
            )}
        </Table.Cell>
        <Table.Cell
          singleLine
        >
          <b>{ position }</b>
        </Table.Cell>
        <Table.Cell
          singleLine
        >
          <Header size="small">
            <span styles={{ fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace' }}>
              {producer.owner}
            </span>
            <Header.Subheader>
              <DangerLink
                content={producer.url.substring(0, 30).replace(/(^\w+:|^)\/\//, '')}
                link={producer.url}
                settings={settings}
              />
            </Header.Subheader>
          </Header>
        </Table.Cell>
        <Table.Cell>
          {(producer.jurisdictions.length > 0) && (checkForBeos(connection)) && (
            <Popup
              hoverable
              position="left center"
              mouseEnterDelay={1000}
              content={
                <JurisdictionRow
                  rows={rows}
                  jurisdictions={jurisdictions}
                  producer={producer.owner}
                  PRODUCERS={PRODUCERS}
                  ALLS={ALLS}
                  t={t}
                />
              }
              trigger={(
                <a
                  onMouseEnter={() => { actions.getProducerJurisdiction(producer.owner); }}
                  style={{ cursor: 'pointer' }}
                >
                  <JurisdictionRowFlag
                    producer={producer}
                  />
                </a>
              )}
            />
          )}
          {(producer.jurisdictions.length === 0) && (checkForBeos(connection)) && (
            <span>{t('block_producer_jurisdictions_state_none')}</span>
          )}
        </Table.Cell>
        <Table.Cell
          singleLine
        >
          {(producersVotedIn) && (
            <Progress
              color="teal"
              label={(
                <div className="label">
                  {votePercent}%
                  <Responsive as="span" minWidth={800}>
                    - {voteFormatted}
                  </Responsive>
                </div>
              )}
              percent={parseFloat(votePercent * 100) / 100}
              size="tiny"
              style={{ minWidth: 0 }}
            />
          )}
        </Table.Cell>
        <Table.Cell
          singleLine
        >
          {(position < 22)
          ? (
            <Popup
              content={t('active_producer')}
              inverted
              position="left center"
              trigger={(
                <Icon
                  color="green"
                  name="cubes"
                />
              )}
            />
            ) : false
          }
          {(producer.isBackup && position > 21)
          ? (
            <Popup
              content={t('backup_producer')}
              inverted
              position="left center"
              trigger={(
                <Icon
                  color="yellow"
                  name="cube"
                />
              )}
            />
            ) : ''
          }

        </Table.Cell>
      </Table.Row>
    );
  }
}

export default translate('producers')(ProducersTableRow);
