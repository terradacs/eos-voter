// @flow
import React, { Component } from 'react';
import { Table, Grid, Segment } from 'semantic-ui-react';

export default class JurisdictionHistoryRow extends Component<Props> {

  render() {
    const {
      // codesLabel,
      // jurisdictionLabel,
      // descriptionLabel,
      jurisdictions,
    } = this.props;

    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            {/* <label>Chosen jurisdictions</label> */}
            <Segment>
              <p>616 poland Republic of Poland</p>
              <p>666 germany Federal Republic of Germany</p>
              <p>324 Albania Republic of Albania</p>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            {/* <label>Block jurisdictions</label> */}
            <Segment>
              <p>616 poland Republic of Poland</p>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}


// return (
    //   <div className="ui segment">
    //     <div className="ui two column very relaxed grid">
    //       <div className="column">
    //         <h4>Pushed</h4>
    //         <p>616 poland Republic of Poland</p>
    //         <p>666 germany Federal Republic of Germany</p>
    //         <p>324 Albania Republic of Albania</p>
    //       </div>
    //       <div className="column">
    //         <h4>Producers</h4>
    //         <p>616 poland Republic of Poland</p>
    //       </div>
    //     </div>
    //     <div className="ui vertical divider" />
    //   </div>
    // );

    // return (
    //   <div>
    //     <Table
    //       className="ui unstackable jurisdiction-table"
    //     >
    //       <Table.Header className="fullWidth">
    //         <Table.Row>
    //           <Table.HeaderCell>
    //             Chosen jurisdictions
    //           </Table.HeaderCell>
    //           <Table.HeaderCell >
    //             Passed
    //           </Table.HeaderCell>
    //         </Table.Row>
    //       </Table.Header>
    //       <Table.Body>
    //         <Table.Row>
    //           <Table.Cell>
    //             616 poland Republic of Poland
    //             <br />
    //             276 germany Federal Republic of Germany
    //           </Table.Cell>
    //           <Table.Cell className="fullWidth">
    //             616 poland Republic of Poland
    //           </Table.Cell>
    //         </Table.Row>
    //       </Table.Body>
    //     </Table>
    //   </div>
    // );

    // return (
    //   <div className="table-scroll">
    //     {this.props.rows[this.props.producer] && this.props.rows[this.props.producer].length > 0 && (this.props.producer ? jurisdictions.PRODUCER === 'SUCCESS' : true) &&
    //       <Table
    //         className="ui striped unstackable small jurisdiction-table"
    //       >
    //         <Table.Header className="fullWidth">
    //           <Table.Row className="active">
    //             <Table.HeaderCell>
    //               {codesLabel}
    //             </Table.HeaderCell>
    //             <Table.HeaderCell>
    //               {jurisdictionLabel}
    //             </Table.HeaderCell>
    //             <Table.HeaderCell>
    //               {descriptionLabel}
    //             </Table.HeaderCell>
    //           </Table.Row>
    //         </Table.Header>
    //         <Table.Body>
    //           {this.props.rows[this.props.producer].map((row, idx) => (
    //             <Table.Row key={idx}>
    //               <Table.Cell singleLine>
    //                 {row.code}
    //               </Table.Cell>
    //               <Table.Cell singleLine>
    //                 <span className="jurisdiction-wrapper-name">
    //                   {row.name}
    //                 </span>
    //               </Table.Cell>
    //               <Table.Cell singleLine>
    //                 <span className="jurisdiction-wrapper-description">
    //                   {row.description}
    //                 </span>
    //               </Table.Cell>
    //             </Table.Row>
    //           ))}
    //         </Table.Body>
    //       </Table>
    //     }
    //     {(!this.props.rows[this.props.producer] || this.props.rows[this.props.producer].length === 0) && jurisdictions.PRODUCER === 'PENDING' &&
    //       <span>Loading...</span>
    //     }
    //     {(jurisdictions.PRODUCER === 'FAILURE' || jurisdictions.ALL === "FAILURE") &&
    //       <span>Error fetching jurisdictions.</span>
    //     }
    //     {(!this.props.rows[this.props.producer] || this.props.rows[this.props.producer].length === 0) && (this.props.producer ? jurisdictions.PRODUCER === 'SUCCESS' : true) &&
    //       <span>No jurisdictions.</span>
    //     }
    //   </div>
    // );
