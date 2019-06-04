<template>
  <div>
    <el-row>
      <el-col>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="route">
          <el-menu-item index="/cashierdesk/cashier">我的工作台</el-menu-item>
          <el-submenu index="/managementcenter">
            <template slot="title">管理中心</template>
            <el-menu-item index="/managementcenter/order">订单管理</el-menu-item>
            <el-menu-item index="/managementcenter/market">店铺管理</el-menu-item>
            <el-menu-item index="/managementcenter/report">报表管理</el-menu-item>
            <el-menu-item index="/managementcenter/site">站点管理</el-menu-item>
            <!-- <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu> -->
          </el-submenu>
          <el-submenu id="user" index=3>
            <template slot="title">{{userName}}</template>
            <el-menu-item index="/message">消息中心</el-menu-item>
            <el-menu-item index="/3-2"><a href="javascript:;" @click="logout" class="logOut">[退出]</a></el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        activeIndex2: '1',
        userName: 'jsepos',
        route: true,
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logout() {
        console.log('logout')
      }
    }
  }
</script>

<style>
  #user {
    float: right;
    padding-right: 20px
  }

</style>

