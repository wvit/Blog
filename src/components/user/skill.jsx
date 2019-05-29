import React from 'react'
import { Title } from 'moha-ui'
import echarts from 'echarts/lib/echarts'
import { mainColorStore } from '../../store'
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/tree';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import '../../assets/css/user/skill.css';

class Skill extends React.Component {
  render() {
    return (
      <div>
        <Title titleName="技能查看" className="mainBgColor" />
        <div className="body skill-wrap">
          <div className="skill-echarts1 echarts"></div>
          <div className="skill-echarts2 echarts"></div>
        </div>
      </div>
    )
  }
  //渲染完成
  componentDidMount() {
    this.workSkill();
    this.allSkill();
  }
  //所有技能
  allSkill() {
    const myChart = echarts.init(document.querySelector('.skill-echarts2'));
    const data = {
      name: 'WEB',
      children: [
        { name: 'echarts' },
        { name: 'bootstrap' },
        { name: 'element-ui' },
        { name: 'antd' },
        { name: 'mongoDB' },
        { name: 'axios' },
        { name: 'ajax' },
      ]
    }
    const option = {
      title: {
        text: '其他技术',
        subtext: '插件/库/常用包/其他',
        textStyle: {
          fontSize: 16
        },
        y: '3%'
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'tree',
          itemStyle: {
            borderColor: mainColorStore.getState()
          },
          lineStyle: {
            color: mainColorStore.getState()
          },
          data: [data],
          top: '0%',
          bottom: '0%',
          left: '10%',
          right: '30%',
          symbolSize: 12,
          label: {
            normal: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 12
            }
          },
          leaves: {
            label: {
              normal: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            }
          },
          expandAndCollapse: false,
          animationDurationUpdate: 800
        }
      ]
    }
    myChart.setOption(option);
  }
  //工作技能
  workSkill() {
    const myChart = echarts.init(document.querySelector('.skill-echarts1'));
    const option = {
      title: {
        text: '前端主要技能',
        subtext: '评分是根据最擅长相对的',
        textStyle: {
          fontSize: 16
        },
        y: '4%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '0%',
        right: '3%',
        top: '25%',
        bottom: '0%',
        containLabel: true
      },
      xAxis: {},
      yAxis: {
        data: ['Vue', '微信小程序', 'ES6/7/8', 'Nodejs', 'React']
      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            color: mainColorStore.getState()
          },
          data: [10, 10, 10, 6, 4]
        }
      ]
    };
    myChart.setOption(option);
  }
}

export default Skill