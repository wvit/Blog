import React from 'react'
import { Title } from 'moha-ui'
import echarts from 'echarts/lib/echarts'
import { mainColorStore } from '../../store'
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/tree';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/radar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import '../../assets/css/user/skill.css';

class Skill extends React.Component {
  render() {
    return (
      <div>
        <Title titleName="技能查看" className="mainBgColor" />
        <div className="body skill-wrap">
          <div className="skill-echarts1 echarts"></div>
          <div className="skill-echarts2 echarts"></div>
          <div className="skill-echarts3 echarts"></div>
          <div className="skill-echarts4 echarts"></div>
        </div>
      </div>
    )
  }
  //渲染完成
  componentDidMount() {
    this.workSkill();
    this.allSkill();
    this.learnSkill();
    this.otherSkill();
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
        data: ['Vue', '微信小程序', 'ES6', 'Nodejs', 'React']
      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            color: mainColorStore.getState()
          },
          data: [3, 3, 3, 2, 1]
        }
      ]
    };
    myChart.setOption(option);
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
        { name: 'webpack' },
        { name: 'canvas' },
        { name: 'git' },
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
          left: '12%',
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
  //学习意向
  learnSkill() {
    const myChart = echarts.init(document.querySelector('.skill-echarts3'));
    const option = {
      title: {
        text: '最新主要学习意向'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Typescript', 'React / RN', 'Nodejs', 'Electron'],
        top: '12%',
        padding: 5,
        itemGap: 15
      },
      grid: {
        top: '33%',
        left: '3%',
        right: '3%',
        bottom: '0%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          show: false
        },
        data: ['18年6月', '18年9月', '18年12月', '19年3月', '19年6月', '未来']
      },
      yAxis: {
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
      },
      series: [
        {
          name: 'Typescript',
          type: 'line',
          data: [4, 3, 4, 7, 8, 10]
        },
        {
          name: 'React / RN',
          type: 'line',
          data: [3, 2, 3, 5, 7, 7]
        },
        {
          name: 'Nodejs',
          type: 'line',
          data: [6, 6, 7, 8, 9, 9]
        },
        {
          name: 'Electron',
          type: 'line',
          data: [2, 2, 3, 4, 5, 5]
        }
      ]
    };
    myChart.setOption(option);
  }
  //其他技能
  otherSkill() {
    const myChart = echarts.init(document.querySelector('.skill-echarts4'));
    const option = {
      title: {
        text: '其他兴趣',
        y: '5%'
      },
      tooltip: {
        trigger: 'axis',
      },
      radar: [
        {
          indicator: [
            { text: 'MO法', max: 10 },
            { text: '游戏', max: 10 },
            { text: '武侠', max: 10 },
            { text: '象棋/围棋', max: 10 },
            { text: '学习', max: 10 },
            { text: '乒乓球', max: 10 }
          ],
          center: ['50%', '60%'],
          radius: 100
        },
      ],
      series: {
        type: 'radar',
        tooltip: {
          trigger: 'item'
        },
        itemStyle: {
          color: mainColorStore.getState()
        },
        lineStyle: {
          color: mainColorStore.getState()
        },
        areaStyle: {
          color: mainColorStore.getState(),
          opacity: 0.4
        },
        data: [
          {
            value: [10, 4, 6, 3, 8, 5],
            name: '兴趣一览'
          }
        ]
      },
    };
    myChart.setOption(option);
  }
}

export default Skill