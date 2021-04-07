import React from 'react';
import { Row, Col } from 'reactstrap'
import './uploadedfile.css'

function uploadedfile(props) {
    console.log(props.file)
    return (
        <>
            <Row>
                <Col className='backgroundGrey my-3'>
                    {/* {props.label} */}
                    scri
                </Col>
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
                                <div>{props.file.length !== 0 ? props.file[0].name : ''}</div>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <div className='heading'>File Uploaded By</div>
                                <div> File Name</div>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <div className='heading'>Upload Date</div>
                                <div></div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default uploadedfile
