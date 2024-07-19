<template>
  <do-container>
    <do-aside>
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </do-aside>
    <do-main>
      <!-- <router-view></router-view> -->
      <do-button type="default">默认按钮</do-button>
      <do-button type="primary">主要按钮</do-button>
      <do-button type="success">成功按钮</do-button>
      <do-button type="info">信息按钮</do-button>
      <do-button type="warning">警告按钮</do-button>
      <do-button type="danger">危险按钮</do-button>
    </do-main>
  </do-container>
</template>

<style lang="scss" scoped>
.do-main {
  padding: 14px;
  .do-button {
    margin-right: 14px;
  }
}
</style>
