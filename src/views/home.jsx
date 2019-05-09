import React from 'react'
import Tabber from '../components/public/tabber'

class Home extends React.Component {
    render () {
        const tabberConfig = [
            { name: '首页', route: '/index' },
            { name: '发现', route: '/find' },
            { name: '我的', route: '/user' }
        ]
        return (
            <div>
                <Tabber tabberConfig={tabberConfig} />
            </div>
        )
    }
}

export default Home