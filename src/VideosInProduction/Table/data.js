import {getAllCampaign} from '../../Api/Api';

export const tableData = () => {
    getAllCampaign()
        .then(res => console.log(res))
        .catch(err => console.log(err))

    
}