import "./order.css";
import Stepper from "../Stepper/Stepper";
import React, { useState } from "react";
import NavigationItems from '../Navigation/NavigationItems/navigationItems';
import AddAssets from '../Forms/AddAssets/addAssets';
import AddNewAdvertiser from '../Forms/AddNewAdvertiser/addNewAdvertiser';
import AddNewOrder from '../Forms/AddNewOrder/addNewOrder';

const Order = () => {

  const [currentStep, setCurrentStep] = useState(1)
  const [advertiserData, setAdvertiserData] = useState({
    data: {
      companyName: { value: '', touched: false, valid: false },
      companyWebsiteAddress: { value: '', touched: false, valid: false },
      industryCategory: { value: null, touched: false, valid: false },
      firstName: { value: '', touched: false, valid: false },
      lastName: { value: '', touched: false, valid: false },
      email: { value: '', touched: false, valid: false },
      phone: { value: '', touched: false, valid: false },
      address: { value: '', touched: false, valid: false },
      addressLine2: { value: '', touched: false, valid: false },
      city: { value: '', touched: false, valid: false },
      country: { value: null, touched: false, valid: false },
      state: { value: null, touched: false, valid: false },
      postal: { value: '', touched: false, valid: false },
    },
    secondaryContact: {
      firstName: { value: '', touched: false, valid: false },
      lastName: { value: '', touched: false, valid: false },
      email: { value: '', touched: false, valid: false },
      phone: { value: '', touched: false, valid: false },
    },
    secondaryBilling: {
      address: { value: '', touched: false, valid: false },
      addressLine2: { value: '', touched: false, valid: false },
      city: { value: '', touched: false, valid: false },
      country: { value: null, touched: false, valid: false },
      state: { value: null, touched: false, valid: false },
      postal: { value: '', touched: false, valid: false },
    },
    validated: false,
    secondaryContactCheck: false,
    secondaryBillingAddressCheck: false,
    isCountry:false,
    secIsCountry:false
  })
  
  const [orderData, setOrderData] = useState({
    data: {
      advertiser: { value: null, touched: false, valid: false },
      title: { value: '', touched: false, valid: false },
      prefferedLandingPageUrl: { value: '', touched: false, valid: false },
      price: { value: '', touched: false, valid: false },
      description: { value: '', touched: false, valid: false },
      targetMarket: { value: null, touched: false, valid: false },
      budget: { value: '', touched: false, valid: false },
    },

    validated: false,
  })

  const [assets, setAssets] = useState({
    data: {
      scriptFile: { value: [], touched: false, valid: false },
      voiceFile: { value: [], touched: false, valid: false },
      advertiserAssets: { value: [], touched: true, valid: true },
    },
    validated: false
  })


  const nextHandleClick = () => {
    setCurrentStep(currentStep + 1)
  }

  const previousHandleClick = () => {
    setCurrentStep(currentStep - 1)
  }

  let form
  if (currentStep === 1) {
    form = <AddNewAdvertiser next={nextHandleClick} advertiserData={advertiserData} setAdvertiserData={setAdvertiserData} />
  }
  else if (currentStep === 2) {
    form = <AddNewOrder next={nextHandleClick} previous={previousHandleClick} orderData={orderData} setOrderData={setOrderData} />
  }
  else if (currentStep === 3) {
    form = <AddAssets previous={previousHandleClick} assets={assets} setAssets={setAssets} />
  }

  return (
    <div className='orderBackground'>
      <NavigationItems />
      <div className="stepper">
        <Stepper
          currentStepNumber={currentStep - 1}
          steps={stepsArray}
        />
      </div>
      <div>
        {form}

        {/* <button onClick={() => this.handleClick()}>Previous</button>
            <button onClick={() => this.handleClick("next")}>Next</button> */}
      </div>
    </div>
  );
}

const stepsArray = [
  "Add Advertiser",
  "Add Order",
  "Add Assets",
];

export default Order;








