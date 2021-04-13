import * as network from './Network';

// user
export const login = (data) => network.publicPost('/pub/login',data)
export const changePassword = (data) => network.post('/api/person/changePassword',data)

// upload files
export const uploadFile = (data) => network.post('/api/campaign/upload',data, true)

// getperson
export const getPersonById = (id) => network.get(`/api/person/get/${id}?`) 

// createClient
export const createClient = (data) => network.post('/api/company/client',data)

// selectDropdown
export const getCountries = () => network.publicGet('/pub/country/')
export const getIndustries = () => network.get('/api/wholesalepricing/getIndustries')
export const getStates = (country) => network.publicGet(`/pub/states/${country}`)
export const getMarkets = () => network.get('/api/wholesalepricing/getMarkets')
export const getClients = () => network.get('/api/company/clients')

// createCampaign
export const createCampaign = (data) => network.post('/api/campaign/',data)

// getAllCampaign
export const getAllCampaign = () => network.post('/api/campaign/getAllcampaigns/')

// campaignDetailByID
export const getCampaignByID = (id) => network.get(`/api/campaign/${id}`)