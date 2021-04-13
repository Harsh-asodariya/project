import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'reactstrap';
import './campaignDetail.css';
import Dropzone from '../FormElement/Dropzone/dropzone';
import { useParams } from 'react-router';
import NavigationItems from '../Navigation/NavigationItems/navigationItems';
import { getCampaignByID } from '../Api/Api'
import BackDrop from '../Shared/Backdrop/Backdrop';
import Spinner from '../Shared/Spinner/Spinner';
import { Table } from 'reactstrap'

function CampaignDetail() {
    const { id } = useParams();
    const [campaignData, setCampaignData] = useState({
        advertiser: '',
        orderName: '',
        orderNumber: '',
        salesOrganization: '',
        sescription: '',
        landingWebsiteURL: '',
        distributionBudget: '',
        targetMarket: '',
        industryCategory: '',
        actionRequiredBy: ''
    })
    const [assets, setAssets] = useState({
        scriptFile: null,
        voiceFile: null,
        advertiserAssets: null
    })
    const [isLoading, setIsLoading] = useState(true)
    const [forceUpdate, setForceUpdate] = useState(0)

    useEffect(() => {
        setIsLoading(true)
        getCampaignByID(id)
            .then(res => {
                setIsLoading(false)
                setCampaignData({
                    advertiser: res.data.clientCompany.companyName,
                    orderName: res.data.title,
                    orderNumber: res.data.clientCampaignNumber,
                    salesOrganization: res.data.SalesOrgCompany.companyName,
                    description: res.data.title,
                    landingWebsiteURL: res.data.landingpageURL,
                    distributionBudget: res.data.distributionBudget,
                    targetMarket: res.data.targetMarket,
                    industryCategory: res.data.clientCompany.Industry.name,
                    actionRequiredBy: res.data.statusWithPerson.firstName + ' ' + res.data.statusWithPerson.lastName
                })
                let tempAdvertiserAssets, tempScriptFile, tempVoiceFile
                tempAdvertiserAssets = res.data.CampaignAssets.filter(file => file.type === 'OTHER')
                tempScriptFile = res.data.CampaignAssets.filter(file => file.type === 'SCRIPT')
                tempVoiceFile = res.data.CampaignAssets.filter(file => file.type === 'AUDIO')

                setAssets({ advertiserAssets: tempAdvertiserAssets, scriptFile: tempScriptFile, voiceFile: tempVoiceFile })

            })
            .catch(err => {
                setIsLoading(false)
                alert(err)
            })
    }, [forceUpdate])
    const onChangeHandler = () => {
        setForceUpdate(forceUpdate + 1)
    }

    return <>
        <BackDrop show={isLoading}><Spinner /></BackDrop>
        <NavigationItems />
        <div className='campaignDetailBackground'>
            <div className='container'>
                <div className='top-section column py-4'>
                    <Row>
                        <Col><h6>Advertiser</h6><p>{campaignData.advertiser}</p></Col>
                        <Col><h6>Order Name</h6><p>{campaignData.orderName}</p></Col>
                        <Col><h6>Order Number</h6><p>{campaignData.orderNumber}</p></Col>
                        <Col><h6>Sales Organization</h6><p>{campaignData.salesOrganization}</p></Col>
                    </Row>
                </div>
                <div className='middle-section column px-5 py-3'>
                    <Row>
                        <Col><h6>Status</h6><p>text</p></Col>
                        <Col><h6>Action Required By</h6><p>{campaignData.actionRequiredBy}</p></Col>
                        <Col><h6>Next Action Due By</h6><p>text</p></Col>
                        <Col><i class="fa fa-refresh" aria-hidden="true"></i></Col>
                    </Row>
                </div>
                <div className='bottom-section column px-5 py-3'>
                    <Row>
                        information
            <hr />
                    </Row>

                    <Row className='mb-3'>
                        <Col md={4}><h6>Account Manager Assigned</h6><p>text</p></Col>
                        <Col md={4}><h6>Order Name</h6><p>text</p></Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col md={4}><h6>advertiser</h6><p>text</p></Col>
                        <Col md={4}><h6>Order Name</h6><p>text</p></Col>
                    </Row>

                    <Row>
                        Prroduction Progress
            <hr />
                    </Row>
                    <Row className='m-3'>
                        <Col> Advertiser Assets Required
                </Col>
                    </Row>
                    <Row>
                        <i class="fa fa-download" style={{ color: '#01a1dd', fontWeight: 'bold' }} aria-hidden="true"> Download all assets</i>
                    </Row>
                    <Row>
                        <Col>
                            <Dropzone campaignID={id} swapDisplay={true} fileType='SCRIPT' file={assets.scriptFile} accept='.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' maxFiles={1} label='Script File' message='Drag & Drop Your SCRIPT File Here' name="scriptFile" onChange={onChangeHandler} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Dropzone campaignID={id} swapDisplay={true} fileType='AUDIO' file={assets.voiceFile} accept='audio/*' maxFiles={1} label='Voice File' message='Drag & Drop Your AUDIO File Here' name="voiceFile" onChange={onChangeHandler} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Dropzone campaignID={id} swapDisplay={false} fileType='OTHER' accept='' maxFiles={0} label='Advertiser Assets' message='Drag & Drop Your File Here' name="advertiserAssets" onChange={onChangeHandler} />
                        </Col>
                    </Row>

                    <Row>
                        <Col className='backgroundGrey my-3'>
                            Advertiser Assets
    </Col>
                    </Row>
                    <Row>
                        <Table className='responsive-table striped'>
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>File Uploaded By</th>
                                    <th>File Uploaded Date</th>
                                    <th>Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    assets.advertiserAssets !== null && assets.advertiserAssets.map(file => {
                                        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                            "July", "Aug", "Sep", "Oct", "Nov", "Dec"
                                        ];
                                        var fromDate = new Date(file.updatedAt);
                                        return <tr key={file.id}>
                                            <td md={4}>{file.assetOrignalName}</td>
                                            <td md={3}>{file.uploadedByPerson.firstName + ' ' + file.uploadedByPerson.lastName}</td>
                                            <td md={3}>{fromDate.getDate() + '-' + monthNames[fromDate.getMonth()] + '-' + fromDate.getFullYear()}</td>
                                            <td md={2}><Button onClick={() => window.open(file.assetUrl, '_blank')}>Download</Button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </Row>

                    <Row className='mt-3'>
                        Order
            <hr />
                    </Row>
                    <Row className='mb-3'>
                        <Col md={4}><h6>Description</h6><p>{campaignData.description}</p></Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col md={4}><h6>Preffered landing website url</h6><p>{campaignData.landingWebsiteURL}</p></Col>
                        <Col md={4}><h6>Distribution Budget</h6><p>{campaignData.distributionBudget}</p></Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col md={4}><h6>Target market</h6><p>{campaignData.targetMarket}</p></Col>
                        <Col md={4}><h6>Industry Category</h6><p>{campaignData.industryCategory}</p></Col>
                        <Col md={4}><h6>Order Dates</h6><p>text</p></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className='downloadAllButton' color="primary"  >
                                Download All Assets</Button>
                            <Button className='backButton'>
                                Back</Button>

                            <Button className='editButton' color='primary'>Edit</Button>
                        </Col>
                    </Row>
                </div>
            </div>

        </div>
    </>
}
export default CampaignDetail
