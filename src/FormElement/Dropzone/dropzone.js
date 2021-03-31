import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Col, Row } from 'reactstrap';
import './dropzone.css'

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

    const onDrop = (acceptedFiles) => {
        acceptedFiles.forEach(file => {
            props.onChange(file, props.name)
        })     
    }
    
    let { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        noClick: true,
        noKeyboard: true,
        maxFiles: props.maxFiles,
        accept:props.accept,
        onDrop
    });

    console.log(acceptedFiles)

    const files = props.file && props.file.map(file => (
        <p key={file.path}>
          {file.name}
        </p>
      ));
    // const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });props.file[0].name

    return (
        <>
            <Row>
                <Col className='backgroundGrey my-3'>
                    {props.label}
                </Col>
            </Row>
            <Row>
                <Col {...getRootProps({ refKey: 'innerref', style, className: 'dropzone' })} md={6}>
                    <input {...getInputProps()} name={props.name} />
                    {props.file && props.file.length !== 0 ?  files: props.message}
                </Col>
                <Col md={1} className='orColumn'>
                    Or
            </Col>
                <Col md={5}>
                    <Button className='uploadButton' onClick={open}>Upload</Button>
                </Col>
            </Row>
        </>
        // <div className="container">
        //     <div {...getRootProps({ className: 'dropzone' })}>
        //         <input {...getInputProps()} />
        //         <p>Drag 'n' drop some files here</p>
        //         <button type="button" onClick={open}>
        //             Open File Dialog
        //   </button>
        //     </div>
        //     <aside>
        //         <h4>Files</h4>
        //         <ul>{files}</ul>
        //     </aside>
        // </div>
    );
}

export default Dropzone;
