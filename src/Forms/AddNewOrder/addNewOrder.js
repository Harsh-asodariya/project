import React, { useState, useEffect } from 'react';
import FloatingInput from '../../FormElement/FloatingInput/floatingInput';
import SelectField from '../../FormElement/Select/select';
import './addNewOrder.css'
import { Col, Row } from 'reactstrap';
import Textarea from '../../FormElement/Textarea/textarea';
import { Button } from 'reactstrap';
import { validationHandler } from '../../Shared/Validation/validation';
import axios from 'axios'
import { connect } from 'react-redux';
import { createCampaign, getMarkets, getClients } from '../../Api/Api';
import BackDrop from '../../Shared/Backdrop/Backdrop';
import Spinner from '../../Shared/Spinner/Spinner';

function AddNewOrder({ next, previous, orderData, setOrderData, client }) {

    const [isLoading, setIsLoading] = useState()

    const data = { ...orderData.data }
    const [marketOption, setMarketOption] = useState()
    const [advertiserOption, setAdvertiserOption] = useState()

    useEffect(() => {
        // const headers = {
        //     // 'Content-Type': 'application/json',
        //     'x-token': localStorage.getItem('token')
        // }
        getMarkets()
            .then(res => {
                let markets = res.data
                setMarketOption(markets.map(market => {
                    return { value: market.name, label: market.name }
                })
                )
            })
            .catch(err => alert(err.message))
        // axios.get('http://localhost:3000/api/wholesalepricing/getMarkets',{headers:headers})
        //     .then(res => {
        //         let markets = res.data.data
        //         setMarketOption(markets.map(market => {
        //             return { value: market.name, label: market.name }
        //         })

        //         )
        //     })
        //     .catch(res => console.log(res))

        getClients()
            .then(res => {
                let advertisers = res.data
                setAdvertiserOption(advertisers.map(advertiser => {
                    return { value: advertiser.id, label: advertiser.companyName }
                })
                )
            })
            .catch(err => alert(err.message))
        // axios.get('http://localhost:3000/api/company/clients', { headers: headers })
        //     .then(res => {
        //         let advertisers = res.data.data
        //         setAdvertiserOption(advertisers.map(advertiser => {
        //             return { value: advertiser.id, label: advertiser.companyName }
        //         })
        //         )
        //     })
        //     .catch(res => console.log(res))
    }, [])


    // useEffect(() => {
    //     let valid = true
    //     for (let field in validation) {
    //         valid = valid && validation[field].valid
    //     }
    //     setOrderData({ ...orderData, validated: valid })
    // },[validation])

    const submitButtonHandler = (tempdata) => {
        let valid = true
        for (let field in tempdata) {
            valid = valid && tempdata[field].valid
        }
        console.log(valid)
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
        // let campaignData = {
        //     "clientCompanyID": data.advertiser.value.value,
        //     "title": data.title.value,
        //     "description": data.description.value,
        //     "landingpageURL": data.prefferedLandingPageUrl.value,
        //     "targetMarket": data.targetMarket.value.value,
        //     "distributionBudget": data.budget.value,
        //     "startDate": "04/22/2021",
        //     "price": data.price.value,
        //     "soaID": client.salesOrgCompany.soaID,
        //     "sosID": client.salesOrgCompany.sosID,
        //     "salesOrgCompanyID": client.salesOrgCompany.parentSalesOrgCompanyID,
        //     "statusByPersonID": client.person.createdByPerson,
        //     "statusWithPersonID": client.salesOrgCompany.clientPersonID
        // }
        // setIsLoading(true)
        // createCampaign(campaignData)
        //     .then(res => {
            // setIsLoading(false)
        //         setClientResponseData(res.data.data)
        //         console.log(res.data)
        //         next()
        //     })
        //     .catch(err => {
        // setIsLoading(false)    
        // alert(err)})

        // console.log(campaignData)
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'x-token': localStorage.getItem('token')
        // }
        // axios.post('http://localhost:3000/api/campaign/',campaignData,{headers:headers})
        //     .then(res => {
        //         // setClientResponseData(res.data.data)
        //         console.log(res.data)
        //         next()
        //     })
        //     .catch(error => console.log(error.response.data.errorMessage))
        next()
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
                            <SelectField name="advertiser" onChange={onChangeHandler} value={data.advertiser.value} id='advertiser' options={advertiserOption} label='Advertiser' />
                            {/* <FloatingInput error={data.advertiser.touched && !data.advertiser.valid ? 'inValid' : ''} name="advertiser" onChange={onChangeHandler} value={data.advertiser.value} type='name' label='Advertiser' placeholder='Advertiser' id="advertiser" for="floatingInput" /> */}
                        </Col>
                        <Col md={6}>
                            <FloatingInput error={data.title.touched && !data.title.valid ? 'inValid' : ''} name="title" onChange={onChangeHandler} value={data.title.value} type='name' label='Title' placeholder='Title' id="title" for="floatingInput" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FloatingInput error={data.prefferedLandingPageUrl.touched && !data.prefferedLandingPageUrl.valid ? 'inValid' : ''} name="prefferedLandingPageUrl" onChange={onChangeHandler} value={data.prefferedLandingPageUrl.value} type='name' label='Preffered Landing Page URL' placeholder='Preffered Landing Page URL' id="prefferedLandingPageURL" for="floatingInput" />
                        </Col>
                        <Col md={6}>
                            <FloatingInput error={data.price.touched && !data.price.valid ? 'inValid' : ''} name="price" onChange={onChangeHandler} value={data.price.value} type="number" label='Price' placeholder='Price' id="price" for="floatingInput" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Textarea error={data.description.touched && !data.description.valid ? 'inValid' : ''} name="description" id='description' label="description" value={data.description.value} type='text' placeholder='Description' changed={onChangeHandler} />

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
                            <FloatingInput error={data.budget.touched && !data.budget.valid ? 'inValid' : ''} name="budget" onChange={onChangeHandler} value={data.budget.value} type='number' label='Budget' placeholder='Budget' id="budget" for="floatingInput" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className='addOrderButton' color="primary" onClick={createOrder} >
                                Create Order<i className='fa fa-angle-double-right pl-1' aria-hidden="true"></i></Button>
                            <Button className='addOrderCancelButton'>Cancel</Button>
                            <Button className='addOrderBackButton' color="primary" onClick={previous}>
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
        client: state.response.client
    }
}

export default connect(mapStateToProps)(AddNewOrder)
