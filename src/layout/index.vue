<template>
  <div id="home">
    <el-container>
      <!-- header -->
      <el-header style="height:64px">
        <div class="head-box clearfix">
          <div class="logo-icon">
            <img src="../assets/icons/logo.png"
                 alt="logo" />
            <h3>智能数据管理平台</h3>
          </div>
          <div class="collapse-box"
               @click.prevent="collapseOff">
            <i></i>
          </div>
          <div class="user-content">
            <div class="user-head">
              <img src="../assets/imgs/userhead.jpg"
                   alt="" />
            </div>
            <div class="user-info">
              <el-dropdown trigger="click"
                           @command="userCenter">
                <span class="el-dropdown-link">
                  莫西子诗<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item divided
                                    command="loginout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-header>
      <!-- contant -->
      <el-container>
        <!-- menu begin -->
        <el-scrollbar>
          <el-menu :default-active="onRouter"
                   :default-openeds="[openIndex]"
                   class="el-menu-vertical-demo"
                   :collapse="isCollapse"
                   text-color="#000000"
                   unique-opened
                   active-text-color="#4D5AAF">
            <template v-for="(menu, index) in menuLists">
              <template v-if="menu.twoSubs">
                <el-submenu :index="menu.index"
                            :key="index">
                  <template slot="title">
                    <i :class="menu.icon"></i>
                    <span slot="title">{{ menu.title }}</span>
                  </template>
                  <el-menu-item v-for="(tmenu, index) in menu.twoSubs"
                                :key="index"
                                :index="tmenu.index"
                                @click="() => $router.push(tmenu.itemUrl)"><span>{{ tmenu.title }}</span></el-menu-item>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item :index="menu.index"
                              :key="index"
                              @click="() => $router.push(menu.itemUrl)">
                  <i :class="menu.icon"></i>
                  <span slot="title">{{ menu.title }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </el-scrollbar>
        <!-- menu end -->
        <!-- main contant begin -->
        <!-- :style="'width:'+widthSet+'px'" -->
        <el-main :style="'width:' + widthSet + 'px'"
                 id="scrollView">
          <el-breadcrumb separator="/"
                         v-show="levelOff">
            <el-breadcrumb-item :to="item.path"
                                v-for="(item, index) in levelList"
                                :key="index">{{ item.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="main-content">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </el-main>
        <!-- main contant end -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import { eventBus } from "../utils/eventBus.js"
export default {
  data () {
    return {
      isCollapse: false,
      menuLists: [
        {
          icon: 'menu-icon-home',
          index: 'dashboard',
          itemUrl: 'dashboard',
          title: '首页'
        },
        {
          icon: 'menu-icon-user',
          index: 'userManage',
          itemUrl: '',
          title: '权限管理',
          twoSubs: [
            {
              icon: '',
              index: 'users',
              itemUrl: 'users',
              title: '用户管理'
            },
            {
              icon: '',
              index: 'role',
              itemUrl: 'role',
              title: '角色管理'
            }
          ]
        },
        {
          icon: 'menu-icon-home',
          index: 'person',
          itemUrl: 'person',
          title: '个人中心'
        }
      ],
      levelList: '', // 面包屑
      levelOff: true,
      screenWidth: '',
      widthSet: ''
    }
  },
  computed: {
    onRouter () {
      return this.$route.name
    },
    openIndex () {
      return this.$route.meta.keys
    }
  },
  created () {
    this.getBreadcrumb()
    this.checkOutPath()
    // console.log("面包屑", this.levelList)123
    if (!this.$store.getters.getUserToken) {
      // 路由切换监听是否登录
      this.$router.push('/login')
    }
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        this.screenWidth = window.screenWidth
      })()
    }
    this.screenWidth = document.body.clientWidth
  },
  watch: {
    $route () {
      this.getBreadcrumb()
      this.checkOutPath()
      // console.log(this.$store.getters.getUserToken);
      if (!this.$store.getters.getUserToken) {
        // 路由切换监听是否登录
        this.$router.push('/login')
      }
      document.getElementById('scrollView').scrollTop = 0
    },
    screenWidth (val) {
      let that = this
      that.screenWidth = val
      that.isCollapse
        ? (that.widthSet = that.screenWidth - 64)
        : (that.widthSet = that.screenWidth - 220)
    },
    isCollapse () {
      let that = this
      that.isCollapse
        ? (that.widthSet = that.screenWidth - 64)
        : (that.widthSet = that.screenWidth - 220)
    }
  },
  methods: {
    // 菜单收缩
    collapseOff () {
      this.isCollapse = !this.isCollapse
      // eventBus.$emit("cooll", this.isCollapse)
    },
    getBreadcrumb () {
      // 面包屑路径跟踪
      let matched = this.$route.matched.filter(item => item.name)
      matched.splice(0, 1)
      // const first = matched[0]
      // if (first && first.name.trim().toLocaleLowerCase() !== "home".toLocaleLowerCase() && first.name.trim().toLocaleLowerCase() !== "permission".toLocaleLowerCase()) {
      //   matched = [{ path: "", meta: { title: first.meta.parentTitle } }].concat(matched)
      // }
      this.levelList = matched
      // console.log(this.levelList)
    },
    checkOutPath () {
      // 当前路径检测
      let path = this.levelList[this.levelList.length - 1].path
      if (path !== '/home') {
        this.levelOff = true
      } else {
        this.levelOff = false
      }
    },
    userCenter (comm) {
      // 用户中心事件
      if (comm === 'loginout') {
        this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.$store.commit('removeUserToken', 'userToken') // 删除store中的token
            // console.log("123123", this.$store.getters.getUserToken);
            this.Cookies.remove('userToken')
            this.$router.push('/login')
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出登录'
            })
          })
        // console.log("88888", this.$store.getters.getUserToken);
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // 头部 开始
  .el-header {
    background-color: #4d5aaf;
    height: 64px;
    padding: 0;
    .head-box {
      width: 100%;
      height: 100%;
      .logo-icon {
        float: left;
        width: 220px;
        height: 100%;
        color: #fff;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px;
        img {
          width: 24px;
          height: 24px;
        }
        h3 {
          font-size: 18px;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          margin-left: 10px;
        }
      }
      .collapse-box {
        float: left;
        width: 30px;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        i {
          display: block;
          width: 25px;
          height: 25px;
          background: url("../assets/icons/colls.png") no-repeat center center;
          background-size: 25px 25px;
        }
      }
      .user-content {
        float: right;
        width: auto;
        height: 100%;
        padding-right: 30px;
        box-sizing: border-box;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-end;
        align-items: center;
        .user-head {
          width: 36px;
          height: 36px;
          border-radius: 100%;
          overflow: hidden;
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          img {
            display: block;
            width: 36px;
            height: 36px;
          }
        }
        .user-info {
          .el-dropdown-link {
            cursor: pointer;
            color: #c6c3ec;
            outline: none;
          }
          .el-icon-arrow-down {
            font-size: 14px;
            font-weight: 600;
          }
          .el-dropdown {
            outline: none;
          }
        }
      }
    }
  }
  // 头部 结束
  // 菜单
  .el-scrollbar {
    overflow: hidden;
    height: 103%;
    border-right: solid 1px #e6e6e6;
  }
  .el-scrollbar__wrap {
    overflow: scroll;
    overflow-x: auto;
    height: 100%;
  }

  .el-menu::-webkit-scrollbar {
    display: none;
  }
  .el-menu {
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    -ms-overflow-style: none; //IE 10+
    overflow: -moz-scrollbars-none; //Firefox
    padding-bottom: 50px;
    border-right: none;
    .el-menu-item [class^="menu-icon-"],
    .el-submenu [class^="menu-icon-"] {
      display: inline-block;
      width: 20px;
      height: 46px;
      // line-height: 16px;
      margin-right: 5px;
    }
    .menu-icon-home {
      background: url("../assets/icons/menus/home.png") no-repeat center center;
      background-size: 20px 20px;
    }
    .el-menu-item.is-active .menu-icon-home {
      background: url("../assets/icons/menus/home0.png") no-repeat center center;
      background-size: 20px 20px;
    }
    .menu-icon-ach {
      background: url("../assets/icons/menus/ach.png") no-repeat center center;
      background-size: 16px 16px;
    }
    .el-menu-item.is-active .menu-icon-ach {
      background: url("../assets/icons/menus/ach0.png") no-repeat center center;
      background-size: 20px 20px;
    }
    .menu-icon-user {
      background: url("../assets/icons/menus/user.png") no-repeat center center;
      background-size: 20px 20px;
    }
    .el-menu-item.is-active .menu-icon-user {
      background: url("../assets/icons/menus/user0.png") no-repeat center center;
      background-size: 20px 20px;
    }
    .menu-icon-org {
      background: url("../assets/icons/menus/org.png") no-repeat center center;
      background-size: 20px 20px;
    }
    .el-menu-item.is-active .menu-icon-org {
      background: url("../assets/icons/menus/org0.png") no-repeat center center;
      background-size: 20px 20px;
    }
    .menu-icon-ser {
      background: url("../assets/icons/menus/ser.png") no-repeat center center;
      background-size: 20px 20px;
    }
    .menu-icon-apply {
      background: url("../assets/icons/menus/apply.png") no-repeat center center;
      background-size: 20px 20px;
    }
    .menu-icon-datas {
      background: url("../assets/icons/menus/datas.png") no-repeat center center;
      background-size: 20px 20px;
    }
    .menu-icon-help {
      background: url("../assets/icons/menus/help.png") no-repeat center center;
      background-size: 20px 20px;
    }
    .el-menu-item.is-active .menu-icon-help {
      background: url("../assets/icons/menus/help0.png") no-repeat center center;
      background-size: 20px 20px;
    }

    .el-menu-item.is-active {
      background: #f6f7fb !important;
      border-right: 4px solid #4d5aaf;
    }
    .el-submenu {
      margin-top: 20px;
    }
    .el-submenu .el-menu-item {
      padding: 0 30px 0 60px !important;
      margin-top: 10px;
    }
    .el-menu-item {
      // width: 100%;
      height: 46px;
      line-height: 46px;
      margin-top: 15px;
      display: flex;
      display: -webkit-flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 0;
      user-select: none;
      span {
        font-size: 14px;
      }
    }
  }

  .el-container {
    width: 100%;
    height: 100%;
    .el-main {
      width: 100%;
      height: 100%;
      background-color: #f6f7fb;
      color: #333;
      text-align: center;
      padding: 15px;
      box-sizing: border-box;
      .el-breadcrumb {
        width: 100%;
        font-size: 16px;
        padding: 10px 0 20px;
        font-family: PingFang-SC-Bold;
        font-weight: 500;
        color: #2d2d2d;
        box-sizing: border-box;
      }
      .main-content {
        width: 100%;
        overflow: hidden;
      }
    }
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  // min-height: 400px;
  font-size: 14px;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  line-height: 20px;
}
</style>
