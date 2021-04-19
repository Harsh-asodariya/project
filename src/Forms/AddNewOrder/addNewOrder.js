import React, { useState, useEffect } from 'react';
import FloatingInput from '../../FormElement/FloatingInput/floatingInput';
import SelectField from '../../FormElement/Select/select';
import './addNewOrder.css'
import { Col, Row } from 'reactstrap';
import { Button } from 'reactstrap';
import { validationHandler } from '../../Shared/Validation/validation';
import { connect } from 'react-redux';
import { createCampaign, getMarkets, getClients } from '../../Api/Api';
import BackDrop from '../../Shared/Backdrop/Backdrop';
import Spinner from '../../Shared/Spinner/Spinner';
import * as actions from '../../Store/Actions/formResponse';

function AddNewOrder({ next, previous, orderData, setOrderData, client, setOrderResponseData, props }) {

    const [isLoading, setIsLoading] = useState()

    const data = { ...orderData.data }
    const [marketOption, setMarketOption] = useState()
    const [advertiserOption, setAdvertiserOption] = useState()

    useEffect(() => {

        getMarkets()
            .then(res => {
                let markets = res.data
                setMarketOption(markets.map(market => {
                    return { value: market.name, label: market.name }
                })
                )
            })
            .catch(err => alert(err.message))


        getClients()
            .then(res => {
                let advertisers = res.data
                setAdvertiserOption(advertisers.map(advertiser => {
                    if (client.salesOrgCompany.companyName === advertiser.companyName) {
                        let tempdata = { ...data, 'advertiser': { value: { value: advertiser.id, label: advertiser.companyName }, touched: true, valid: true } }
                        setOrderData({ ...orderData, data: tempdata })
                    }
                    return { value: advertiser.id, label: advertiser.companyName }
                })
                )
            })
            .catch(err => alert(err.message))

    }, [])


    const submitButtonHandler = (tempdata) => {
        let valid = true
        for (let field in tempdata) {
            valid = valid && tempdata[field].valid
        }
        return valid;
    }

    const onChangeHandler = (event, name) => {
        let isValid, tempdata, validated
        if (name) {
            isValid = validationHandler(name, event.value)
            tempdata = { ...data, [name]: { value: event, touched: true, valid: isValid } }
            validated = submitButtonHandler(tempdata)
        } else {
            isValid = validationHandler(event.target.name, event.target.value)
            tempdata = { ...data, [event.target.name]: { value: event.target.value, touched: true, valid: isValid } }
            validated = submitButtonHandler(tempdata)
        }
        setOrderData({ ...orderData, data: tempdata, validated: validated })
    }

    const createOrder = () => {
        let campaignData = {
            "clientCompanyID": data.advertiser.value.value,
            "title": data.title.value,
            "description": data.description.value,
            "landingpageURL": data.prefferedLandingPageUrl.value,
            "targetMarket": data.targetMarket.value.value,
            "distributionBudget": data.budget.value,
            "startDate": new Date(),
            "price": data.price.value,
            "soaID": client.salesOrgCompany.soaID,
            "sosID": client.salesOrgCompany.sosID,
            "salesOrgCompanyID": client.salesOrgCompany.parentSalesOrgCompanyID,
            "statusByPersonID": client.person.createdByPerson,
            "statusWithPersonID": client.salesOrgCompany.clientPersonID
        }
        setIsLoading(true)
        createCampaign(campaignData)
            .then(res => {
                setIsLoading(false)
                setOrderResponseData(res)
                next()
            })
            .catch(err => {
                setIsLoading(false)
                alert(err)
            })

    }

    return (
        <>
            <BackDrop show={isLoading}><Spinner /></BackDrop>
            <div className='addNewOrderBackground'>
                <div className='addNewOrder'>
                    <Row>
                        <Col className='backgroundGrey m-3'>
                            Order
                    </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <SelectField disabled={true} name="advertiser" onChange={onChangeHandler} value={data.advertiser.value} id='advertiser' options={advertiserOption} label='Advertiser' />
                        </Col>
                        <Col md={6}>
                            <FloatingInput errrMessage='Please Enter Valid Title' error={data.title.touched && !data.title.valid} name="title" onChange={onChangeHandler} value={data.title.value} type='name' label='Title' placeholder='Title' id="title" for="floatingInput" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FloatingInput errrMessage='Please Enter Valid Preffered Landing URL' error={data.prefferedLandingPageUrl.touched && !data.prefferedLandingPageUrl.valid} name="prefferedLandingPageUrl" onChange={onChangeHandler} value={data.prefferedLandingPageUrl.value} type='name' label='Preffered Landing Page URL' placeholder='Preffered Landing Page URL' id="prefferedLandingPageURL" for="floatingInput" />
                        </Col>
                        <Col md={6}>
                            <FloatingInput errrMessage='Please Enter Valid Price' error={data.price.touched && !data.price.valid} name="price" onChange={onChangeHandler} value={data.price.value} type="number" label='Price' placeholder='Price' id="price" for="floatingInput" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FloatingInput errrMessage='Please Enter Valid Description' error={data.description.touched && !data.description.valid } name="description" id='description' label="description" value={data.description.value} type='textarea' placeholder='Description' onChange={onChangeHandler} />

                        </Col>
                    </Row>
                    <Row>
                        <Col className='backgroundGrey m-3'>
                            Distribution
                    </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <SelectField name="targetMarket" onChange={onChangeHandler} value={data.targetMarket.value} id='targetMarket' options={marketOption} label='Target Market' />
                        </Col>
                        <Col md={6}>
                            <FloatingInput errrMessage='Please Enter Valid Budget' error={data.budget.touched && !data.budget.valid } name="budget" onChange={onChangeHandler} value={data.budget.value} type='number' label='Budget' placeholder='Budget' id="budget" for="floatingInput" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button disabled={!orderData.validated} className='addOrderButton' color="primary" onClick={createOrder} >
                                Create Order<i className='fa fa-angle-double-right pl-1' aria-hidden="true"></i></Button>
                            <Button disabled={true} onClick={() => props.history.push('/dashboard')} className='addOrderCancelButton'>Cancel</Button>
                            <Button disabled={true} className='addOrderBackButton' color="primary" onClick={previous}>
                                <i className='fa fa-angle-double-left pr-1' aria-hidden="true"></i>Back</Button>
                        </Col>
                    </Row>

                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        client: state.response.client,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setOrderResponseData: (data) => dispatch(actions.setOrderFormResponse(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewOrder)
