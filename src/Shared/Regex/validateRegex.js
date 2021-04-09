const regex_nonempty = /^(?!\s*$).+$/;
const regex_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regex_phone = /^(\d{3})-(\d{3})-(\d{4})/
const regex_postalUS = /(^\d{5}$)|(^\d{5}-\d{4}$)/
const regex_postalCA = /^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$/

export const regex={
    companyName: regex_nonempty,
    companyWebsiteAddress: regex_nonempty,
    industryCategory: regex_nonempty,
    firstName: regex_nonempty,
    lastName: regex_nonempty,
    email: regex_email,
    phone: regex_phone,
    address: regex_nonempty,
    addressLine2: regex_nonempty,
    city: regex_nonempty,
    country: regex_nonempty,
    state: regex_nonempty,
    postalUS: regex_postalUS,
    postalCA: regex_postalCA,
    advertiser: regex_nonempty,
    title: regex_nonempty,
    prefferedLandingPageUrl: regex_nonempty,
    price: regex_nonempty,
    description: regex_nonempty,
    targetMarket: regex_nonempty,
    budget: regex_nonempty,
}