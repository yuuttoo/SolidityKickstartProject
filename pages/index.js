import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';
import { Link } from '../routes';

class CampaignIndex extends Component {
    static async getInitialProps() { //for nextjs to call 
        const campaigns = await factory.methods.getDeployedCampaigns().call()
        //console.log(campaigns)
        return { campaigns };
}

//  async componentDidMount() {

//      console.log(campaigns);
//     }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                <Link route={`/campaigns/${address}`}>
                    <a>View Campaign</a>
                </Link>
                ),
                fluid: true //不影響旁邊的元件
            };
        });
        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                    <div>       
                <h3>Open Campaigns</h3>    

                <Link route="/campaigns/new">
                <a>  
                <Button floated="right" content='Create Campaign' icon='add circle'  primary={true}/>
                </a>
                </Link>

                {this.renderCampaigns()}                    
                    </div>
            </Layout>
        );
    }
}

export default CampaignIndex;

