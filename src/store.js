import {
  createStore
} from 'redux';
import util from './utils';

function mainColor(mainColor, {
  color
}) {
  mainColor = color || util.localStore.get('mainColor') || 'red';
  util.localStore.set('mainColor', mainColor);
  util.setMainColor(mainColor);
  return mainColor
}

const mainColorStore = createStore(mainColor);

export {
  mainColorStore
}