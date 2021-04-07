import React, { useState, useEffect } from 'react';
import './addAssets.css';
import { Button } from 'reactstrap';
import Dropzone from '../../FormElement/Dropzone/dropzone';
import Uploadedfile from '../Uploaded file/uploadedfile';

function AddAssets({ previous, assets, setAssets }) {

    const data = { ...assets.data }

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
        if (name === 'advertiserAssets') {
            let tempdata = { ...data, [name]: { value: [...data[name].value, acceptedFile], touched: true, valid: true } }
            let validated = submitButtonHandler(tempdata)

            setAssets({ ...assets, data: tempdata, validated: validated })
        } else {
            let tempdata = { ...data, [name]: { value: [acceptedFile], touched: true, valid: true } }
            let validated = submitButtonHandler(tempdata)

            setAssets({ ...assets, data: tempdata, validated: validated })
        }
    }

    let scriptFile, audioFile

    return (
        <div className='addAssetBackground'>
            <div className='addAsset'>
                <Dropzone accept='.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' maxFiles={1} label='Script File' message='Drag & Drop Your SCRIPT File Here' name="scriptFile" file={data.scriptFile.value} onChange={onChangeHandler} />
                <Dropzone accept='audio/*' maxFiles={1} label='Voice File' message='Drag & Drop Your AUDIO File Here' name="voiceFile" file={data.voiceFile.value} onChange={onChangeHandler} />
                <Dropzone accept='' maxFiles={0} label='Advertiser Assets' message='Drag & Drop Your File Here' name="advertiserAssets" file={data.advertiserAssets.value} onChange={onChangeHandler} />
                <Uploadedfile file={data.scriptFile.value}/>
                <Button className='addAssetsButton' color="primary" onClick={submitEventHandler}>Done</Button>
                <Button className='addAssetsCancelButton'>Cancel</Button>
                <Button className='addAssetsBackButton' color="primary" onClick={previous}>
                    <i className='fa fa-angle-double-left pr-1' aria-hidden="true"></i>Back</Button>
            </div>
        </div>
    )
}

export default AddAssets
