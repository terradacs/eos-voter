// @flow
import React, { Component } from 'react';
import { Table, Grid, Segment, Label } from 'semantic-ui-react';

export default class JurisdictionHistoryRow extends Component<Props> {

  render() {
    const {
      // codesLabel,
      // jurisdictionLabel,
      // descriptionLabel,
      leftRows,
      rightRows,
      jurisdictions,
      currentSequence
    } = this.props;

    const fake = [
      {
        code: 0,
        name: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        description: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
      }
    ];

    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column className="history-scroll">
            {/* <label>Chosen jurisdictions</label> */}
            {/* <Segment> */}
            {leftRows.length > 0 && (currentSequence ? jurisdictions.ALL_FOR_TRANSACTION === 'SUCCESS' : true) && leftRows.map((row, idx) => (
              // <Label>{`${row.code} ${row.name} (${row.description})`}</Label>
              <p>{`${row.name} (${row.description})`}</p>
            ))}
            {leftRows.length === 0 && (currentSequence ? jurisdictions.ALL_FOR_TRANSACTION === 'SUCCESS' : true) &&
              // <Label>{`${row.code} ${row.name} (${row.description})`}</Label>
              <p>No jurisdictions.</p>
            }
            {(currentSequence ? jurisdictions.ALL_FOR_TRANSACTION === 'PENDING' : false) &&
              // <Label>{`${row.code} ${row.name} (${row.description})`}</Label>
              <p>Loading...</p>
            }
            {currentSequence ? jurisdictions.ALL_FOR_TRANSACTION === 'FAILURE' : false &&
              // <Label>{`${row.code} ${row.name} (${row.description})`}</Label>
              <p>Error fetching data.</p>
            }
            {/* </Segment> */}
          </Grid.Column>
          <Grid.Column className="history-scroll">
            {/* <label>Block jurisdictions</label> */}
            {/* <Segment> */}
            {rightRows.length > 0 && (currentSequence ? jurisdictions.ALL_FOR_BLOCK === 'SUCCESS' : true) && rightRows.map((row, idx) => (
              // <Label>{`${row.code} ${row.name} (${row.description})`}</Label>
              <p>{`${row.name} (${row.description})`}</p>
            ))}
            {rightRows.length === 0 && (currentSequence ? jurisdictions.ALL_FOR_BLOCK === 'SUCCESS' : true) &&
              // <Label>{`${row.code} ${row.name} (${row.description})`}</Label>
              <p>No jurisdictions.</p>
            }
            {(currentSequence ? jurisdictions.ALL_FOR_BLOCK === 'PENDING' : false) &&
              // <Label>{`${row.code} ${row.name} (${row.description})`}</Label>
              <p>Loading...</p>
            }
            {currentSequence ? jurisdictions.ALL_FOR_BLOCK === 'FAILURE' : false &&
              // <Label>{`${row.code} ${row.name} (${row.description})`}</Label>
              <p>Error fetching data.</p>
            }
            {/* </Segment> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
