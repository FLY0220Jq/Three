<template>
    <div>   
        <!--按钮 -->                    
        <el-button type="success" size="small" @click="toAddHandle">添加</el-button>         
        <el-button type="danger" size="small">批量删除</el-button>      
        <!--按钮 -->   

        <!--表格-->                    
        <el-table :data="category">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="栏目名称"></el-table-column>
            <el-table-column prop="num" label="序号"></el-table-column>
            <el-table-column prop="parentId" label="父栏目"></el-table-column>
            <el-table-column label="操作">
            <template v-slot="slot">
                <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                <a href="" @click.prevent="toUpdataHandler(slot.row)">修改</a>

            </template>
            </el-table-column>

        </el-table>   
        <!--表格 --> 
        <!--分页 --> 
<el-pagination     layout="prev, pager, next"     :total="50">   </el-pagination>
        <!--分页结束 --> 
        <!--模态框 --> 
                           
<el-dialog :title="title" :visible.sync="visiable" width="60%" >

    <el-form :model="form" label-width="80px">
        <el-form-item label="栏目名称">
            <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="序号">
            <el-input  v-model="form.num"></el-input>
            </el-form-item>

    </el-form>  
    <span></span>
  <span slot="footer" class="dialog-footer">
    <el-button  size="small"  @click="closeModalHandler">取 消</el-button>
    <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
  </span>
</el-dialog>               
        <!--/模态框 --> 

    </div>
</template>

<script>

import request from '@/utils/request'
import querystring from 'querystring'
export default {                 
    data(){
        return {
            title:"添加栏目信息",
            visiable:false,
            category:[],
            //form用于接收数据
            form:{
                type:"category"
            }
        }
    },
    created(){
         //在页面加载出来的时候加载数据
        this.loadData();
    },
    methods:{
        submitHandler(){
             let url = "http://localhost:6677/category/saveOrUpdate"
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
        //重载栏目数据
        loadData(){
            let url = "http://localhost:6677/category/findAll"
            request.get(url).then((response)=>{
                //将查询结果设置到category中,箭头函数this指向外部函数的this
            this.category = response.data;
            })
        },
        toupdataHandler(row){
            this.title="修改栏目信息";
          
            this.visiable=true;
        },

        toDeleteHandler(id){
        
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        },
        toAddHandle(){
            this.title="添加栏目信息",
      
            this.visiable=true;
},
       closeModalHandler(){
    this.visiable=false;
        }
    }

}
</script>