import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Col, Row, Spinner } from 'reactstrap';
import './dropzone.css';
import { uploadFile, getPersonById } from '../../Api/Api';
import { connect } from 'react-redux';

const style = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};



const Dropzone = (props) => {

    const [personName, setPersonName] = useState()

    const [isLoading, setIsLoading] = useState(false)
    let formData = new FormData()
    formData.append('type', props.fileType)
    let personData = JSON.parse(localStorage.getItem('personData'))
    formData.append('uploadedBy', personData.id)
    if(props.campaignID){
        formData.append('campaignID', props.campaignID)
    } else {
        formData.append('campaignID', props.order.history.campaignID)
    }
    

    const onDrop = (acceptedFiles) => {
        acceptedFiles.forEach(file => {
            formData.append('file', file)
            setIsLoading(true)
            uploadFile(formData)
                .then(res => {
                    setIsLoading(false)
                    props.onChange(res.data, props.name)
                })
                .catch(err => {
                    setIsLoading(false)
                    alert(err)
                })
        })
    }

    let { getRootProps, getInputProps, open } = useDropzone({
        noClick: true,
        noKeyboard: true,
        maxFiles: props.maxFiles,
        accept: props.accept,
        onDrop
    });
    let dropzone
    if (props.file && props.file.length !== 0 && props.swapDisplay && props.swapDisplay === true) {
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "July", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        var fromDate = new Date(props.file[0].updatedAt);

        getPersonById(props.file[0].uploadedBy)
            .then(res => {
                let personName = res.data.person.firstName + ' ' + res.data.person.lastName
                setPersonName(personName)
            })
            .catch(err => alert(err))
        
        dropzone = <>
            <Row>
                <Col className='backgroundGrey my-3'>
                    {props.label}
                </Col>
            </Row>
            <Row className='uploadedfile'>
                <Col md={1}>
                    <i className="fa-file fa fa-3x  text-primary mr-3"></i>
                </Col>
                <Col md={11}>
                    <Row>
                        <Col>
                            <div>
                                <div className='heading'>File Name</div>
                                <div>{props.file[0].assetOrignalName.substring(0, 25) + `${props.file[0].assetOrignalName.length > 25 ? '...' : ''}`}</div>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <div className='heading'>File Uploaded By</div>
                                <div>{personName}</div>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <div className='heading'>Upload Date</div>
                                <div>{fromDate.getDate() + '-' + monthNames[fromDate.getMonth()] + '-' + fromDate.getFullYear()}</div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    } else {
        dropzone = <>
            <Row>
                <Col className='backgroundGrey my-3'>
                    {props.label}
                </Col>
            </Row>
            { isLoading === true
                ? <Row>
                    <div className='spinnerDiv'>
                        <Spinner color='primary' />
                    </div>
                </Row>
                : <Row>
                    <Col {...getRootProps({ refKey: 'innerref', style, className: 'dropzone' })} md={6}>
                        <input {...getInputProps()} name={props.name} />
                        {props.message}
                    </Col>
                    <Col md={1} className='orColumn'>
                        Or
            </Col>
                    <Col md={5}>
                        <Button className='uploadButton' onClick={open}>Upload</Button>
                    </Col>
                </Row>
            }

        </>
    }
    return dropzone
}

const mapStateToProps = state => {
    return {
        order: state.response.order
    }
}

export default connect(mapStateToProps)(Dropzone);
