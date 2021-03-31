import React, { useState, useEffect } from 'react';
import FloatingInput from '../../FormElement/FloatingInput/floatingInput';
import SelectField from '../../FormElement/Select/select';
import './addNewOrder.css'
import { Col, Row } from 'reactstrap';
import Textarea from '../../FormElement/Textarea/textarea';
import { Button } from 'reactstrap';
import { validationHandler } from '../../Shared/Validation/validation';

function AddNewOrder({ next, previous, orderData, setOrderData }) {

    const data = {...orderData.data} 

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
        let isValid,tempdata,validated
        if (name) {
            isValid = validationHandler(name, event.value)
            tempdata = { ...data, [name]: { value: event.value, touched: true, valid: isValid } }
            validated = submitButtonHandler(tempdata)
        } else {
            isValid = validationHandler(event.target.name, event.target.value)
            tempdata = { ...data, [event.target.name]: { value: event.target.value, touched: true, valid: isValid } }
            validated = submitButtonHandler(tempdata)
        }
        setOrderData({ ...orderData, data:tempdata, validated:validated })
    }

    const createOrder = () => {
        console.log(orderData)
        next()
    }
    let carOptions = [
        { value: 'tesla', label: 'Tesla' },
        { value: 'lamborgini', label: 'Lamborgini' },
        { value: 'jaguar', label: 'Jaguar' },
        { value: 'fortuner', label: 'Fortuner' }
    ]
    return (
        <div className='addNewOrderBackground'>
            <div className='addNewOrder'>
                <Row>
                    <Col className='backgroundGrey m-3'>
                        Order
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FloatingInput error={data.advertiser.touched && !data.advertiser.valid ? 'inValid' : ''} name="advertiser" onChange={onChangeHandler} value={data.advertiser.value} type='name' label='Advertiser' placeholder='Advertiser' id="advertiser" for="floatingInput" />
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
                        <FloatingInput error={data.price.touched && !data.price.valid ? 'inValid' : ''} name="price" onChange={onChangeHandler} value={data.price.value} type='name' label='Price' placeholder='Price' id="price" for="floatingInput" />
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
                        <SelectField name="targetMarket" onChange={onChangeHandler} value={data.targetMarket.value} id='targetMarket' options={carOptions} label='Target Market' />
                    </Col>
                    <Col md={6}>
                        <FloatingInput error={data.budget.touched && !data.budget.valid ? 'inValid' : ''} name="budget" onChange={onChangeHandler} value={data.budget.value} type='text' label='Budget' placeholder='Budget' id="budget" for="floatingInput" />
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
    )
}

export default AddNewOrder
