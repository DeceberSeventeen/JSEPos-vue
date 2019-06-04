<template>
  <div id="cashierdesk_cashier" style="margin: 20px">
    <el-row>
      <el-col style="width: 70%">
        <el-table
          :data="tableData"
          border
          height=600
          :summary-method="getSummaries"
          show-summary
          style="width:100%;"
          :row-class-name="tableRowClassName"
          type="expand">

          <el-table-column
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            align="center"
            prop="good_id"
            label="货号"
            width="130">
          </el-table-column>
          <el-table-column
            align="center"
            prop="barcode"
            label="条形码"
            width="200">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="商品名"
            width="200">
          </el-table-column>
          <el-table-column
            align="center"
            prop="number"
            label="数量"
            width="100">
          </el-table-column>

          <el-table-column
            align="center"
            prop="price"
            label="单价（元"
            width=100>
          </el-table-column>
          <el-table-column
            align="center"
            prop="total_price"
            label="总价（元）"
            width=100>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleClickAdd(scope.$index, scope.row)">加</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleClickMinus(scope.$index, scope.row)">减</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleClickDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-col>
      <el-col style="width: 30%">
        <!-- <el-button style="margin-top: 20px" @click="handleInputPull(1)">默认按钮</el-button> -->
        <el-input
          style="width: 350px"
          placeholder="请输入条形码"
          v-model="input_barcode"
          @change="handleInputPull"
          clearable>
        </el-input>
        <el-table
          :data="top_data"
          height=550
          style="margin-left: 30px">
          <el-table-column
          type="index">
          </el-table-column>
          <el-table-column
            label="Sale Top20"
            prop="name">
          </el-table-column>

        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import {get_goods_for_barcode} from '../../service/index'

export default {
  data() {
    return {
      tableData: [],
      input_barcode: "",
      restaurants: [],
      top_data:[
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
        {"name": "芬达"},
      ],
    }
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        // console.log(index)
        // console.log(column)
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        // index 不等于4或不等于5
        if (index != 6 && index != 4) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        // console.log(values)
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          // console.log(sums[index])
          // index x不等于4的加单位  元
          if (index === 6) {
            sums[index] += ' 元'
          }
        } else {
          sums[index] = ''
        }
      })
      // console.log(sums)
      return sums
    },

    handleClickDelete(index, data) {
      console.log('handleClickDelete')
      this.tableData.splice(index, 1)
      console.log(this.tableData)
    },
    handleClickAdd(index, data) {
      console.log('handleClickAdd')
      // console.log(index)
      // console.log(data)
      this.tableData[index].number +=1
      this.tableData[index].total_price = this.tableData[index].price * this.tableData[index].number
    },
    handleClickMinus(index, data) {
      console.log('handleClickMinus')
      this.tableData[index].number -=1
      this.tableData[index].total_price = this.tableData[index].price * this.tableData[index].number
    },
    handleInputPull() {
      console.log('handleInputPull')
      let barcode = Number(this.input_barcode)
      if (isNaN(barcode)) {
        this.input_barcode = ""
        return
      }
      let value = get_goods_for_barcode(barcode)
      // 初始化数量和总价
      value.number = 1
      value.total_price = value.price

      for (var index = 0; index < this.tableData.length; index++) {
        var item = this.tableData[index]
        console.log(item)
        if (value.barcode === item.barcode) {
          this.tableData[index].number += 1
          this.tableData[index].total_price = value.price * this.tableData[index].number
          this.input_barcode = ""
          return
        }
      }
      this.tableData.push(value)
      this.input_barcode = ""
    },
    // 上色
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      }
      return ''
    },
  }
}
</script>


<style>
  #cashierdesk_cashier {
    width: 100%;
    height: 650px;
    /* background: #9009; */
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
