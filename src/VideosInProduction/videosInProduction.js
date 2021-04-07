import React from 'react'
import { Button, Col, Row } from 'reactstrap'
import NavigationItems from '../Navigation/NavigationItems/navigationItems'
import { PaginationTable } from './Table/table'
import './videosInProduction.css'

function videosInProduction() {
    return (
        <div className='videosInProduction'>
            <NavigationItems />
            <div className='mx-4 videosTable'>
                <div className='row my-3'>
                    <div className='col-md-4'>
                        <Button className='filterButton'><i class="fa fa-filter mr-2"></i>Search Filters</Button>
                    </div>
                    <div className='col-md-4  text-center'>
                        <span className='videosInProductionTitle' >Videos In Production</span>
                    </div>
                </div>
                <PaginationTable />
            </div>
        </div>
    )
}

export default videosInProduction
