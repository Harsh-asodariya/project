import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'reactstrap';
import './addNewAdvertiser.css';
import FloatingInput from '../../FormElement/FloatingInput/floatingInput';
import SelectField from '../../FormElement/Select/select';
import { validationHandler } from '../../Shared/Validation/validation';

function AddNewAdvertiser({ next, advertiserData, setAdvertiserData }) {

    const data = { ...advertiserData.data }
    const secondaryContact = { ...advertiserData.secondaryContact }
    const secondaryBilling = { ...advertiserData.secondaryBilling }
    const createAdvertiserHandler = () => {
        console.log(advertiserData)
        next()
    }
   
    let carOptions = [
        { value: 'tesla', label: 'Tesla' },
        { value: 'lamborgini', label: 'Lamborgini' },
        { value: 'jaguar', label: 'Jaguar' },
        { value: 'fortuner', label: 'Fortuner' }
    ]

    const submitButtonHandler = (tempdata) => {
        let valid = true
        for (let field in tempdata) {
            valid = valid && tempdata[field].valid
        }
        console.log(valid)
        return valid;
    }

    const onChangeHandler = (event, name) => {
        if (name) {
            let isValid = validationHandler(name, event.value)
            let tempdata = { ...data, [name]: { value: event.value, touched: true, valid: isValid } }
            let validated = submitButtonHandler(tempdata)
            setAdvertiserData({ ...advertiserData, data: tempdata, validated: validated })
        } else if (event.target.type === 'checkbox') {
            console.log([event.target.name], event.target.checked)
            let validated
            if (event.target.checked) {
                let tempdata
                if(event.target.name === 'secondaryContactCheck')
                    tempdata = { ...secondaryContact }
                else if(event.target.name === 'secondaryBillingAddressCheck')
                    tempdata = { ...secondaryBilling }
                validated = submitButtonHandler(tempdata)
            } else {
                let tempdata = { ...data }
                validated = submitButtonHandler(tempdata)
            }
            setAdvertiserData({ ...advertiserData, [event.target.name]: event.target.checked, validated: validated })
        } else {
            let isValid = validationHandler(event.target.name, event.target.value)
            let tempdata = { ...data, [event.target.name]: { value: event.target.value, touched: true, valid: isValid } }
            let validated = submitButtonHandler(tempdata)
            setAdvertiserData({ ...advertiserData, data: tempdata, validated: validated })
        }
    }

    const onSecondaryContactChangeHandler = (event, name) => {
        if (name) {
            let isValid = validationHandler(name, event.value)
            let tempdata = { ...secondaryContact, [name]: { value: event.value, touched: true, valid: isValid } }
            let validated = submitButtonHandler(tempdata)
            setAdvertiserData({ ...advertiserData, secondaryContact: tempdata, validated: validated })
        } else {
            let isValid = validationHandler(event.target.name, event.target.value)
            let tempdata = { ...secondaryContact, [event.target.name]: { value: event.target.value, touched: true, valid: isValid } }
            let validated = submitButtonHandler(tempdata)
            setAdvertiserData({ ...advertiserData, secondaryContact: tempdata, validated: validated })
        }
    }

    const onSecondaryBillingChangeHandler = (event, name) => {
        if (name) {
            let isValid = validationHandler(name, event.value)
            let tempdata = { ...secondaryBilling, [name]: { value: event.value, touched: true, valid: isValid } }
            let validated = submitButtonHandler(tempdata)
            setAdvertiserData({ ...advertiserData, secondaryBilling: tempdata, validated: validated })
        } else {
            let isValid = validationHandler(event.target.name, event.target.value)
            let tempdata = { ...secondaryBilling, [event.target.name]: { value: event.target.value, touched: true, valid: isValid } }
            let validated = submitButtonHandler(tempdata)
            setAdvertiserData({ ...advertiserData, secondaryBilling: tempdata, validated: validated })
        }
    }

    let secondaryContactForm = null

    if (advertiserData.secondaryContactCheck) {
        console.log('innif')
        secondaryContactForm = <>
            <Row>
                <Col md={6}>
                    <FloatingInput error={secondaryContact.firstName.touched && !secondaryContact.firstName.valid ? 'inValid' : ''} name="firstName" onChange={onSecondaryContactChangeHandler} value={secondaryContact.firstName.value} type='name' label='First Name' placeholder='First Name' id="firstName" for="floatingInput" />
                </Col>
                <Col md={6}>
                    <FloatingInput error={secondaryContact.lastName.touched && !secondaryContact.lastName.valid ? 'inValid' : ''} name="lastName" onChange={onSecondaryContactChangeHandler} value={secondaryContact.lastName.value} type='name' label='Last Name' placeholder='Last Name' id="lastName" for="floatingInput" />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FloatingInput error={secondaryContact.email.touched && !secondaryContact.email.valid ? 'inValid' : ''} name="email" onChange={onSecondaryContactChangeHandler} value={secondaryContact.email.value} type='name' label='Email' placeholder='Email' id="Email" for="floatingInput" />
                </Col>
                <Col md={6}>
                    <FloatingInput error={secondaryContact.phone.touched && !secondaryContact.phone.valid ? 'inValid' : ''} name="phone" onChange={onSecondaryContactChangeHandler} value={secondaryContact.phone.value} type='name' label='Phone' placeholder='Phone' id="Phone" for="floatingInput" />
                </Col>
            </Row>
        </>
    }

    let secondaryBillingForm = null

    if (advertiserData.secondaryBillingAddressCheck) {
        secondaryBillingForm = <>
            <Row>
                <Col md={6}>
                    <FloatingInput error={secondaryBilling.address.touched && !secondaryBilling.address.valid ? 'inValid' : ''} name="address" onChange={onSecondaryBillingChangeHandler} value={secondaryBilling.address.value} type='address' label='Address' placeholder='Address' id="address" for="floatingInput" />
                </Col>
                <Col md={6}>
                    <FloatingInput error={secondaryBilling.addressLine2.touched && !secondaryBilling.addressLine2.valid ? 'inValid' : ''} name="addressLine2" onChange={onSecondaryBillingChangeHandler} value={secondaryBilling.addressLine2.value} type='address' label='AddressLine2' placeholder='AddressLine2' id="addressLine2" for="floatingInput" />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FloatingInput error={secondaryBilling.city.touched && !secondaryBilling.city.valid ? 'inValid' : ''} name="city" onChange={onSecondaryBillingChangeHandler} value={secondaryBilling.city.value} type='name' label='City' placeholder='City' id="city" for="floatingInput" />
                </Col>
                <Col md={6}>
                    <FloatingInput error={secondaryBilling.country.touched && !secondaryBilling.country.valid ? 'inValid' : ''} name="country" onChange={onSecondaryBillingChangeHandler} value={secondaryBilling.country.value} type='name' label='Country' placeholder='Country' id="country" for="floatingInput" />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <SelectField name="state" id="state" onChange={onSecondaryBillingChangeHandler} value={secondaryBilling.state.value} options={carOptions} label="State" />
                </Col>
                <Col md={6}>
                    <FloatingInput error={secondaryBilling.postal.touched && !secondaryBilling.postal.valid ? 'inValid' : ''} name="postal" onChange={onSecondaryBillingChangeHandler} value={secondaryBilling.postal.value} type='name' label='Postal' placeholder='Postal' id="postal" for="floatingInput" />
                </Col>
            </Row>
        </>
    }

    return (
        <div className='addNewAdvertiser'>
            <Row>
                <Col md={6}>
                    <FloatingInput name="companyName" error={data.companyName.touched && !data.companyName.valid ? 'inValid' : ''} onChange={onChangeHandler} value={data.companyName.value} type='name' label='Company Name' placeholder='Company Name' id="CompanyName" for="floatingInput" />
                </Col>
                <Col md={6}>
                    <FloatingInput error={data.companyWebsiteAddress.touched && !data.companyWebsiteAddress.valid ? 'inValid' : ''} name="companyWebsiteAddress" onChange={onChangeHandler} value={data.companyWebsiteAddress.value} type='name' label='Company Website Address' placeholder='Company Website Address' id="CompanyWebsiteAddress" for="floatingInput" />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <SelectField name="industryCategory" id="industryCategory" value={data.industryCategory.value} onChange={onChangeHandler} options={carOptions} label='Industry Category' />
                </Col>
            </Row>
            <Row>
                <Col className='backgroundGrey m-3'>
                    Primary Contact
                    </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FloatingInput error={data.firstName.touched && !data.firstName.valid ? 'inValid' : ''} name="firstName" onChange={onChangeHandler} value={data.firstName.value} type='name' label='First Name' placeholder='First Name' id="firstName" for="floatingInput" />
                </Col>
                <Col md={6}>
                    <FloatingInput error={data.lastName.touched && !data.lastName.valid ? 'inValid' : ''} name="lastName" onChange={onChangeHandler} value={data.lastName.value} type='name' label='Last Name' placeholder='Last Name' id="lastName" for="floatingInput" />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FloatingInput error={data.email.touched && !data.email.valid ? 'inValid' : ''} name="email" onChange={onChangeHandler} value={data.email.value} type='name' label='Email' placeholder='Email' id="Email" for="floatingInput" />
                </Col>
                <Col md={6}>
                    <FloatingInput error={data.phone.touched && !data.phone.valid ? 'inValid' : ''} name="phone" onChange={onChangeHandler} value={data.phone.value} type='name' label='Phone' placeholder='Phone' id="Phone" for="floatingInput" />
                </Col>
            </Row>
            <Row>
                <Col className='backgroundGrey mb-3 mx-3'>
                    <input name="secondaryContactCheck" id='secondaryContactCheck' className="secondaryContactCheck" onChange={onChangeHandler} checked={advertiserData.secondaryContactCheck} type='checkbox' />
                    Secondary Contact (Billing - Option)
                    </Col>
            </Row>
            {secondaryContactForm}
            <Row>
                <Col className='backgroundGrey mx-3 mb-3'>
                    Business Address
                    </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FloatingInput error={data.address.touched && !data.address.valid ? 'inValid' : ''} name="address" onChange={onChangeHandler} value={data.address.value} type='address' label='Address' placeholder='Address' id="address" for="floatingInput" />
                </Col>
                <Col md={6}>
                    <FloatingInput error={data.addressLine2.touched && !data.addressLine2.valid ? 'inValid' : ''} name="addressLine2" onChange={onChangeHandler} value={data.addressLine2.value} type='address' label='AddressLine2' placeholder='AddressLine2' id="addressLine2" for="floatingInput" />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FloatingInput error={data.city.touched && !data.city.valid ? 'inValid' : ''} name="city" onChange={onChangeHandler} value={data.city.value} type='name' label='City' placeholder='City' id="city" for="floatingInput" />
                </Col>
                <Col md={6}>
                    <FloatingInput error={data.country.touched && !data.country.valid ? 'inValid' : ''} name="country" onChange={onChangeHandler} value={data.country.value} type='name' label='Country' placeholder='Country' id="country" for="floatingInput" />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <SelectField name="state" id="state" onChange={onChangeHandler} value={data.state.value} options={carOptions} label="State" />
                </Col>
                <Col md={6}>
                    <FloatingInput error={data.postal.touched && !data.postal.valid ? 'inValid' : ''} name="postal" onChange={onChangeHandler} value={data.postal.value} type='name' label='Postal' placeholder='Postal' id="postal" for="floatingInput" />
                </Col>
            </Row>
            <Row>
                <Col className='backgroundGrey mx-3'>
                    <input name="secondaryBillingAddressCheck" className="secondaryContactCheck" onChange={onChangeHandler} checked={advertiserData.secondaryBillingAddressCheck} type='checkbox' />
                    Bulling Address (Optional)
                    </Col>
            </Row>
            {secondaryBillingForm}
            <Row>
                <Col>
                    <Button className='addAdvertiserButton' color="primary" onClick={createAdvertiserHandler}>
                        Create Advertiser<i className='fa fa-angle-double-right pl-1' aria-hidden="true"></i></Button>
                    <Button className='addAdvertiserCancelButton'>Cancel</Button>
                </Col>
            </Row>

        </div>
    )
}

export default AddNewAdvertiser
