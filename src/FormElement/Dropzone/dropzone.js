import axios from 'axios';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Col, Row } from 'reactstrap';
import './dropzone.css';
import {Link} from 'react-router-dom';
import {uploadFile, getPersonById} from '../../Api/Api';

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

    let formData = new FormData()
    formData.append('type', props.fileType)
    formData.append('uploadedBy', localStorage.getItem('personId'))
    formData.append('campaignID', '37371ae5-5fc8-4ccc-90a6-4c2cb7cd23ea')

    const onDrop = (acceptedFiles) => {
        acceptedFiles.forEach(file => {
            // props.onChange(file, props.name)
            formData.append('file', file)

            uploadFile(formData)
                .then(res => {
                    props.onChange(res.data, props.name)
                })
                .catch(err => alert(err.message))

            // const headers = {
            //     'Content-Type': 'text/plain',
            //     'x-token': localStorage.getItem('token')
            // }

            // axios.post('http://localhost:3000/api/campaign/upload', formData, { headers: headers })
            //     .then(res => {
            //         props.onChange(res.data.data.data, props.name)
            //         console.log('fileupload sent    ')
            //     })
            //     .catch(res => console.log(res))
        })
    }

    let { getRootProps, getInputProps, open } = useDropzone({
        noClick: true,
        noKeyboard: true,
        maxFiles: props.maxFiles,
        accept: props.accept,
        onDrop
    });

    console.log(props.file !== null ? props.file[0] : 'empty')

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
            .catch(err => alert(err.message))
        // const headers = {
        //     'x-token': localStorage.getItem('token')
        // }
        // axios.get(`http://localhost:3000/api/person/get/${props.file[0].uploadedBy}?`, { headers: headers })
        //     .then(res => {
        //         let personName = res.data.data.person.firstName + ' ' + res.data.data.person.lastName
        //         setPersonName(personName)
        //         console.log(personName)
        //     })
        //     .catch(res => console.log(res))
        dropzone = <>
            <Row>
                <Col className='backgroundGrey my-3'>
                    {props.label}
                </Col>
                {/* <Col>
                    <Link to={props.file[0].assetUrl} target="_blank" download={props.file[0].assetOrignalName} style={{ color: 'red' }}>Download</Link>
                </Col> */}
            </Row>
            <Row className='uploadedfile'>
                <Col md={1}>
                    <i class="fa-file fa fa-3x  text-primary mr-3"></i>
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
            <Row>
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
        </>
    }
    // const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });props.file[0].name

    return dropzone
}

export default Dropzone;
