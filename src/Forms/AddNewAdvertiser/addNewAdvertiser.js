import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'reactstrap';
import './addNewAdvertiser.css';
import FloatingInput from '../../FormElement/FloatingInput/floatingInput';
import SelectField from '../../FormElement/Select/select';
import { validationHandler } from '../../Shared/Validation/validation';
import axios from 'axios';
import * as actions from '../../Store/Actions/formResponse';
import { connect } from 'react-redux';
import { createClient, getCountries, getIndustries, getStates } from '../../Api/Api';
import BackDrop from '../../Shared/Backdrop/Backdrop';
import Spinner from '../../Shared/Spinner/Spinner';

function AddNewAdvertiser({ next, advertiserData, setAdvertiserData, setClientResponseData }) {

    const [isLoading, setIsLoading] = useState(false)

    const [countriesOption, setCountriesOption] = useState()
    const [stateOptions, setStateOption] = useState()
    // const [secCountriesOption, setSecCountriesOption] = useState()
    const [secStateOptions, setSecStateOption] = useState()
    const [industryOptions, setIndustryOptions] = useState()

    const data = { ...advertiserData.data }
    const secondaryContact = { ...advertiserData.secondaryContact }
    const secondaryBilling = { ...advertiserData.secondaryBilling }

    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');

        const match = cleaned.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
        if (match) {
            cleaned = `${match[1]}${match[2] ? '-' : ''}${match[2]}${match[3] ? '-' : ''}${match[3]}`;
        }
        return cleaned
    }

    const createAdvertiserHandler = () => {
        // let business = {
        //     "address": data.address.value,
        //     "address2": data.addressLine2.value,
        //     "city": data.city.value,
        //     "postal": data.postal.value,
        //     "country": data.country.value.value,
        //     "state": data.state.value.value,
        //     "provinceID": 2
        // }
        // let billing
        // if(advertiserData.secondaryBillingAddressCheck){
        //     billing = {
        //         "address": secondaryBilling.address.value,
        //         "address2": secondaryBilling.addressLine2.value,
        //         "city": secondaryBilling.city.value,
        //         "state": secondaryBilling.state.value.value,
        //         "postal": secondaryBilling.postal.value,
        //         "country": secondaryBilling.country.value.value,
        //         "provinceID": 2
        //     }
        // } else {
        //     billing = business
        // }

        // let clientData = {
        //     "companyName": data.companyName.value,
        //     "industryID": data.industryCategory.value.value,
        //     "companyWebsite": data.companyWebsiteAddress.value,
        //     "companyType": "Client",
        //     "contactAddress": {
        //         "business": business,
        //         "billing": billing,
        //         "useSame": !advertiserData.secondaryBillingAddressCheck
        //     },
        //     "addressType": "Billing",
        //     "firstName": data.firstName.value,
        //     "lastName": data.lastName.value,
        //     "email": data.email.value,
        //     "phone": data.phone.value,
        //     "roleCode": "CLIENT",
        //     "createdByPerson": localStorage.getItem('personId')
        // }
        // if(advertiserData.secondaryContactCheck){
        //     let clientSecondaryContact = {
        //         "firstName": secondaryContact.firstName.value,
        //         "lastName": secondaryContact.lastName.value,
        //         "email": secondaryContact.email.value,
        //         "phone": secondaryContact.phone.value
        //     }
        //     clientData['secondaryContact'] = clientSecondaryContact
        // }

        // setIsLoading(true)
        // createClient(clientData)
        //     .then(res => {
        // setIsLoading(false)
            //         setClientResponseData(res)
            //         next()
            //     })
            // .catch(err => {
            //     setIsLoading(false)
            //     alert(err.message)
            // })


        // const headers = {
        //     'Content-Type': 'application/json',
        //     'x-token': localStorage.getItem('token')
        // }
        // console.log(clientData)
        // axios.post('http://localhost:3000/api/company/client',clientData,{headers:headers})
        //     .then(res => {
        //         setClientResponseData(res.data.data)
        //         next()
        //     })
        //     .catch(error => console.log(error.response.data.errorMessage))
        next()
    }

    useEffect(() => {
        if (advertiserData.secIsCountry) {
            getStates(secondaryBilling.country.value.value)
                .then(res => {
                    let states = res
                    setSecStateOption(states.map(state => {
                        return { value: state.code, label: state.name }
                    })
                    )
                })
                .catch(err => alert(err.message))
            // axios.get(`http://localhost:3000/pub/states/${secondaryBilling.country.value.value}`)
            //     .then(res => {
            //         let states = res.data.data
            //         setSecStateOption(states.map(state => {
            //             return { value: state.code, label: state.name }
            //         })
            //         )
            //     })
            //     .catch(res => console.log(res))
        }
    }, [secondaryBilling.country.value, advertiserData.secIsCountry])

    useEffect(() => {
        if (advertiserData.isCountry) {
            getStates(data.country.value.value)
                .then(res => {
                    let states = res
                    setStateOption(states.map(state => {
                        return { value: state.code, label: state.name }
                    })
                    )
                })
                .catch(err => alert(err.message))
            // axios.get(`http://localhost:3000/pub/states/${data.country.value.value}`)
            //     .then(res => {
            //         let states = res.data.data
            //         setStateOption(states.map(state => {
            //             return { value: state.code, label: state.name }
            //         })
            //         )
            //     })
            //     .catch(res => console.log(res))
        }
    }, [data.country.value, advertiserData.isCountry])

    useEffect(() => {
        getCountries()
            .then(res => {
                let countries = res
                setCountriesOption(countries.map(country => {
                    return { value: country.code, label: country.name }
                })
                )
            })
            .catch(err => alert(err.message))
        getIndustries()
            .then(res => {
                let industries = res.data
                setIndustryOptions(industries.map(industry => {
                    return { value: industry.id, label: industry.name }
                })
                )
            })
            .catch(err => alert(err.message))
        // const headers = {
        //     // 'Content-Type': 'application/json',
        //     'x-token': localStorage.getItem('token')
        // }
        // axios.get('http://localhost:3000/api/wholesalepricing/getIndustries', { headers: headers })
        //     .then(res => {
        //         let industries = res.data.data
        //         setIndustryOptions(industries.map(industry => {
        //             return { value: industry.id, label: industry.name }
        //         })
        //         )
        //     })
        //     .catch(res => console.log(res))
    }, [])

    const submitButtonHandler = (data1, data2, data3) => {
        let valid = true
        for (let field in data1) {
            valid = valid && data1[field].valid
        }
        if (data2) {
            for (let field in data2) {
                valid = valid && data2[field].valid
            }
        }
        if (data3) {
            for (let field in data3) {
                valid = valid && data3[field].valid
            }
        }
        return valid;
    }

    const onChangeHandler = (event, name) => {
        if (name) {
            let tempdata
            if (name === 'country') {
                // document.getElementById('state').clearValue()
                let isValid = validationHandler(name, event.value)
                tempdata = { ...data, [name]: { value: event, touched: true, valid: isValid }, 'state': { value: null, touched: false, valid: false }, 'postal': { value: '', touched: false, valid: false } }
                let validated = submitButtonHandler(tempdata)
                setAdvertiserData({ ...advertiserData, data: tempdata, validated: validated, isCountry: true })
            } else {
                let isValid = validationHandler(name, event.value)
                tempdata = { ...data, [name]: { value: event, touched: true, valid: isValid } }
                let validated = submitButtonHandler(tempdata)
                setAdvertiserData({ ...advertiserData, data: tempdata, validated: validated })
            }

        } else if (event.target.type === 'checkbox') {
            let validated
            if (event.target.checked) {
                let tempdata
                if (event.target.name === 'secondaryContactCheck')
                    tempdata = { ...secondaryContact }
                else if (event.target.name === 'secondaryBillingAddressCheck')
                    tempdata = { ...secondaryBilling }
                validated = submitButtonHandler(tempdata)
            } else {
                let tempdata = { ...data }
                validated = submitButtonHandler(tempdata)
            }
            setAdvertiserData({ ...advertiserData, [event.target.name]: event.target.checked, validated: validated })
        } else {
            let isValid
            if (event.target.name === 'postal') {
                isValid = validationHandler(`postal${data.country.value.value}`, event.target.value)
            } else {
                isValid = validationHandler(event.target.name, event.target.value)
            }
            if (event.target.name === 'phone') {
                let tempdata = { ...data, [event.target.name]: { value: formatPhoneNumber(event.target.value), touched: true, valid: isValid } }
                let validated = submitButtonHandler(tempdata)
                setAdvertiserData({ ...advertiserData, data: tempdata, validated: validated })
            }
            else {
                let tempdata = { ...data, [event.target.name]: { value: event.target.value, touched: true, valid: isValid } }
                let validated = submitButtonHandler(tempdata)
                setAdvertiserData({ ...advertiserData, data: tempdata, validated: validated })
            }

        }
    }

    const onSecondaryContactChangeHandler = (event, name) => {
        if (name) {

            let isValid = validationHandler(name, event.value)
            let tempdata = { ...secondaryContact, [name]: { value: event.value, touched: true, valid: isValid } }
            let validated = submitButtonHandler(tempdata, data)
            setAdvertiserData({ ...advertiserData, secondaryContact: tempdata, validated: validated })
        } else {
            let isValid = validationHandler(event.target.name, event.target.value)
            if (event.target.name === 'phone') {
                let tempdata = { ...secondaryContact, [event.target.name]: { value: formatPhoneNumber(event.target.value), touched: true, valid: isValid } }
                let validated = submitButtonHandler(tempdata)
                setAdvertiserData({ ...advertiserData, secondaryContact: tempdata, validated: validated })
            } else {
                let tempdata = { ...secondaryContact, [event.target.name]: { value: event.target.value, touched: true, valid: isValid } }
                let validated = submitButtonHandler(tempdata, data)
                setAdvertiserData({ ...advertiserData, secondaryContact: tempdata, validated: validated })
            }
        }
    }

    const onSecondaryBillingChangeHandler = (event, name) => {
        if (name) {
            let tempdata
            if (name === 'country') {
                // document.getElementById('state').clearValue()
                let isValid = validationHandler(name, event.value)
                tempdata = { ...secondaryBilling, [name]: { value: event, touched: true, valid: isValid }, 'state': { value: null, touched: false, valid: false }, 'postal': { value: '', touched: false, valid: false } }
                let validated = submitButtonHandler(tempdata, data)
                setAdvertiserData({ ...advertiserData, secondaryBilling: tempdata, validated: validated, secIsCountry: true })
            } else {
                let isValid = validationHandler(name, event.value)
                tempdata = { ...secondaryBilling, [name]: { value: event, touched: true, valid: isValid } }
                let validated = submitButtonHandler(tempdata, data)
                setAdvertiserData({ ...advertiserData, secondaryBilling: tempdata, validated: validated })
            }
        } else {
            let isValid
            if (event.target.name === 'postal') {
                console.log('inpostalsec')
                isValid = validationHandler(`postal${secondaryBilling.country.value.value}`, event.target.value)
            } else {
                isValid = validationHandler(event.target.name, event.target.value)
            }
            let tempdata = { ...secondaryBilling, [event.target.name]: { value: event.target.value, touched: true, valid: isValid } }
            let validated = submitButtonHandler(tempdata, data)
            setAdvertiserData({ ...advertiserData, secondaryBilling: tempdata, validated: validated })
        }
    }

    let secondaryContactForm = null

    if (advertiserData.secondaryContactCheck) {
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
                    <FloatingInput maxLength={12} error={secondaryContact.phone.touched && !secondaryContact.phone.valid ? 'inValid' : ''} name="phone" onChange={onSecondaryContactChangeHandler} value={secondaryContact.phone.value} type='name' label='Phone' placeholder='Phone' id="Phone" for="floatingInput" />
                </Col>
            </Row>
        </>
    }

    let secondaryBillingForm = null

    if (advertiserData.secondaryBillingAddressCheck) {
        secondaryBillingForm = <>
            <Row>
                <Col md={6}>
                    <FloatingInput error={secondaryBilling.address.touched && !secondaryBilling.address.valid ? 'inValid' : ''} name="address" onChange={onSecondaryBillingChangeHandler} value={secondaryBilling.address.value} type='address' label='Address' placeholder='Address' id="address2" for="floatingInput" />
                </Col>
                <Col md={6}>
                    <FloatingInput error={secondaryBilling.addressLine2.touched && !secondaryBilling.addressLine2.valid ? 'inValid' : ''} name="addressLine2" onChange={onSecondaryBillingChangeHandler} value={secondaryBilling.addressLine2.value} type='address' label='AddressLine2' placeholder='AddressLine2' id="addressLine2" for="floatingInput" />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FloatingInput error={secondaryBilling.city.touched && !secondaryBilling.city.valid ? 'inValid' : ''} name="city" onChange={onSecondaryBillingChangeHandler} value={secondaryBilling.city.value} type='name' label='City' placeholder='City' id="city2" for="floatingInput" />
                </Col>
                <Col md={6}>
                    <SelectField name="country" id="country2" onChange={onSecondaryBillingChangeHandler} value={secondaryBilling.country.value} options={countriesOption} label="Country" />
                    {/* <FloatingInput error={secondaryBilling.country.touched && !secondaryBilling.country.valid ? 'inValid' : ''} name="country" onChange={onSecondaryBillingChangeHandler} value={secondaryBilling.country.value} type='name' label='Country' placeholder='Country' id="country" for="floatingInput" /> */}
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <SelectField disabled={!advertiserData.secIsCountry} name="state" id="state2" onChange={onSecondaryBillingChangeHandler} value={secondaryBilling.state.value} options={secStateOptions} label="State" />
                </Col>
                <Col md={6}>
                    <FloatingInput disabled={!advertiserData.secIsCountry} error={secondaryBilling.postal.touched && !secondaryBilling.postal.valid ? 'inValid' : ''} name="postal" onChange={onSecondaryBillingChangeHandler} value={secondaryBilling.postal.value} type='name' label='Postal' placeholder='Postal' id="postal" for="floatingInput" />
                </Col>
            </Row>
        </>
    }

    return (
        <>
            <BackDrop show={isLoading}><Spinner /></BackDrop>
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
                        <SelectField name="industryCategory" id="industryCategory" value={data.industryCategory.value} onChange={onChangeHandler} options={industryOptions} label='Industry Category' />
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
                        <FloatingInput error={data.phone.touched && !data.phone.valid ? 'inValid' : ''} maxLength={12} name="phone" onChange={onChangeHandler} value={data.phone.value} type='name' label='Phone' placeholder='Phone' id="Phone" for="floatingInput" />
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
                        <SelectField name="country" id="country" onChange={onChangeHandler} value={data.country.value} options={countriesOption} label="Country" />
                        {/* <FloatingInput error={data.country.touched && !data.country.valid ? 'inValid' : ''} name="country" onChange={onChangeHandler} value={data.country.value} type='name' label='Country' placeholder='Country' id="country" for="floatingInput" /> */}
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <SelectField disabled={!advertiserData.isCountry} name="state" id="state" onChange={onChangeHandler} value={data.state.value} options={stateOptions} label="State" />
                    </Col>
                    <Col md={6}>
                        <FloatingInput disabled={!advertiserData.isCountry} error={data.postal.touched && !data.postal.valid ? 'inValid' : ''} name="postal" onChange={onChangeHandler} value={data.postal.value} type='name' label='Postal' placeholder='Postal' id="postal" for="floatingInput" />
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
                        <Button disabled={advertiserData.validated} className='addAdvertiserButton' color="primary" onClick={createAdvertiserHandler}>
                            Create Advertiser<i className='fa fa-angle-double-right pl-1' aria-hidden="true"></i></Button>
                        <Button className='addAdvertiserCancelButton'>Cancel</Button>
                    </Col>
                </Row>

            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setClientResponseData: (data) => dispatch(actions.setClientFormResponse(data))
    }
}

export default connect(null, mapDispatchToProps)(AddNewAdvertiser)
