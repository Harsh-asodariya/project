import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import './campaignDetail.css';
import Dropzone from '../FormElement/Dropzone/dropzone';

function campaignDetail() {
    return (
        <div className='campaignDetailBackground'>
            <div className='container'>
                <div className='top-section column py-4'>
                    <Row>
                        <Col><h6>Advertiser</h6><p>text</p></Col>
                        <Col><h6>Order Name</h6><p>text</p></Col>
                        <Col><h6>Order Number</h6><p>text</p></Col>
                        <Col><h6>Sales Organization</h6><p>text</p></Col>
                    </Row>
                </div>
                <div className='middle-section column px-5 py-3'>
                    <Row>
                        <Col><h6>Status</h6><p>text</p></Col>
                        <Col><h6>Action Required By</h6><p>text</p></Col>
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
                            <Dropzone accept='.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' maxFiles={1} label='Script File' message='Drag & Drop Your SCRIPT File Here' name="scriptFile" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Dropzone accept='audio/*' maxFiles={1} label='Voice File' message='Drag & Drop Your AUDIO File Here' name="voiceFile" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Dropzone accept='' maxFiles={0} label='Advertiser Assets' message='Drag & Drop Your File Here' name="advertiserAssets" />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        Advertiser Assets List
                        <hr />
                    </Row>
                    <Row>
                        <Col><h6>File Name</h6><p>text</p></Col>
                        <Col><h6>File Upload By</h6><p>text</p></Col>
                        <Col><h6>File Uploaded Date</h6><p>text</p></Col>
                        <Col><h6>Download</h6><p>text</p></Col>
                    </Row>
                    <Row className='mt-3'>
                        Order
                    <hr />
                    </Row>
                    <Row className='mb-3'>
                        <Col md={4}><h6>Description</h6><p>text</p></Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col md={4}><h6>Preffered landing website url</h6><p>text</p></Col>
                        <Col md={4}><h6>Distribution Budget</h6><p>text</p></Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col md={4}><h6>Target market</h6><p>text</p></Col>
                        <Col md={4}><h6>Industry Category</h6><p>text</p></Col>
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
    )
}

export default campaignDetail
