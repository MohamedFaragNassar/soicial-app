import React from 'react'
import { Link, Route } from 'react-router-dom'
import AccountInformation from './AccountInformation'
import BlockedAccounts from './BlockedAccounts'
import ChangePassword from './ChangePassword'
import EditUserName from './EditUserName'
import Privacy from './Privacy'
import EditEmail from './EditEmail'
import EditCountry from './EditCountry'
import EditGender from './EditGender'

const Setting = () => {
    return (
        <div className="h-screen bg-white flex flex-col border-l">
            <div className="w-full bg-white text-left pl-4 font-bold text-xl border-b py-4  " >Settings</div>
            <div className=" setting flex w-full  items-start justify-around bg-white border-b ">
                <Link to="/settings/account" className="w-1/3 py-4 font-medium text-sm md:font-medium md:text-lg 
                border-b text-center flex justify-center items-center" >
                   <span> Account Information</span>
                    {window.location.width > 768 &&<i class="fas fa-chevron-right"></i>}
                </Link>
                <Link to="/settings/password" className=" py-4 font-medium text-sm md:font-medium 
                md:text-lg  w-1/4 text-center flex justify-center items-center" >
                    <span>Change Password</span>
                    {window.location.width > 768 &&<i class="fas fa-chevron-right"></i>}
                </Link>
                <Link to="/settings/privacy" className=" py-4 font-medium text-sm md:font-medium 
                md:text-lg  w-1/4 text-center flex justify-center items-center" >
                    <span>Privacy</span>
                    {window.location.width > 768 &&<i class="fas fa-chevron-right"></i>}
                </Link>
            </div>
            <div className=" w-full mt-2 h-screen bg-white  z-50" >
                    <Route path="/settings/account" component={AccountInformation} />
                    <Route path="/settings/password" component={ChangePassword} />
                    <Route path="/settings/privacy" component={Privacy} />
                    <Route path="/settings/blocks" component={BlockedAccounts} />
                    <Route path="/settings/username" component={EditUserName} />
                    <Route path="/settings/email" component={EditEmail} />
                    <Route path="/settings/country" component={EditCountry} />
                    <Route path="/settings/gender" component={EditGender} />
            </div>
        </div>
    )
}

export default Setting
