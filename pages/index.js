import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';

class CampaignIndex extends Component {
    static async getInitialProps() { //for nextjs to call 
        const campaigns = await factory.methods.getDeployedCampaigns().call()
        
        return { campaigns };
}

//  async componentDidMount() {

//      console.log(campaigns);
//     }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
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
               
                <Button floated="right" content='Create Campaign' icon='add circle'  primary={true}/>
                    
                {this.renderCampaigns()}                    
                    </div>
            </Layout>
        );
    }
}

export default CampaignIndex;

