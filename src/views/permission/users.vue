<template>
  <div class="user-manage">
    <el-form :model="ruleForm"
             :inline="true"
             ref="ruleForm">
      <el-form-item label="账号状态"
                    prop="status">
        <el-select v-model="ruleForm.status"
                   placeholder="请选择评估状态">
          <el-option label="已审核"
                     value="已审核"></el-option>
          <el-option label="未审核"
                     value="未审核"></el-option>
          <el-option label="审核通过"
                     value="审核通过"></el-option>
          <el-option label="审核未通过"
                     value="审核未通过"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名"
                    prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号"
                    prop="phone">
        <el-input v-model="ruleForm.phone"
                  @keyup.enter.native="submitForm('ruleForm')">
        </el-input>
      </el-form-item>
      <el-form-item class="el-btn-sub">
        <el-button @click="submitForm('ruleForm')">查找</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="showModal()">添加用户</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column prop="date"
                       label="日期"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="姓名"
                       width="180">
      </el-table-column>
      <el-table-column prop="address"
                       label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {

  },
  data () {
    return {
      ruleForm: {
        status: '',
        name: '',
        phone: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  watch: {
    'ruleForm.areas': function (val) {
      this.$message('修改了账号状态：' + val)
    },
    'ruleForm.teams': function (val) {
      this.$message('修改了组织：' + val)
    }
  },
  methods: {
    // 搜索
    submitForm (formName) {
      console.log(this.ruleForm)
      this.$message('这是一条消息提示' + JSON.stringify(this.ruleForm))
    },
    // 表单重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    showModal () {
      console.log('showmodal')
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
.user-manage {
  width: 100%;
  padding: 20px 15px;
  box-sizing: border-box;
  background: #fff;
  text-align: left;
}
// 搜索form表单样式
.user-manage /deep/ .el-form-item {
  font-size: 14px;
  font-family: PingFang-SC-Bold;
}
.user-manage /deep/ .el-form-item__label {
  padding-right: 0;
  color: #000;
}
.user-manage /deep/ .el-form .el-input__inner {
  border: none;
  color: #434a52;
}
.user-manage /deep/ .el-form .el-form-item {
  border-bottom: 1px solid #e5e5e5;
}
.user-manage /deep/ .el-form .el-form-item.el-btn-sub {
  border-bottom: none;
}
.user-manage /deep/ .el-form--inline .el-form-item {
  margin-right: 20px;
}
.searchIco {
  font-size: 16px;
  color: #4d5aaf;
}
.user-manage /deep/ .el-form--inline .el-form-item {
  margin-right: 15px;
}
// 搜索form表单样式 end
</style>
