import React from 'react'
import { SketchPicker, AlphaPicker, BlockPicker, ChromePicker, CirclePicker, GithubPicker, HuePicker } from 'react-color-moha'

class ReactColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <div className="body">
          <SketchPicker />
          <div style={{ border: '2px solid red', margin: '30px auto' }}></div>
          <AlphaPicker color='red' />
          <div style={{ border: '2px solid red', margin: '30px auto' }}></div>
          <BlockPicker />
          <div style={{ border: '2px solid red', margin: '30px auto' }}></div>
          <ChromePicker />
          <div style={{ border: '2px solid red', margin: '30px auto' }}></div>
          <CirclePicker />
          <div style={{ border: '2px solid red', margin: '30px auto' }}></div>
          <GithubPicker />
          <div style={{ border: '2px solid red', margin: '30px auto' }}></div>
          <HuePicker />
          <div style={{ border: '2px solid red', margin: '30px auto' }}></div>
          <div style={{ border: '2px solid red', margin: '30px auto' }}></div>
        </div>
      </div>
    )
  }
}

export default ReactColor