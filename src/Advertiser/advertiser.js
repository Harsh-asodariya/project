import React from 'react';
import NavigationItems from '../Navigation/NavigationItems/navigationItems';
import CampaignDetail from '../CampaignDetail/campaignDetail';

const advertiser = () => {
    return(
        <React.Fragment>
        <NavigationItems/>
        <CampaignDetail/>
        </React.Fragment>
    )
}

export default advertiser;