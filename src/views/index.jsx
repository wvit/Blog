import React from 'react'
import HeadTitle from '../components/public/headTitle'
import { ColorPicker } from 'moha-ui'

class Index extends React.Component {
    render () {
        return (
            <div>
                <HeadTitle titleName="首页" />
                <ColorPicker className="ColorPicker" type='BlockPicker' />
            </div>
        )
    }
}

export default Index