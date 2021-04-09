import React, { useState, useEffect } from 'react';
import './addAssets.css';
import { Button, Table, Row, Col } from 'reactstrap';
import Dropzone from '../../FormElement/Dropzone/dropzone';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getPersonById } from '../../Api/Api';

function AddAssets({ previous, assets, setAssets }) {

    const data = { ...assets.data }

    const [personName, setPersonName] = useState({})

    useEffect(() => {
        if (data.advertiserAssets.value !== null) {


            // const headers = {
            //     'x-token': localStorage.getItem('token')
            // }
            data.advertiserAssets.value.forEach((file) => {
                getPersonById(file.uploadedBy)
                    .then(res => {
                        let tempPersonName = res.data.person.firstName + ' ' + res.data.person.lastName
                        setPersonName({ ...personName, [file.uploadedBy]: tempPersonName })
                    })
                    .catch(err => alert(err.message))


                //     axios.get(`http://localhost:3000/api/person/get/${file.uploadedBy}?`, { headers: headers })
                //         .then(res => {
                //             let tempPersonName = res.data.data.person.firstName + ' ' + res.data.data.person.lastName
                //             setPersonName({ ...personName, [file.uploadedBy]: tempPersonName })
                //         })
                //         .catch(res => console.log(res))
            })

        }
    }, [data.advertiserAssets.value])

    // useEffect(() => {
    //     let tempvalidation = { ...validation }
    //     let valid = true
    //     for (let field in validation) {
    //         valid = valid && tempvalidation[field].valid
    //     }
    //     setIsFormValid(valid)
    // }, [validation])


    const submitEventHandler = () => {
        console.log(assets)
    }

    const submitButtonHandler = (tempdata) => {
        let valid = true
        for (let field in tempdata) {
            valid = valid && tempdata[field].valid
        }
        console.log(valid)
        return valid;
    }

    const onChangeHandler = (acceptedFile, name) => {
        if (name === 'advertiserAssets' && data.advertiserAssets.value !== null) {
            // console.log('in advertiser')
            let tempdata = { ...data, [name]: { value: data.advertiserAssets.value.concat(acceptedFile), touched: true, valid: true } }
            let validated = submitButtonHandler(tempdata)
            console.log(tempdata)
            setAssets({ ...assets, data: tempdata, validated: validated })
        } else {
            let tempdata = { ...data, [name]: { value: acceptedFile, touched: true, valid: true } }
            let validated = submitButtonHandler(tempdata)
            console.log(tempdata)
            setAssets({ ...assets, data: tempdata, validated: validated })
        }
    }



    let table = <>
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
                {/* <Row>
                <Col md={4}>File Name</Col>
                <Col md={3}>File Uploaded By</Col>
                <Col md={3}>File Uploaded Date</Col>
                <Col md={2}>Download</Col>
            </Row> */}
                <tbody>
                    {
                        data.advertiserAssets.value !== null && data.advertiserAssets.value.map(file => {
                            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                "July", "Aug", "Sep", "Oct", "Nov", "Dec"
                            ];
                            var fromDate = new Date(file.updatedAt);
                            console.log(personName)

                            return <tr key={file.id}>
                                <td md={4}>{file.assetOrignalName}</td>
                                <td md={3}>{personName[file.uploadedBy]}</td>
                                <td md={3}>{fromDate.getDate() + '-' + monthNames[fromDate.getMonth()] + '-' + fromDate.getFullYear()}</td>
                                <td md={2}><Link to={file.assetUrl} target="_blank" download={file.assetOrignalName} rel="noopener noreferrer" style={{ color: 'red' }}>Download</Link></td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </Row>
    </>
    return (
        <div className='addAssetBackground'>
            <div className='addAsset'>
                <Dropzone fileType='SCRIPT' swapDisplay={true} accept='.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' maxFiles={1} label='Script File' message='Drag & Drop Your SCRIPT File Here' name="scriptFile" file={data.scriptFile.value} onChange={onChangeHandler} />
                <Dropzone fileType='AUDIO' swapDisplay={true} accept='audio/*' maxFiles={1} label='Voice File' message='Drag & Drop Your AUDIO File Here' name="voiceFile" file={data.voiceFile.value} onChange={onChangeHandler} />
                <Dropzone fileType='OTHER' swapDisplay={false} accept='' maxFiles={0} label='Advertiser Assets' message='Drag & Drop Your File Here' name="advertiserAssets" file={data.advertiserAssets.value} onChange={onChangeHandler} />

                {table}
                <Button className='addAssetsButton' color="primary" onClick={submitEventHandler}>Done</Button>
                <Button className='addAssetsCancelButton'>Cancel</Button>
                <Button className='addAssetsBackButton' color="primary" onClick={previous}>
                    <i className='fa fa-angle-double-left pr-1' aria-hidden="true"></i>Back</Button>
            </div>
        </div>
    )
}

export default AddAssets
