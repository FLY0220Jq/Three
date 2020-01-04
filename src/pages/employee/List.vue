<template>
    <div>        
        <!----按钮--->               
           <el-button type="primary" size="small" @click="toAddHandle">添加</el-button>         
           <el-button type="danger" size="small">批量删除</el-button>      
        <!----/按钮--->  

        <!----表格--->               
        <el-table :data="employees">
            <el-table-column fixed="left" prop="id" label="编号"></el-table-column>
            <el-table-column fixed="left" prop="realname" label="姓名"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="telephone" label="联系方式"></el-table-column>
            <el-table-column prop="idCard" label="身份证号"></el-table-column>
            <el-table-column prop="bankCard" label="银行卡号"></el-table-column>
            <el-table-column fixed="right" label="操作">
            <template v-slot="slot">
                <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                <a href="" @click.prevent="toupdataHandler(slot.row)">修改</a>

                </template>
            </el-table-column>

        </el-table>    
        <!----/表格--->               
        <!----分页--->      
        <el-pagination     layout="prev, pager, next"     :total="50">   </el-pagination>
        <!----/分页--->                   
        <!----模态框--->   
        <el-dialog :title="title" :visible.sync="visiable" width="60%" >
            <el-form :model="form" label-width="80px"> 
                
                <el-form-item label="员工名">
                    <el-input v-model="form.uesrname"></el-input>
                </el-form-item>

                <el-form-item label="密码">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>

                <el-form-item label="姓名">
                    <el-input v-model="form.realname"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                    <el-radio-group v-model="form.gender">   
                          <el-radio label="男">男</el-radio>     
                          <el-radio label="女">女</el-radio>     
                          </el-radio-group>
                </el-form-item>

                <el-form-item label="手机号">
                    <el-input  v-model="form.telephone"></el-input>
                </el-form-item>

                <el-form-item label="身份证号">
                    <el-input  v-model="form.idCard"></el-input>
                </el-form-item>

                <el-form-item label="银行卡号">
                    <el-input  v-model="form.bankCard"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button  size="small"  @click="closeModalHandler">取 消</el-button>
                <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
            </span>
        </el-dialog>              
        <!----/模态框--->               

    </div>

</template>



<script>

import request from '@/utils/request'
import querystring from 'querystring'
export default {                 
    data(){
        return {
            title:"录入员工信息",
            visiable:false,
            employees:[],
            //form用于接收数据
            form:{
                type:"waiter"
            }
        }
    },
    created(){
         //在页面加载出来的时候加载数据
        this.loadData();
    },
    methods:{
        submitHandler(){
             let url = "http://localhost:6677/waiter/saveOrUpdate"
             //前台向后台发送请求，完成数据的保存操作
            request({
                url,
                method:"POST",
            //告诉给后台我的请求体中放的是查询字符串
                headers:{
                   "Content-Type":"application/x-www-form-urlencoded"
                },
                //请求体中的数据，将this.form转换为查询字符串发送给后台
                data: querystring.stringify(this.form)

            }).then((response)=>{
                //模态框关闭
                this.closeModalHandler();
                //提示消息
                this.loadData();
                this.$message({
                    type:"success",
                    message:response.message
                })
            })
        },
        //重载员工数据
        loadData(){
            let url = "http://localhost:6677/waiter/findAll"
            request.get(url).then((response)=>{
                //将查询结果设置到employees中,箭头函数this指向外部函数的this
            this.employees = response.data;
            })
        },
        toupdataHandler(row){
             this.form=row;
            this.title="修改员工信息";
            this.visiable=true;
        },

        toDeleteHandler(id){
        
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url="http://localhost:6677/waiter/deleteById?id="+id;
      request.get(url).then((response)=>{
        // 刷新数据
        this.loadData();
        // 提示结果
         this.$message({
          type: 'success',
          message: response.message
        });
      })
      }
      );
    },
        toAddHandle(){
            this.title="录入员工信息",
             this.form={
        type:"employee"
      }
            this.visiable=true;
},
       closeModalHandler(){
    this.visiable=false;
        }
    }

}
</script>



<style scoped>                  

</style>