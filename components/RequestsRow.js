import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';


class RequestsRow extends Component {
    onApprove = async () => { //call approverequest 
        const campaign = Campaign(this.props.address);

        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        }); 

    };

    onFinalize = async () => {//call finalizeRequest and send money 
        const campaign = Campaign(this.props.address);

        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        }); 
    }


    render() {
        const { Row, Cell } = Table;//row cell來自table
        const { id, request, approversCount } = this.props; 
        const readyToFinalize = request.approvalCount > approversCount / 2;
        //console.log(this.props)
        // console.log(request.complete)
        return (
            <Row disabled={request.complete} 
                positive={readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                <Cell>
                    {request.complete ? null : (
                    <Button color="green" basic onClick={this.onApprove}>Approve</Button>
                    )}
                    </Cell>
                <Cell>
                    {request.complete ? null : (
                    <Button color="teal" basic onClick={this.onFinalize}> Finalize</Button>
                    )}
                </Cell>

            </Row>
        );
    }
}

export default RequestsRow;