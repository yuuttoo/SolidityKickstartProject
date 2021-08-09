import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout'; 
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';


class CampaignNew extends Component {
    state = {
        minumumContribution: '',
        errorMessage: '',
        loading: false
        
    };


    onSubmit = async (event) => {
        event.preventDefault(); //避免自動發出

        this.setState({ loading: true, errorMessage: " " });

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minumumContribution)
                .send({
                    from: accounts[0]
                });
            //navigate to root page
            Router.pushRoute('/');
        } catch (error) {
            if (error.code === 4001) {
                // EIP-1193 userRejectedRequest error
                //console.log('Permissions needed to continue.');
                this.setState({  errorMessage:  error.message});
              } else {
                console.error(error);
              }
        }

        this.setState({ loading: false });
    };

    render() {
         return (
            <Layout>
                <h3>Create a Campaign</h3>
                <Form  onSubmit={this.onSubmit } error={!!this.state.errorMessage}>
                <Form.Field >
                    <label>Minimum Contribution</label>
                    <Input 
                    label="wei" 
                    labelPosition="right"
                    value={this.state.minumumContribution}
                    onChange={event => 
                        this.setState({ minumumContribution: event.target.value })}
                    />
                </Form.Field>
               {/* <h1>{this.state.errorMessage}</h1> */}
                <Message  error header="Oops!" content={this.state.errorMessage}  />
                <Button loading={this.state.loading} primary>Create!</Button>
                </Form>

            </Layout>
            
         )
    }
}

export default CampaignNew;