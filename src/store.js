import {
  createStore
} from 'redux';
import {
  localStore,
  axios,
  setMainColor
} from './utils';

//主题颜色
function mainColor(mainColor, {
  color
}) {
  mainColor = color || localStore.get('mainColor') || 'red';
  localStore.set('mainColor', mainColor);
  setMainColor(mainColor);
  return mainColor
}
const mainColorStore = createStore(mainColor);

//标签分类
function tags(tags = {
  tag: [],
  type: []
}, {
  type,
  data
}) {
  if (type === 'tag') tags.tag = data;
  if (type === 'type') tags.type = data;
  return tags
}
const tagStore = createStore(tags);
//获取标签
getTag(1, 'tag');
//获取分类
getTag(2, 'type');
//获取标签分类
function getTag(status, type) {
  axios.get(`/app/getTags?status=${status}`).then(res => {
    if (res.data.code !== 0) return;
    res.data.data.forEach(item => {
      item.checked = false;
    })
    tagStore.dispatch({
      type,
      data: res.data.data
    });
  })
}

export {
  mainColorStore,
  tagStore
}