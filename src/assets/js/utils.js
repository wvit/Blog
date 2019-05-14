export default {
  //判断字符串为空
  judgeNull(string) {
    for (let item of string.split('')) {
      if (item !== " ") {
        return true;
      }
    }
  },
  //判断是否为qq号码
  judgeQQ(string) {
    const qqReg = /^[1-9][0-9]{4,9}$/gim;
    if (qqReg.test(string)) {
      return true;
    }
  },
  //判断是否为电话号码
  judgePhoneNumber(string) {
    const phoneNumberReg = /^1(3|4|5|7|8|9)\d{9}$/;
    if (phoneNumberReg.test(string)) {
      return true;
    }
  },
  //判断是否为邮箱
  judgeEmail(string) {
    const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (emailReg.test(string)) {
      return true;
    }
  },
  //获取节点
  query(dom) {
    const obj = document.querySelectorAll(dom);
    return obj;
  },
  //绑定事件
  bindEvent(obj, event, callback) {
    obj = obj.length ? obj : Array.prototype.slice.call(obj);
    obj.forEach((item, index) => {
      item.index = index;
      item.addEventListener(event, callback);
    });
  },
  //弹出提示
  showToast({
    text,
    time = 2000,
    data = {},
  }) {
    Array.prototype.slice.call(this.query('.showHint'))
      .forEach(item => {
        item.style.display = "none";
      })

    const p = document.createElement('p');
    p.innerHTML = text;
    p.className = 'showHint';
    p.style.cssText =
      `
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        background:rgba(0,0,0,0.5);
        min-width:60px;
        line-height:34px;
        text-align:center;
        border-radius:5px;
        color:#fff;
        font-size:14px;
        padding:0 30px;
        opacity: 0;
        transition:0.4s;
        -webkit-user-select: none;
        user-select: none;
        z-index:999999;
        `;
    this.query('body')[0].appendChild(p);
    return new Promise(resolve => {
      setTimeout(resolve, 20);
    }).then(() => {
      p.style.cssText += `opacity: 1;`;
      return new Promise(resolve => {
        setTimeout(resolve, time);
      })
    }).then(() => {
      p.style.cssText += `opacity: 0;`;
      return new Promise(resolve => {
        setTimeout(resolve, 400);
      })
    }).then(() => {
      this.query('body')[0].removeChild(p);
      return new Promise(resolve => {
        resolve(data);
      })
    })
  },
  //上传文件
  upload(config) {
    let formData = new FormData();
    for (let key in config.data) {
      formData.append(key, config.data[key]);
    }
    return config.proto.$axios
      .post(config.url, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
  },
  //判断未登录跳转页面
  toSignIn(vm) {
    vm.$axios.get('/ucenter/getAuth').then(res => {
      if (res.data.code === 100013) {
        this.showToast({
          text: "您还未登录，正在为您跳转..."
        }).then(() => {
          vm.$router.replace("/account/signIn");
        })
      }
    })
  },
  //时间戳转日期
  getDate(time, onOff) {
    function judge(number) {
      return date[number]() < 10 ? `0${date[number]()}` : date[number]();
    }
    const date = new Date(time);
    const month = Number(judge('getMonth')) + 1;
    const transfromDate1 = `${judge('getFullYear')}-${month < 10 ? `0${month}` : month}-${judge('getDate')}`;
    const transfromDate2 = `${transfromDate1} ${judge('getHours')}:${judge('getMinutes')}:${judge('getSeconds')}`;
    return onOff ? transfromDate2 : transfromDate1;

  },
  //距离某天的剩余时间
  getTimeRemaining(time) {
    const dayTime = 1000 * 60 * 60 * 24;
    const day = Math.floor(time / dayTime);
    const hour = ((time - day * dayTime) / 1000 / 60 / 60).toFixed(0);
    return `${day} 天 ${hour} 小时`;
  },
  //等待加载动画
  loadingMove({
    color,
    size,
    width,
    speed,
    timeout
  }) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    const gradual = ctx.createLinearGradient(0, size, size, size);
    let rotate = 0;
    canvas.width = canvas.height = size;
    canvas.style.cssText = `  
                position: fixed;
                left: 50%;
                top: 45%;
                transform: translateX(-50%);
                z-index: 99999;
                `
    gradual.addColorStop("0", color[0]);
    gradual.addColorStop("0.5", color[1]);
    ctx.strokeStyle = gradual;
    ctx.lineWidth = width;
    ctx.arc(size / 2, size / 2, size / 2 - width, 0, Math.PI * 2);
    ctx.stroke();
    canvas.className = 'loadingDom';
    this.query('body')[0].appendChild(canvas);
    let timeoutTimer = setTimeout(() => {
      if (this.query('.loadingDom').length > 0) {
        clearInterval(timer)
        this.query('body')[0].removeChild(this.query('.loadingDom')[0]);
        this.showToast({
          text: '请求响应超时，请刷新'
        })
      }
    }, timeout);
    let timer = setInterval(() => {
      rotate += 10;
      canvas.style.transform = `translateX(-50%) rotate(${rotate}deg)`;
      if (this.query('.loadingDom').length === 0) {
        clearInterval(timer);
        clearTimeout(timeoutTimer);
      }
    }, speed);
  },
  //设置背景主题
  setMainColor(color) {
    const style = document.createElement('style');
    style.innerHTML = `
        .mainStyleOff{
            background:${color} !important;
            color:#fff !important;
        }
        .mainStyleOn{
            background:#fff !important;
            color:${color} !important;
        }
        .mainBgColor{
            background:${color} !important;
        }
   `
    this.query('head')[0].appendChild(style);
  },
  //设置字体颜色
  setFontColor(color) {
    const style = document.createElement('style');
    style.innerHTML = `
        .mainFontColor{
            color:${color};
        }
   `
    this.query('head')[0].appendChild(style);
  },
  //全局map对象
  map: new Map(),
  //设置session缓存
  sessionStore: {
    set(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
      try {
        return JSON.parse(sessionStorage.getItem(key));
      } catch (err) {}
    },
    clear() {
      sessionStorage.clear();
    },
    remove(key) {
      sessionStorage.removeItem(key);
    }
  },
  localStore: {
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (err) {}
    },
    clear() {
      localStorage.clear();
    },
    remove(key) {
      localStorage.removeItem(key);
    }
  }
}