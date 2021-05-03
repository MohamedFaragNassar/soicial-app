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
        <div className="h-screen bg-white">
            <div className="w-full bg-white text-left pl-4 font-bold text-xl border-b py-4 " >Settings</div>
            <div className=" setting flex flex-col items-start bg-white " style={{width:68+"%"}}>
                <Link to="/settings/account" className="px-2 py-4 font-medium text-sm md:font-semibold md:text-lg border-b w-full text-left flex justify-between items-start" >
                   <span> Account Information</span>
                    <i class="fas fa-chevron-right"></i>
                </Link>
                <Link to="/settings/password" className="px-2 py-4 font-medium text-sm md:font-semibold md:text-lg border-b w-full text-left flex justify-between items-start" >
                    <span>Change Password</span>
                    <i class="fas fa-chevron-right"></i>
                </Link>
                <Link to="/settings/privacy" className="px-2 py-4 font-medium text-sm md:font-semibold md:text-lg border-b w-full text-left flex justify-between items-start" >
                    <span>Privacy</span>
                    <i class="fas fa-chevron-right"></i>
                </Link>
            </div>
            <div className="fixed w-2/5 h-screen bg-white border z-50" style={{right:7.5+"%",top:63+"px"}}>
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
