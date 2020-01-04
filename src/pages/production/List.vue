
<template>
    <div>   
        <!--按钮 -->                    
        <el-button type="success" size="small" @click="toAddHandle">添加</el-button>         
        <el-button type="danger" size="small">批量删除</el-button>      
        <!--按钮 -->   

        <!--表格-->                    
        <el-table :data="product">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="产品名称"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="categoryId" label="所属产品"></el-table-column>
            <el-table-column label="操作">
            <template v-slot="slot">
                <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                <a href="" @click.prevent="toUpdataHandler(slot.row)">修改</a>
                <a href="" @click.prevent="">详情</a>


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
        <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="价格">
            <el-input  v-model="form.price"></el-input>
            </el-form-item>

             <el-form-item label="所属栏目">
                 <el-select v-model="value" placeholder="请选择">
                 <el-option       v-for="item in options"       
                 :key="item.value"       
                 :label="item.label"       
                 :value="item.value">     
                 </el-option>
                 </el-select>
            </el-form-item>

             <el-form-item label="介绍">
            <el-input  v-model="form.description"></el-input>
            </el-form-item>

             <el-form-item label="产品主图">
            <el-button type="primary">主要按钮</el-button>
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
            title:"添加产品信息",
            visiable:false,
            product:[],
            //form用于接收数据
            form:{
                type:"product"
            },
            options: [{
          value: '选项1',
          label: '123'
        }, {
          value: '选项2',
          label: '家具养护'
        }, {
          value: '选项3',
          label: '9537'
        }, {
          value: '选项4',
          label: '洗护服务'
        }, {
          value: '选项5',
          label: '生活急救箱'
        }, {
          value: '选项6',
          label: 'yyy'
        },{
          value: '选项7',
          label: '水果慢羊羊'
        },{
          value: '选项8',
          label: 'wxj'
        },{
          value: '选项9',
          label: 'www'
        },{
          value: '选项10',
          label: '123'
        },{
          value: '选项11',
          label: '123'
        },{
          value: '选项12',
          label: 'www'
        },{
          value: '选项13',
          label: '澳大利亚袋鼠'
        },{
          value: '选项14',
          label: '9482'
        },{
          value: '选项15',
          label: '9483'
        },{
          value: '选项16',
          label: '嗷嗷嗷嗷嗷啊'
        },{
          value: '选项17',
          label: '我 我我 我'
        },{
          value: '选项18',
          label: '暗暗'
        }],
        }
    },
    created(){
         //在页面加载出来的时候加载数据
        this.loadData();
    },
    methods:{
        submitHandler(){
             let url = "http://localhost:6677/product/saveOrUpdate"
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
            let url = "http://localhost:6677/product/findAll"
            request.get(url).then((response)=>{
                //将查询结果设置到product中,箭头函数this指向外部函数的this
            this.product = response.data;
            })
        },
        toupdataHandler(row){
            this.title="修改产品信息";
           
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
        toAddHandler(){
            this.title="添加产品信息",
     
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




