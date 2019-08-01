// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Modal, Label, Form, Button, Header, Segment, Grid, Divider, Icon, Image } from 'semantic-ui-react';

export default class JurisdictionsForm extends Component<Props> {
  componentDidMount() {
    const { actions, jurisdictions } = this.props;
    actions.getJurisdictions();
  }

  handleEditClick(e) {
    e.preventDefault();
  }

  render() {
    const { label } = this.props;

    return (
      <I18n ns="wallet">
        {
          (t) => (
            <div>
              <Form.Group inline>
                <label>{label}</label>
              </Form.Group>
              <Label>Hejka</Label>
              <Modal
                // centered={false}
                trigger={
                  <Button
                    floated="right"
                    size="mini"
                    onClick={(e) => this.handleEditClick(e)}
                  >
                    Edit
                  </Button>}
              >
                <Modal.Header>Select jurisdictions</Modal.Header>
                <Modal.Content scrolling>

                  <Modal.Description>
                    <Segment>
                      <Grid columns={2} stackable textAlign='center'>
                        <Divider fitted vertical />

                        <Grid.Row verticalAlign='middle'>
                          <Grid.Column>
                            xD
                          </Grid.Column>

                          <Grid.Column>
                            xDD
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button primary>
                    Close <Icon name='chevron right' />
                  </Button>
                </Modal.Actions>
              </Modal>
            </div>
          )
        }
      </I18n>
    );
  }
}
