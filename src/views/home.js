import React from 'react'
import Tabber from '../components/public/Tabber'
import HeadTitle from '../components/public/HeadTitle'

class Home extends React.Component {
    render() {
        return (
            <div>
                <HeadTitle titleName="首页" />
                <Tabber />
            </div>
        )
    }
}

export default Home