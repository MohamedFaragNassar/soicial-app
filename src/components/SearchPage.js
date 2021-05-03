import React from 'react'
import Explor from './Explor'
import GoBack from './GoBack'
import Search from './Search'
import WhoToFollow from './WhoToFollow'

const SearchPage = () => {
    return <>
        <div className="lg:hidden">
            <GoBack title="Search"/>
            <Search type="page"/>
            <Explor/>
            <WhoToFollow/>
        </div>
    </>
}

export default SearchPage
