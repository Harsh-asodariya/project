import React, { useState, useEffect } from 'react';
import './addAssets.css';
import { Button, Table, Row, Col } from 'reactstrap';
import Dropzone from '../../FormElement/Dropzone/dropzone';
import { Link } from 'react-router-dom';
import { getPersonById } from '../../Api/Api';

function AddAssets({ previous, assets, setAssets, props }) {

    const data = { ...assets.data }

    const [personName, setPersonName] = useState({})

    useEffect(() => {
        if (data.advertiserAssets.value !== null) {

            data.advertiserAssets.value.forEach((file) => {
                getPersonById(file.uploadedBy)
                    .then(res => {
                        let tempPersonName = res.data.person.firstName + ' ' + res.data.person.lastName
                        setPersonName({ ...personName, [file.uploadedBy]: tempPersonName })
                    })
                    .catch(err => alert(err.message))

            })

        }
    }, [data.advertiserAssets.value])

    const submitEventHandler = () => {
        props.history.push('/dashboard')
    }

    const onChangeHandler = (acceptedFile, name) => {
        if (name === 'advertiserAssets' && data.advertiserAssets.value !== null) {
            let tempdata = { ...data, [name]: { value: data.advertiserAssets.value.concat(acceptedFile) } }
            setAssets({ ...assets, data: tempdata })
        } else {
            let tempdata = { ...data, [name]: { value: acceptedFile } }
            setAssets({ ...assets, data: tempdata})
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
                <tbody>
                    {
                        data.advertiserAssets.value !== null && data.advertiserAssets.value.map(file => {
                            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                "July", "Aug", "Sep", "Oct", "Nov", "Dec"
                            ];
                            var fromDate = new Date(file.updatedAt);

                            return <tr key={file.id}>
                                <td md={4}>{file.assetOrignalName}</td>
                                <td md={3}>{personName[file.uploadedBy]}</td>
                                <td md={3}>{fromDate.getDate() + '-' + monthNames[fromDate.getMonth()] + '-' + fromDate.getFullYear()}</td>
                                <td md={2}><Button onClick={() => window.open(file.assetUrl, '_blank')}>Download</Button></td>
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
                <Button className='addAssetsCancelButton' onClick={() => props.history.push('/dashboard')}>Cancel</Button>
                <Button disabled={true} className='addAssetsBackButton' color="primary" onClick={previous}>
                    <i className='fa fa-angle-double-left pr-1' aria-hidden="true"></i>Back</Button>
            </div>
        </div>
    )
}

export default AddAssets
