import React from 'react'
import HeadTitle from '../components/public/headTitle'
import ColorPicker from 'colorPicker'

console.log(ColorPicker)
class Index extends React.Component {
    render() {
        return (
            <div>
                <HeadTitle titleName="首页" />
                {/* <ColorPicker /> */}
            </div>
        )
    }
}

export default Index