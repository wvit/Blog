import React from 'react'
import HeadTitle from '../components/public/headTitle'
import ColorPicker from '../components/user/colorPicker'
import '../assets/css/user/user.css'

class User extends React.Component {
    render() {
        return (
            <div className="user-wrap">
                <HeadTitle titleName="我的" />
                <ul className="user-list">
                    <li className="clearfix icon icon-colorPicker">
                        <span >
                            选择主题：
                        </span>
                        <div>
                            <ColorPicker className="ColorPicker" type='BlockPicker' />
                        </div>
                    </li>
                </ul>

            </div >
        )
    }
}

export default User