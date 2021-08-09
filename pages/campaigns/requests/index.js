import React, { Component } from 'react';
import { Button, Tab, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequstsRow from '../../../components/RequestsRow';


class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestsCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(requestsCount)
            .fill()
            .map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        );

        console.log(requests);

        return { address, requests, requestsCount, approversCount  };
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            console.log(request)
            return <RequstsRow 
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
            />
        })
        
    }


    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        
        return (
            <Layout>
                <h3>Request</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                       <Button primary>Add Requests
                        </Button> 
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amout</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approval</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>Found {this.props.requestsCount} requests</div>
            </Layout>
        ); 
    }
}

export default RequestIndex;